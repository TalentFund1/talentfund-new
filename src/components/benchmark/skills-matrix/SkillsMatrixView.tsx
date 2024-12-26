import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkillsMatrixFilters } from "./SkillsMatrixFilters";
import { SkillsMatrixTable } from "./SkillsMatrixTable";
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";

interface SkillsMatrixViewProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  filteredSkills: any[];
  hasChanges?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  isRoleBenchmark?: boolean;
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
  isRoleBenchmark = false,
}: SkillsMatrixViewProps) => {
  console.log('SkillsMatrixView rendering:', {
    hasChanges,
    isRoleBenchmark,
    skillCount: filteredSkills.length
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <SkillsMatrixFilters
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedInterest={selectedInterest}
            setSelectedInterest={setSelectedInterest}
            addSkillButton={<AddEmployeeDialog />}
          />
          
          {hasChanges && !isRoleBenchmark && (
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={onCancel}
                className="w-24"
              >
                Cancel
              </Button>
              <Button
                onClick={onSave}
                className="w-24"
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <SkillsMatrixTable
          filteredSkills={filteredSkills}
          isRoleBenchmark={isRoleBenchmark}
        />
      </Card>
    </div>
  );
};