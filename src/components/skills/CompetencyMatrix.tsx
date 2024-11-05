import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

export const CompetencyMatrix = () => {
  return (
    <div className="space-y-6 bg-white p-8 rounded-xl border border-border shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Competency Levels</h2>
        <div className="flex items-center gap-3">
          <Select defaultValue="0">
            <SelectTrigger className="w-[120px] bg-background">
              <SelectValue placeholder="0 Selected" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0 Selected</SelectItem>
            </SelectContent>
          </Select>
          <div className="space-x-2">
            <Button>Save</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>

      <Separator className="my-6" />
      
      <h3 className="text-lg font-semibold text-primary mb-6">AI Engineer: P2</h3>

      <div className="space-y-6">
        <Button 
          variant="ghost" 
          className="text-primary p-0 h-auto flex items-center gap-2 hover:bg-transparent hover:text-primary-accent"
        >
          <Plus className="h-4 w-4" /> Add Level
        </Button>

        <div className="space-y-3">
          {["P2", "P3", "P4"].map((level) => (
            <div key={level} className="flex items-center gap-3 bg-background/40 p-4 rounded-lg hover:bg-background/60 transition-colors">
              <Checkbox className="rounded-sm" />
              <span className="text-sm font-medium">AI Engineer</span>
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
      </div>

      <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-3 gap-4 p-4 bg-background/50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground/80">Skills (36)</span>
          </div>
          <div className="text-sm font-medium text-foreground/80">Skill Level</div>
          <div className="text-sm font-medium text-foreground/80">Required</div>
        </div>

        <div className="divide-y divide-border">
          {skills.map((skill) => (
            <div key={skill.name} className="grid grid-cols-3 gap-4 p-4 hover:bg-background/40 transition-colors">
              <span className="text-sm text-primary hover:text-primary-accent transition-colors cursor-pointer">{skill.name}</span>
              <Select defaultValue={skill.level.toLowerCase()}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="unspecified">Unspecified</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={skill.required.toLowerCase()}>
                <SelectTrigger className="bg-white">
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