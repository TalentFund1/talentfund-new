import { Card } from "@/components/ui/card";
import { SkillsMatrixHeader } from "./SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./SkillsMatrixFilters";
import { SkillsMatrixTable } from "./SkillsMatrixTable";
import { AddEmployeeSkillDialog } from "./dialog/AddEmployeeSkillDialog";

interface SkillsMatrixViewProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  filteredSkills: any[];
  hasChanges: boolean;
  isRoleBenchmark: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export const SkillsMatrixView = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  filteredSkills,
  hasChanges,
  isRoleBenchmark,
  onSave,
  onCancel
}: SkillsMatrixViewProps) => {
  console.log('SkillsMatrixView - Rendering with:', {
    hasChanges,
    filteredSkillsCount: filteredSkills.length,
    isRoleBenchmark
  });

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <SkillsMatrixHeader 
        hasChanges={hasChanges}
        onSave={onSave}
        onCancel={onCancel}
      />
      
      <SkillsMatrixFilters 
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        addSkillButton={<AddEmployeeSkillDialog />}
      />

      <SkillsMatrixTable 
        filteredSkills={filteredSkills}
        isRoleBenchmark={isRoleBenchmark}
      />
    </Card>
  );
};