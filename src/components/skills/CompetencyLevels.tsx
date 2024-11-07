import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface CompetencyLevelsProps {
  selectedLevels: string[];
  onLevelSelect: (level: string) => void;
}

export const CompetencyLevels = ({ selectedLevels, onLevelSelect }: CompetencyLevelsProps) => {
  const levelPairs = [
    ["P1", "P2"],
    ["P3", "P4"],
    ["P5", "P6"]
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-primary text-sm font-medium">Track:</div>
          <div className="text-sm font-medium">Professional</div>
        </div>
        <Separator className="my-2" />
      </div>

      <RadioGroup 
        defaultValue={selectedLevels[0]} 
        onValueChange={onLevelSelect}
        className="space-y-4"
      >
        {levelPairs.map((pair, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 gap-4">
            {pair.map((level) => (
              <div 
                key={level} 
                className="flex items-center gap-3 bg-background/40 p-4 rounded-lg hover:bg-background/60 transition-colors"
              >
                <RadioGroupItem value={`AI Engineer ${level}`} id={level} />
                <Label htmlFor={level} className="text-sm font-medium">AI Engineer {level}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};