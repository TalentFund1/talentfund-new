import { Button } from "@/components/ui/button";

interface CompetencyGraphHeaderProps {
  currentRoleId: string;
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export const CompetencyGraphHeader = ({ 
  currentRoleId,
  hasChanges,
  onSave,
  onCancel 
}: CompetencyGraphHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-foreground">Skills Graph</h2>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={!hasChanges}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSave}
          disabled={!hasChanges}
        >
          Save
        </Button>
      </div>
    </div>
  );
};