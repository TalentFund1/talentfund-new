import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const skills = [
  { name: "Amazon Web Services", level: "Advanced", required: "Required" },
  { name: "Artificial Intelligence", level: "Advanced", required: "Required" },
  { name: "Behavioral Analytics", level: "Intermediate", required: "Required" },
  { name: "Business To Business", level: "Unspecified", required: "Preferred" },
  { name: "Coaching", level: "Unspecified", required: "Preferred" },
  { name: "Communication", level: "Unspecified", required: "Preferred" },
  { name: "Conversational AI", level: "Unspecified", required: "Preferred" },
  { name: "Data Science", level: "Unspecified", required: "Preferred" },
  { name: "Deep Learning", level: "Unspecified", required: "Preferred" },
  { name: "Experimentation", level: "Unspecified", required: "Preferred" },
  { name: "Full Stack Development", level: "Unspecified", required: "Preferred" },
];

const jobLevels = [
  { role: "AI Engineer", levels: ["P3", "P4", "P5"] },
  { role: "Backend Engineer", levels: ["P3", "P4", "P5"] },
  { role: "Frontend Engineer", levels: ["P3", "P4", "P5"] },
  { role: "Data Scientist", levels: ["P3", "P4", "P5"] },
];

export const CompetencyMatrix = () => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handleLevelSelect = (role: string, level: string) => {
    const levelId = `${role} ${level}`;
    setSelectedLevels(prev => 
      prev.includes(levelId) 
        ? prev.filter(l => l !== levelId)
        : [...prev, levelId]
    );
  };

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Competency Levels</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={selectedLevels.length.toString()}>
            <SelectTrigger className="w-[120px] bg-background">
              <SelectValue placeholder={`${selectedLevels.length} Selected`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={selectedLevels.length.toString()}>
                {selectedLevels.length} Selected
              </SelectItem>
            </SelectContent>
          </Select>
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="text-primary p-0 h-auto flex items-center gap-2 hover:bg-transparent hover:text-primary-accent"
        >
          <Plus className="h-4 w-4" /> Add Level
        </Button>

        <div className="space-y-2">
          {jobLevels.map((job) => (
            <div key={job.role} className="space-y-2">
              {job.levels.map((level) => (
                <div 
                  key={`${job.role}-${level}`} 
                  className="flex items-center gap-3 bg-background/40 p-2 rounded-lg hover:bg-background/60 transition-colors"
                >
                  <Checkbox 
                    className="rounded-sm"
                    checked={selectedLevels.includes(`${job.role} ${level}`)}
                    onCheckedChange={() => handleLevelSelect(job.role, level)}
                  />
                  <span className="text-sm font-medium">{job.role}</span>
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
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4 border-border" />

      <div>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-3 bg-[#F7F9FF] border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Skills (36)</span>
            </div>
            <div className="text-sm font-medium text-foreground">Skill Level</div>
            <div className="text-sm font-medium text-foreground">Required</div>
          </div>

          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="grid grid-cols-3 gap-4 p-3 hover:bg-background/40 transition-colors border-b border-border last:border-b-0"
            >
              <Link 
                to={`/skills/${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-primary hover:text-primary-accent transition-colors cursor-pointer"
              >
                {skill.name}
              </Link>
              <Select defaultValue={skill.level.toLowerCase()}>
                <SelectTrigger className="bg-white border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="unspecified">Unspecified</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={skill.required.toLowerCase()}>
                <SelectTrigger className="bg-white border-border">
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
    </div>
  );
};