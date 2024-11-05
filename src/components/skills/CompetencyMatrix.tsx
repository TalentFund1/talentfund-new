import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface SkillLevel {
  name: string;
  level: string;
  required: string;
}

const levelSkills: Record<string, SkillLevel[]> = {
  P2: [
    { name: "Amazon Web Services", level: "Intermediate", required: "Required" },
    { name: "Artificial Intelligence", level: "Intermediate", required: "Required" },
    { name: "Behavioral Analytics", level: "Basic", required: "Required" },
    { name: "Business To Business", level: "Basic", required: "Preferred" },
  ],
  P3: [
    { name: "Amazon Web Services", level: "Advanced", required: "Required" },
    { name: "Artificial Intelligence", level: "Advanced", required: "Required" },
    { name: "Behavioral Analytics", level: "Intermediate", required: "Required" },
    { name: "Business To Business", level: "Intermediate", required: "Preferred" },
  ],
  P4: [
    { name: "Amazon Web Services", level: "Expert", required: "Required" },
    { name: "Artificial Intelligence", level: "Expert", required: "Required" },
    { name: "Behavioral Analytics", level: "Advanced", required: "Required" },
    { name: "Business To Business", level: "Advanced", required: "Required" },
  ],
};

export const CompetencyMatrix = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    toast({
      title: "Level Selected",
      description: `Showing competency matrix for AI Engineer ${level}`,
    });
  };

  const skills = selectedLevel ? levelSkills[selectedLevel] : [];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Checkbox />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Role</span>
              <Select defaultValue="level">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="level">Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="0">
              <SelectTrigger className="w-[120px] bg-muted/50">
                <SelectValue placeholder="0 Selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 Selected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Save</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>

        <div className="space-y-4">
          <Button variant="link" className="text-primary p-0 h-auto flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add Level
          </Button>

          <div className="space-y-2">
            {["P2", "P3", "P4"].map((level) => (
              <div key={level} className="flex items-center gap-2">
                <Checkbox 
                  checked={selectedLevel === level}
                  onCheckedChange={() => handleLevelSelect(level)}
                />
                <span className="text-sm">AI Engineer</span>
                <Select value={level} onValueChange={() => handleLevelSelect(level)}>
                  <SelectTrigger className="w-[80px]">
                    <SelectValue>{level}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={level}>{level}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>

        {selectedLevel && (
          <div className="mt-6 border rounded-lg">
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 border-b">
              <div className="text-sm font-medium">Skills ({skills.length})</div>
              <div className="text-sm font-medium">Skill Level</div>
              <div className="text-sm font-medium">Required</div>
            </div>

            <div className="divide-y">
              {skills.map((skill) => (
                <div key={skill.name} className="grid grid-cols-3 gap-4 p-4">
                  <span className="text-sm text-primary">{skill.name}</span>
                  <Select defaultValue={skill.level.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue={skill.required.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="required">Required</SelectItem>
                      <SelectItem value="preferred">Preferred</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      <div>
        <Button variant="outline">Export</Button>
      </div>
    </div>
  );
};