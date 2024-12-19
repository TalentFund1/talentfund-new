import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useSkillsMatrixSearch } from "../skills/context/SkillsMatrixSearchContext";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useSkillsMatrixState } from "./skills-matrix/SkillsMatrixState";
import { getEmployeeSkills, addSkillToEmployee } from "./skills-matrix/initialSkills";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { SkillRequirement, UnifiedSkill } from "../skills/types/SkillTypes";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { hasChanges: storeHasChanges } = useSkillsMatrixStore();
  const { matrixSearchSkills } = useSkillsMatrixSearch();

  const { filterAndSortSkills } = useSkillsMatrixState(
    selectedCategory,
    selectedLevel,
    selectedInterest
  );

  // Get employee skills directly without role filtering
  const employeeSkills = getEmployeeSkills(id || "");

  // Apply filtering and sorting to employee skills
  const filteredSkills = filterAndSortSkills(id || "");

  console.log('Skills matrix state:', {
    totalSkills: employeeSkills.length,
    filteredSkills: filteredSkills.length,
    visibleItems,
    selectedCategory,
    selectedLevel,
    selectedInterest
  });

  // Handle skill updates
  const handleSkillUpdate = (skillTitle: string, level: string, requirement: SkillRequirement) => {
    if (!id) return;
    
    const skillData = getUnifiedSkillData(skillTitle);
    if (skillData) {
      const updatedSkill: UnifiedSkill = {
        ...skillData,
        level,
        requirement
      };
      console.log('Adding/updating skill for employee:', {
        employeeId: id,
        skill: updatedSkill
      });
      addSkillToEmployee(id, updatedSkill);
    }
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

  useEffect(() => {
    setHasChanges(storeHasChanges);
  }, [storeHasChanges]);

  return (
    <div className="space-y-6">
      <SkillsMatrixView
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        filteredSkills={filteredSkills}
        visibleItems={visibleItems}
        observerTarget={observerTarget}
        hasChanges={hasChanges}
        onSkillUpdate={handleSkillUpdate}
      />
    </div>
  );
};