import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SkillsMatrixContent } from "./SkillsMatrixContent";
import { useRef } from "react";

interface SkillsMatrixViewProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  filteredSkills: any[];
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
  hasChanges: boolean;
  isRoleBenchmark: boolean;
}

export const SkillsMatrixView = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  filteredSkills,
  visibleItems,
  observerTarget,
  hasChanges,
  isRoleBenchmark
}: SkillsMatrixViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  console.log('SkillsMatrixView - Rendering with:', {
    selectedCategory,
    filteredSkillsCount: filteredSkills.length
  });

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <SkillsMatrixContent 
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filteredSkills={filteredSkills}
        visibleItems={visibleItems}
        observerTarget={observerTarget}
        isRoleBenchmark={isRoleBenchmark}
      />
    </Card>
  );
};
