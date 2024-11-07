import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface CompetencyLevelsProps {
  selectedLevels: string[];
  onLevelSelect: (level: string) => void;
}

export const CompetencyLevels = ({ selectedLevels, onLevelSelect }: CompetencyLevelsProps) => {
  const [track, setTrack] = React.useState("Professional");
  const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null);

  const levelPairs = track === "Professional" 
    ? [["P1", "P2"], ["P3", "P4"], ["P5", "P6"]]
    : [["M3", "M4"], ["M5", "M6"]];

  const handleLevelSelect = (value: string) => {
    setSelectedLevel(value);
    onLevelSelect(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Label htmlFor="track" className="text-sm font-medium text-foreground">Track:</Label>
        <Select defaultValue={track} onValueChange={setTrack}>
          <SelectTrigger id="track" className="w-[180px] bg-white border-input">
            <SelectValue placeholder="Select track" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Managerial">Managerial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-6" />

      <RadioGroup 
        value={selectedLevel || undefined}
        onValueChange={handleLevelSelect}
        className="space-y-4"
      >
        {levelPairs.map((pair, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 gap-4">
            {pair.map((level) => {
              const levelValue = `AI Engineer: ${level}`;
              const isSelected = selectedLevel === levelValue;
              
              return (
                <div 
                  key={level} 
                  className={`relative flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'bg-white border-primary shadow-sm'
                      : 'bg-white border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem 
                    value={levelValue} 
                    id={level}
                    className="data-[state=checked]:border-primary data-[state=checked]:text-primary"
                  />
                  <Label 
                    htmlFor={level} 
                    className={`text-sm font-medium ${
                      isSelected ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    AI Engineer: {level}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>

      {selectedLevel && (
        <Card className="p-6 mt-6 border-border bg-white">
          <h3 className="text-lg font-semibold mb-4 text-foreground">{selectedLevel} Matrix</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="stat-card">
                <h4 className="font-medium mb-2">All Skills</h4>
                <p className="text-sm text-muted-foreground">28 skills</p>
              </div>
              <div className="stat-card">
                <h4 className="font-medium mb-2">Specialized Skills</h4>
                <p className="text-sm text-muted-foreground">15 skills</p>
              </div>
              <div className="stat-card">
                <h4 className="font-medium mb-2">Common Skills</h4>
                <p className="text-sm text-muted-foreground">10 skills</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};