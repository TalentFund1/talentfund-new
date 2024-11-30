import { Card } from "@/components/ui/card";
import { BenchmarkSkillsMatrixContent } from "./skills-matrix/BenchmarkSkillsMatrixContent";
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
  visibleItems: number;
}

export const BenchmarkSkillsMatrixView = ({
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  ...props
}: BenchmarkSkillsMatrixViewProps) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <BenchmarkSkillsMatrixContent 
        roleId={roleId}
        employeeId={employeeId}
        roleLevel={roleLevel}
        filteredSkills={filteredSkills}
        {...props}
        observerTarget={observerTarget}
      />
    </Card>
  );
};