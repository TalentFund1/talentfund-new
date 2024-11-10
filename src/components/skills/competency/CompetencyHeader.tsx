import { Button } from "@/components/ui/button";
import { useCompetencyState } from "./CompetencyState";
import { useToast } from "@/components/ui/use-toast";

export const CompetencyHeader = () => {
  const { hasChanges, saveChanges, cancelChanges } = useCompetencyState();
  const { toast } = useToast();

  const handleSave = () => {
    saveChanges();
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    cancelChanges();
    toast({
      title: "Changes Cancelled",
      description: "Your changes have been discarded.",
    });
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-foreground">Skills Graph</h2>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={handleCancel}
          disabled={!hasChanges}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Save
        </Button>
      </div>
    </div>
  );
};