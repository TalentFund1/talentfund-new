import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useSkillsMatrixSearch } from "../skills/context/SkillsMatrixSearchContext";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useSkillsMatrixState, getEmployeeSkills } from "./skills-matrix/useSkillsMatrixState";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
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

  const employeeSkills = getEmployeeSkills(id || "");

  const getLevelPriority = (level: string | undefined) => {
    if (!level) return 4; // Handle undefined case
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 4;
  };

  const sortSkills = (skills: any[]) => {
    return skills.sort((a, b) => {
      const { currentStates } = useSkillsMatrixStore.getState();
      const stateA = currentStates[a.title] || { level: a.level || 'unspecified', requirement: a.requirement || 'unknown' };
      const stateB = currentStates[b.title] || { level: b.level || 'unspecified', requirement: b.requirement || 'unknown' };

      const levelPriorityA = getLevelPriority(stateA.level);
      const levelPriorityB = getLevelPriority(stateB.level);
      
      if (levelPriorityA !== levelPriorityB) {
        return levelPriorityA - levelPriorityB;
      }

      return a.title.localeCompare(b.title);
    });
  };

  const filteredSkills = sortSkills(filterAndSortSkills(id || ""));

  console.log('Skills matrix state:', {
    totalSkills: employeeSkills.length,
    filteredSkills: filteredSkills.length,
    visibleItems,
    selectedLevel,
    selectedInterest
  });

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
        filteredSkills={filteredSkills}
        visibleItems={visibleItems}
        observerTarget={observerTarget}
        hasChanges={hasChanges}
        isRoleBenchmark={false}
      />
    </div>
  );
};
