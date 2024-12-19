import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useSkillsMatrixSearch } from "../skills/context/SkillsMatrixSearchContext";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useSkillsMatrixState } from "./skills-matrix/SkillsMatrixState";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { AddSkillToProfileDialog } from "../skills/dialog/AddSkillToProfileDialog";

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Skills Matrix</h2>
          <div className="flex items-center gap-2">
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-md px-3 py-1 text-sm font-medium flex items-center gap-1.5">
              {filteredSkills.length}
              <span className="text-[#1F2144]/80">Skills Added</span>
            </span>
          </div>
        </div>
        <AddSkillToProfileDialog />
      </div>

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