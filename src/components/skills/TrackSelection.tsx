import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTrack } from "./context/TrackContext";
import { useToast } from "@/components/ui/use-toast";

export const TrackSelection = () => {
  const { track, setTrack, hasUnsavedChanges, setHasUnsavedChanges, saveTrackSelection } = useTrack();
  const { toast } = useToast();

  const handleTrackChange = (value: "Technical" | "Managerial") => {
    setTrack(value);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    saveTrackSelection();
    toast({
      title: "Track Selection Saved",
      description: `Selected track: ${track}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <RadioGroup
          value={track}
          onValueChange={handleTrackChange}
          className="flex items-center space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Technical" id="technical" />
            <Label htmlFor="technical">Technical</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Managerial" id="managerial" />
            <Label htmlFor="managerial">Managerial</Label>
          </div>
        </RadioGroup>
        {hasUnsavedChanges && (
          <Button onClick={handleSave} size="sm">
            Save Track
          </Button>
        )}
      </div>
    </div>
  );
};