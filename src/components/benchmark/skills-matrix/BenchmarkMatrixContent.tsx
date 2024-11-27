import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { BenchmarkSkillsMatrixContent } from "./BenchmarkSkillsMatrixContent";
import { useSkillsMatrixStore } from "./SkillsMatrixState";

interface BenchmarkMatrixContentProps {
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
  observerTarget: React.RefObject<HTMLDivElement>;
}

export const BenchmarkMatrixContent = ({
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  ...props
}: BenchmarkMatrixContentProps) => {
  const { saveChanges, cancelChanges, hasChanges } = useSkillsMatrixStore();

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <BenchmarkSkillsMatrixContent 
        roleId={roleId}
        employeeId={employeeId}
        roleLevel={roleLevel}
        filteredSkills={filteredSkills}
        {...props}
      />
    </Card>
  );
};