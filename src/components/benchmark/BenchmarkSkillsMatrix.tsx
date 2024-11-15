import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { BenchmarkMatrixFilters } from "./skills-matrix/BenchmarkMatrixFilters";
import { useSelectedSkills } from "../skills/context/SelectedSkillsContext";

const ITEMS_PER_PAGE = 10;

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const { id } = useParams<{ id: string }>();
  const { selectedSkills } = useSelectedSkills();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { currentStates } = useSkillsMatrixStore();

  const employeeSkills = getEmployeeSkills(id || "");
  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      let matchesSearch = true;
      let matchesLevel = true;
      let matchesInterest = true;

      // Get the current skill state
      const currentSkillState = currentStates[skill.title];
      const skillLevel = (currentSkillState?.level || skill.level || 'unspecified').toLowerCase();
      const requirement = (currentSkillState?.requirement || skill.requirement || 'unknown').toLowerCase();

      // Level filtering
      if (selectedLevel !== 'all') {
        matchesLevel = skillLevel === selectedLevel.toLowerCase();
      }

      // Interest filtering
      if (selectedInterest !== 'all') {
        matchesInterest = requirement === selectedInterest.toLowerCase();
      }

      // Search filtering
      if (selectedSkills.length > 0) {
        matchesSearch = selectedSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      } else if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesSearch && matchesLevel && matchesInterest;
    })
    .sort((a, b) => {
      const levelPriority: { [key: string]: number } = {
        'advanced': 0,
        'intermediate': 1,
        'beginner': 2,
        'unspecified': 3
      };
      
      const aState = currentStates[a.title];
      const bState = currentStates[b.title];
      
      const aLevel = (aState?.level || a.level || 'unspecified').toLowerCase();
      const bLevel = (bState?.level || b.level || 'unspecified').toLowerCase();
      
      return levelPriority[aLevel] - levelPriority[bLevel];
    });

  const removeSearchSkill = (skill: string) => {
    // This is now handled by the SelectedSkillsContext
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

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
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground">Skills Matrix</h2>
            <p className="text-sm text-muted-foreground">
              Manage and track employee skills and competencies
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white">Export</Button>
            <Button>Add Skill</Button>
          </div>
        </div>

        <BenchmarkMatrixFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          selectedSearchSkills={selectedSkills}
          removeSearchSkill={removeSearchSkill}
          clearSearch={clearSearch}
        />

        <SkillsMatrixTable 
          filteredSkills={paginatedSkills}
        />
        
        {visibleItems < filteredSkills.length && (
          <div 
            ref={observerTarget} 
            className="h-10 flex items-center justify-center"
          >
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
      </Card>
    </div>
  );
};