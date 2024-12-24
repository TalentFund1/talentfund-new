import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useSkillsMatrixSearch } from "../skills/context/SkillsMatrixSearchContext";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useSkillsMatrixState } from "./skills-matrix/SkillsMatrixState";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { UnifiedSkill } from "../skills/types/SkillTypes";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { hasChanges: storeHasChanges } = useSkillsMatrixStore();
  const { getEmployeeSkills, getSkillState } = useEmployeeSkillsStore();

  const { filterAndSortSkills } = useSkillsMatrixState(
    "all",
    selectedLevel,
    selectedInterest
  );

  // Get employee skills and convert them to UnifiedSkill format
  const employeeSkills = id ? getEmployeeSkills(id).map(skill => {
    const state = getSkillState(id, skill.title);
    return {
      ...skill,
      level: state.level,
      goalStatus: state.goalStatus
    } as UnifiedSkill;
  }) : [];

  console.log('SkillsMatrix - Loading employee skills:', {
    employeeId: id,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => s.title)
  });

  // Apply filtering and sorting to employee skills
  const filteredSkills = filterAndSortSkills(employeeSkills);

  console.log('SkillsMatrix - Filtered skills:', {
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