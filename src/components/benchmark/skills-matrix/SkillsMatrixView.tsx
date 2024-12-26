import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillsMatrixFilters } from "./SkillsMatrixFilters";
import { SkillsMatrixTable } from "./SkillsMatrixTable";
import { AddEmployeeSkillDialog } from "./dialog/AddEmployeeSkillDialog";

interface SkillsMatrixViewProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  filteredSkills: any[];
  isRoleBenchmark: boolean;
}

export const SkillsMatrixView = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  filteredSkills,
  isRoleBenchmark
}: SkillsMatrixViewProps) => {
  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
      </div>
      
      <Separator className="mb-6" />
      
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