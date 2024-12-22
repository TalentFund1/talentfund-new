import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useSkillsMatrixSearch } from "../skills/context/SkillsMatrixSearchContext";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useSkillsMatrixState, getEmployeeSkills } from "./skills-matrix/useSkillsMatrixState";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { hasChanges: storeHasChanges } = useSkillsMatrixStore();
  const { matrixSearchSkills } = useSkillsMatrixSearch();

  const { filterAndSortSkills } = useSkillsMatrixState(
    "all",
    selectedLevel,
    selectedInterest
  );

  // Get employee skills directly
  const employeeSkills = getEmployeeSkills(id || "");

  // Custom sorting function
  const sortSkills = (skills: any[]) => {
    return skills.sort((a, b) => {
      const { currentStates } = useSkillsMatrixStore.getState();
      const stateA = currentStates[a.title] || { level: a.level || 'unspecified', requirement: a.requirement || 'unknown' };
      const stateB = currentStates[b.title] || { level: b.level || 'unspecified', requirement: b.requirement || 'unknown' };

      // Helper function to get priority for levels
      const getLevelPriority = (level: string) => {
        switch (level.toLowerCase()) {
          case 'advanced': return 0;
          case 'intermediate': return 2;
          case 'beginner': return 3;
          default: return 4;
        }
      };

      // Helper function to get priority for requirements
      const getRequirementPriority = (requirement: string) => {
        return requirement === 'required' || requirement === 'skill_goal' ? 0 : 1;
      };

      // First, compare levels
      const levelPriorityA = getLevelPriority(stateA.level);
      const levelPriorityB = getLevelPriority(stateB.level);
      
      if (levelPriorityA !== levelPriorityB) {
        return levelPriorityA - levelPriorityB;
      }

      // If levels are the same, compare requirements
      const reqPriorityA = getRequirementPriority(stateA.requirement);
      const reqPriorityB = getRequirementPriority(stateB.requirement);
      
      if (reqPriorityA !== reqPriorityB) {
        return reqPriorityA - reqPriorityB;
      }

      // If everything else is equal, sort alphabetically
      return a.title.localeCompare(b.title);
    });
  };

  // Apply filtering and sorting
  const filteredSkills = (() => {
    let skills = sortSkills(filterAndSortSkills(id || ""));

    // Filter by category if selected
    if (selectedCategory !== 'all') {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        return skillData?.category === selectedCategory;
      });
    }

    console.log('Filtered skills by category:', {
      category: selectedCategory,
      totalSkills: skills.length,
      skills: skills.map(s => ({
        title: s.title,
        category: getUnifiedSkillData(s.title)?.category
      }))
    });

    return skills;
  })();

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

  useEffect(() => {
    setHasChanges(storeHasChanges);
  }, [storeHasChanges]);

  return (
    <div className="space-y-6">
      <SkillsMatrixView
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filteredSkills={filteredSkills}
        visibleItems={visibleItems}
        observerTarget={observerTarget}
        hasChanges={hasChanges}
        isRoleBenchmark={false}
      />
    </div>
  );
};