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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-primary text-sm font-medium">Track:</div>
          <Select defaultValue={track} onValueChange={setTrack}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Managerial">Managerial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-2" />
      </div>

      <RadioGroup 
        value={selectedLevel || undefined}
        onValueChange={handleLevelSelect}
        className="space-y-4"
      >
        {levelPairs.map((pair, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 gap-4">
            {pair.map((level) => (
              <div 
                key={level} 
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  selectedLevel === `AI Engineer: ${level}`
                    ? 'bg-primary/10 border border-primary'
                    : 'bg-background/40 hover:bg-background/60'
                }`}
              >
                <RadioGroupItem value={`AI Engineer: ${level}`} id={level} />
                <Label htmlFor={level} className="text-sm font-medium">AI Engineer: {level}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>

      {selectedLevel && (
        <div className="space-y-6">
          <Separator className="my-4" />
          <h3 className="text-lg font-semibold">{selectedLevel}</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-background/40 rounded-lg border border-border hover:border-primary-accent/50 transition-colors">
              <h4 className="font-medium mb-2">All Skills</h4>
              <p className="text-sm text-muted-foreground">28 skills</p>
            </div>
            <div className="p-4 bg-background/40 rounded-lg border border-border hover:border-primary-accent/50 transition-colors">
              <h4 className="font-medium mb-2">Specialized Skills</h4>
              <p className="text-sm text-muted-foreground">15 skills</p>
            </div>
            <div className="p-4 bg-background/40 rounded-lg border border-border hover:border-primary-accent/50 transition-colors">
              <h4 className="font-medium mb-2">Common Skills</h4>
              <p className="text-sm text-muted-foreground">10 skills</p>
            </div>
            <div className="p-4 bg-background/40 rounded-lg border border-border hover:border-primary-accent/50 transition-colors">
              <h4 className="font-medium mb-2">Certification</h4>
              <p className="text-sm text-muted-foreground">3 skills</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};