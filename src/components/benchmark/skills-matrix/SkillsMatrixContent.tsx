import { useState, useEffect, useRef } from "react";
import { filterSkillsByCategory } from "./skillCategories";
import { getEmployeeSkills } from "./initialSkills";
import { SkillsMatrixTable } from "./SkillsMatrixTable";
import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { SkillGoalsWidget } from "./SkillGoalsWidget";

const ITEMS_PER_PAGE = 10;

interface SkillsMatrixContentProps {
  id: string;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
}

export const SkillsMatrixContent = ({ 
  id, 
  selectedSearchSkills, 
  setSelectedSearchSkills 
}: SkillsMatrixContentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const observerTarget = useRef<HTMLDivElement>(null);
  const { currentStates } = useSkillsMatrixStore();

  const employeeSkills = getEmployeeSkills(id || "");

  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;

      const currentSkillState = currentStates[skill.title];
      const requirement = (currentSkillState?.requirement || skill.requirement || 'unknown').toLowerCase();

      if (selectedLevel !== 'all') {
        const skillLevel = (currentSkillState?.level || skill.level || '').toLowerCase();
        matchesLevel = skillLevel === selectedLevel.toLowerCase();
      }

      if (selectedInterest !== 'all') {
        switch (selectedInterest.toLowerCase()) {
          case 'skill_goal':
            matchesInterest = requirement === 'required' || requirement === 'skill_goal';
            break;
          case 'not_interested':
            matchesInterest = requirement === 'not_interested';
            break;
          case 'unknown':
            matchesInterest = !requirement || requirement === 'unknown';
            break;
          default:
            matchesInterest = requirement === selectedInterest.toLowerCase();
        }
      }

      if (selectedSearchSkills.length > 0) {
        matchesSearch = selectedSearchSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      } else if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesLevel && matchesInterest && matchesSearch;
    });

  const skillGoalsCount = employeeSkills.filter(skill => {
    const currentSkillState = currentStates[skill.title];
    const requirement = (currentSkillState?.requirement || skill.requirement || '').toLowerCase();
    return requirement === 'required' || requirement === 'skill_goal';
  }).length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleItems < filteredSkills.length) {
          setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredSkills.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [visibleItems, filteredSkills.length]);

  const paginatedSkills = filteredSkills.slice(0, visibleItems);

  return (
    <div className="space-y-4">
      <SkillGoalsWidget 
        totalSkills={employeeSkills.length}
        skillGoalsCount={skillGoalsCount}
      />

      <BenchmarkMatrixFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedSearchSkills={selectedSearchSkills}
        removeSearchSkill={(skill) => setSelectedSearchSkills(prev => prev.filter(s => s !== skill))}
        clearSearch={() => setSearchTerm("")}
      />

      <SkillsMatrixTable 
        filteredSkills={paginatedSkills}
        showCompanySkill={false}
        isRoleBenchmark={true}
      />
      
      {visibleItems < filteredSkills.length && (
        <div 
          ref={observerTarget} 
          className="h-10 flex items-center justify-center"
        >
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};