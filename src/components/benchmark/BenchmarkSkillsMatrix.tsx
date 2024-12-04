import { Card } from "@/components/ui/card";
import { BenchmarkSkillsMatrixContent } from "./skills-matrix/BenchmarkSkillsMatrixContent";
import { useRef } from "react";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { TrackProvider } from "../skills/context/TrackContext";

interface BenchmarkSkillsMatrixProps {
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

export const BenchmarkSkillsMatrix = ({ 
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  ...props
}: BenchmarkSkillsMatrixProps) => {
  console.log('BenchmarkSkillsMatrix - Current state:', {
    selectedRole: roleId,
    roleLevel,
    track: 'Professional',
    filteredSkillsCount: filteredSkills.length,
    toggledSkillsCount: 0 // This will be managed by ToggledSkillsProvider
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  return (
    <TrackProvider>
      <ToggledSkillsProvider>
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
      </ToggledSkillsProvider>
    </TrackProvider>
  );
};