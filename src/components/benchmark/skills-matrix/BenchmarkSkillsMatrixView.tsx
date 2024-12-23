import { Card } from "@/components/ui/card";
import { BenchmarkSkillsMatrixContent } from "./BenchmarkSkillsMatrixContent";
import { useRef } from "react";

interface BenchmarkSkillsMatrixViewProps {
  roleId: string;
  employeeId: string;
  roleLevel: string;
  filteredSkills: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSkillLevel: string;
  setSelectedSkillLevel: (level: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  visibleItems: number;
}

export const BenchmarkSkillsMatrixView = ({
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSkillLevel,
  setSelectedSkillLevel,
  selectedSearchSkills,
  setSelectedSearchSkills,
  selectedCategory,
  setSelectedCategory,
  visibleItems
}: BenchmarkSkillsMatrixViewProps) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  console.log('BenchmarkSkillsMatrixView - Rendering with:', {
    roleId,
    employeeId,
    selectedCategory,
    filteredSkillsCount: filteredSkills.length
  });

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <BenchmarkSkillsMatrixContent 
        roleId={roleId}
        employeeId={employeeId}
        roleLevel={roleLevel}
        filteredSkills={filteredSkills}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedSkillLevel={selectedSkillLevel}
        setSelectedSkillLevel={setSelectedSkillLevel}
        selectedSearchSkills={selectedSearchSkills}
        setSelectedSearchSkills={setSelectedSearchSkills}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        visibleItems={visibleItems}
        observerTarget={observerTarget}
      />
    </Card>
  );
};