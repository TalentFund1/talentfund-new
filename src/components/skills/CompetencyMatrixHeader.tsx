import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface CompetencyMatrixHeaderProps {
  selectedLevels: string[];
}

export const CompetencyMatrixHeader = ({ selectedLevels }: CompetencyMatrixHeaderProps) => {
  const getLevelDescription = (track: "Professional" | "Managerial") => {
    if (track === "Professional") {
      return (
        <div className="space-y-2">
          <p className="font-medium">Professional Track Levels:</p>
          <ul className="text-sm space-y-1">
            <li><span className="font-medium">P1</span> - Entry</li>
            <li><span className="font-medium">P2</span> - Developing</li>
            <li><span className="font-medium">P3</span> - Career</li>
            <li><span className="font-medium">P4</span> - Senior</li>
            <li><span className="font-medium">P5</span> - Expert</li>
            <li><span className="font-medium">P6</span> - Principal</li>
          </ul>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        <p className="font-medium">Managerial Track Levels:</p>
        <ul className="text-sm space-y-1">
          <li><span className="font-medium">M3</span> - Manager</li>
          <li><span className="font-medium">M4</span> - Senior Manager</li>
          <li><span className="font-medium">M5</span> - Director</li>
          <li><span className="font-medium">M6</span> - Senior Director</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">Competency Levels</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </TooltipTrigger>
            <TooltipContent side="right" align="start" className="p-4">
              <div className="space-y-4">
                {getLevelDescription("Professional")}
                <div className="h-px bg-border" />
                {getLevelDescription("Managerial")}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};