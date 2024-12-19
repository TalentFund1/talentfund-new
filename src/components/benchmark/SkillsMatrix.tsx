import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useSkillsMatrixSearch } from "../skills/context/SkillsMatrixSearchContext";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const { currentStates, saveChanges, cancelChanges, hasChanges: storeHasChanges } = useSkillsMatrixStore();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { matrixSearchSkills } = useSkillsMatrixSearch();

  const employeeSkills = getEmployeeSkills(id || "");

  // Filter and sort skills based on selected filters
  const filteredSkills = employeeSkills.filter(skill => {
    if (selectedCategory !== "all" && skill.category !== selectedCategory) return false;
    if (selectedLevel !== "all" && skill.level !== selectedLevel) return false;
    if (selectedInterest !== "all") {
      const state = currentStates[skill.title];
      if (!state) return false;
      return state.requirement === selectedInterest;
    }
    return true;
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
      />
    </div>
  );
};