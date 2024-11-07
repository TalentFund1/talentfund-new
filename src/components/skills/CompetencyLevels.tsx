import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CompetencyLevelsProps {
  selectedLevels: string[];
  onLevelSelect: (level: string) => void;
}

export const CompetencyLevels = ({ selectedLevels, onLevelSelect }: CompetencyLevelsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-primary text-sm font-medium">Track:</div>
        <Select defaultValue="professional">
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="managerial">Managerial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <RadioGroup 
          defaultValue={selectedLevels[0]} 
          onValueChange={onLevelSelect}
          className="space-y-2"
        >
          {["P1", "P2", "P3", "P4", "P5", "P6"].map((level) => (
            <div key={level} className="flex items-center gap-3 bg-background/40 p-2 rounded-lg hover:bg-background/60 transition-colors">
              <RadioGroupItem value={`AI Engineer ${level}`} id={level} />
              <Label htmlFor={level} className="text-sm font-medium">AI Engineer</Label>
              <Select defaultValue={level}>
                <SelectTrigger className="w-[80px] bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={level}>{level}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};