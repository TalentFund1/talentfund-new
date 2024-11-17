import { useState, useEffect, useRef } from "react";
import { useBenchmarkSearch } from "../../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { filterSkillsByCategory } from "./skillCategories";
import { getEmployeeSkills } from "./initialSkills";
import { SkillsMatrixTable } from "./SkillsMatrixTable";
import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { useParams } from "react-router-dom";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

const ITEMS_PER_PAGE = 10;

export const BenchmarkSkillsContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const { id } = useParams<{ id: string }>();
  const { benchmarkSearchSkills } = useBenchmarkSearch();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(id || "");

  useEffect(() => {
    setSelectedSearchSkills(benchmarkSearchSkills);
  }, [benchmarkSearchSkills]);

  const getRoleSkillLevel = (skillTitle: string) => {
    const competencyState = getSkillCompetencyState(skillTitle, selectedLevel.toLowerCase());
    return (competencyState?.level || 'unspecified').toLowerCase();
  };

  const getSkillLevel = (skill: any) => {
    return (skill.level || 'unspecified').toLowerCase();
  };

  const getLevelPriority = (level: string) => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level] ?? 3;
  };

  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      if (!toggledSkills.has(skill.title)) return false;

      let matchesInterest = true;
      let matchesSearch = true;

      if (selectedInterest !== 'all') {
        const requirement = skill.requirement?.toLowerCase() || 'unknown';
        matchesInterest = requirement === selectedInterest.toLowerCase();
      }

      if (selectedSearchSkills.length > 0) {
        matchesSearch = selectedSearchSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      } else if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesInterest && matchesSearch;
    })
    .sort((a, b) => {
      // Get role skill levels (primary sorting)
      const aRoleLevel = getRoleSkillLevel(a.title);
      const bRoleLevel = getRoleSkillLevel(b.title);
      
      // Get skill levels (secondary sorting)
      const aSkillLevel = getSkillLevel(a);
      const bSkillLevel = getSkillLevel(b);

      // First sort by role skill level
      const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
      
      // If role levels are the same, sort by skill level
      if (roleLevelDiff === 0) {
        return getLevelPriority(aSkillLevel) - getLevelPriority(bSkillLevel);
      }
      
      return roleLevelDiff;
    });

  const paginatedSkills = filteredSkills.slice(0, visibleItems);

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

  return (
    <>
      <BenchmarkMatrixFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedSearchSkills={selectedSearchSkills}
        removeSearchSkill={(skill) => setSelectedSearchSkills((prev) => prev.filter(s => s !== skill))}
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
    </>
  );
};