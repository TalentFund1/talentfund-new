import { useParams } from "react-router-dom";
import { useTrack } from "./context/TrackContext";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TrackSelectionProps {
  onTrackChange?: (track: "Professional" | "Managerial") => void;
}

export const TrackSelection = ({ onTrackChange }: TrackSelectionProps) => {
  const { id } = useParams<{ id: string }>();
  const { getTrackForRole, setTrackForRole } = useTrack();
  const { toast } = useToast();

  const track = getTrackForRole(id || "");

  const handleTrackChange = (value: "Professional" | "Managerial") => {
    console.log('Track selection changed:', { 
      roleId: id, 
      previousTrack: track, 
      newTrack: value 
    });
    
    setTrackForRole(id || "", value);
    onTrackChange?.(value);
    
    toast({
      title: "Track Selection Updated",
      description: `Selected track: ${value}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Track</h4>
          <RadioGroup
            value={track}
            onValueChange={handleTrackChange}
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Professional"
                id="professional"
                className="border-primary text-primary"
              />
              <Label
                htmlFor="professional"
                className="text-sm font-medium cursor-pointer"
              >
                Professional
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Managerial"
                id="managerial"
                className="border-primary text-primary"
              />
              <Label
                htmlFor="managerial"
                className="text-sm font-medium cursor-pointer"
              >
                Managerial
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};