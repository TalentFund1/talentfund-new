import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTrack } from "./context/TrackContext";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";

export const TrackSelection = () => {
  const { id } = useParams<{ id: string }>();
  const { getTrackForRole, setTrackForRole, hasUnsavedChanges, saveTrackSelection } = useTrack();
  const { toast } = useToast();

  const track = getTrackForRole(id || "");

  const handleTrackChange = (value: "Professional" | "Managerial") => {
    setTrackForRole(id || "", value);
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
            <RadioGroupItem value="Professional" id="professional" />
            <Label htmlFor="professional">Professional</Label>
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