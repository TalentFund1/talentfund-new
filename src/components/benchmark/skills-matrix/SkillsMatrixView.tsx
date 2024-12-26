import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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
  onSave: () => void;
  onCancel: () => void;
  isRoleBenchmark: boolean;
}

export const SkillsMatrixView = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  filteredSkills,
  hasChanges,
  onSave,
  onCancel,
  isRoleBenchmark
}: SkillsMatrixViewProps) => {
  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
        {hasChanges && (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={onSave}
              className="bg-primary hover:bg-primary/90"
            >
              Save
            </Button>
          </div>
        )}
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