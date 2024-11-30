import React, { useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTrack } from "./context/TrackContext";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrackSelectionProps {
  onTrackChange?: (track: "Professional" | "Managerial") => void;
}

export const TrackSelection = ({ onTrackChange }: TrackSelectionProps) => {
  const { id } = useParams<{ id: string }>();
  const { getTrackForRole, setTrackForRole, hasUnsavedChanges, saveTrackSelection } = useTrack();
  const { toast } = useToast();

  const track = getTrackForRole(id || "");

  // Load the saved track when component mounts
  useEffect(() => {
    const savedTrack = localStorage.getItem(`track-selection-${id}`);
    console.log('Loading saved track selection:', { roleId: id, savedTrack });
    
    if (savedTrack && (savedTrack === "Professional" || savedTrack === "Managerial")) {
      setTrackForRole(id || "", savedTrack);
    }
  }, [id, setTrackForRole]);

  const handleTrackChange = (value: "Professional" | "Managerial") => {
    console.log('Changing track:', { roleId: id, newTrack: value });
    setTrackForRole(id || "", value);
    onTrackChange?.(value);
  };

  const handleSave = () => {
    console.log('Saving track selection:', { roleId: id, track });
    saveTrackSelection();
    localStorage.setItem(`track-selection-${id}`, track);
    toast({
      title: "Track Selection Saved",
      description: `Selected track: ${track}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Track:</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="right" align="start" className="p-4 max-w-sm">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Professional Track:</p>
                      <ul className="space-y-1 text-sm">
                        <li>P1 - Entry</li>
                        <li>P2 - Developing</li>
                        <li>P3 - Career</li>
                        <li>P4 - Senior</li>
                        <li>P5 - Expert</li>
                        <li>P6 - Principal</li>
                      </ul>
                    </div>
                    <div className="h-px bg-border" />
                    <div>
                      <p className="font-medium mb-2">Managerial Track:</p>
                      <ul className="space-y-1 text-sm">
                        <li>M3 - Manager</li>
                        <li>M4 - Senior Manager</li>
                        <li>M5 - Director</li>
                        <li>M6 - Senior Director</li>
                      </ul>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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
        </div>
        {hasUnsavedChanges && (
          <Button 
            onClick={handleSave} 
            size="sm" 
            variant="outline"
            className="ml-auto bg-[#F7F9FF] text-[#1F2144] hover:bg-[#F7F9FF]/90 border border-[#CCDBFF]"
          >
            Save Track
          </Button>
        )}
      </div>
    </div>
  );
};