import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const skillCategories = [
    { name: "All Skills", count: 28 },
    { name: "Specialized Skills", count: 15 },
    { name: "Common Skills", count: 10 },
    { name: "Certification", count: 3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-sm font-medium">Track:</div>
        <Select defaultValue={track} onValueChange={setTrack}>
          <SelectTrigger className="w-[180px] bg-white border-input">
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
        className="grid grid-cols-2 gap-4"
      >
        {levelPairs.map((pair, rowIndex) => (
          <div key={rowIndex} className="contents">
            {pair.map((level) => {
              const levelId = `AI Engineer: ${level}`;
              return (
                <div 
                  key={level}
                  className={`relative flex items-center gap-3 p-4 rounded-lg border transition-all ${
                    selectedLevel === levelId
                      ? 'bg-background border-primary-accent shadow-sm'
                      : 'border-border hover:border-primary-accent/50'
                  }`}
                >
                  <RadioGroupItem value={levelId} id={level} />
                  <Label htmlFor={level} className="text-sm font-medium cursor-pointer">
                    AI Engineer: {level}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>

      {selectedLevel && (
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-semibold">{selectedLevel} Matrix</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg border border-border">
              <h4 className="font-medium mb-1">All Skills</h4>
              <p className="text-sm text-muted-foreground">28 skills</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-border">
              <h4 className="font-medium mb-1">Specialized Skills</h4>
              <p className="text-sm text-muted-foreground">15 skills</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-border">
              <h4 className="font-medium mb-1">Common Skills</h4>
              <p className="text-sm text-muted-foreground">10 skills</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Skill Categories</h3>
            <div className="grid grid-cols-4 gap-4">
              {skillCategories.map((category) => (
                <div
                  key={category.name}
                  className={`p-4 rounded-lg border border-border bg-white hover:border-primary-accent/50 transition-all ${
                    category.name === "All Skills" ? "ring-2 ring-primary-accent bg-primary-accent/5" : ""
                  }`}
                >
                  <h4 className="font-medium mb-1">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.count} skills</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};