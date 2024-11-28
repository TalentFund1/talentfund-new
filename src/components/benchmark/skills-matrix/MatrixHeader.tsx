import { SkillsMatrixHeader } from "./SkillsMatrixHeader";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useToast } from "@/components/ui/use-toast";

interface MatrixHeaderProps {
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export const MatrixHeader = ({ hasChanges, onSave, onCancel }: MatrixHeaderProps) => {
  return (
    <SkillsMatrixHeader 
      hasChanges={hasChanges}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};