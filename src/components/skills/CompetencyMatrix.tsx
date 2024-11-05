import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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

      <div className="space-y-2">
        <Button variant="link" className="text-primary p-0 h-auto flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Level
        </Button>

        <div className="space-y-2">
          {["P2", "P3", "P4"].map((level) => (
            <div key={level} className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">AI Engineer</span>
              <Select defaultValue={level}>
                <SelectTrigger className="w-[80px]">
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

      <div className="border rounded-lg">
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 border-b">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Skills (36)</span>
          </div>
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
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="unspecified">Unspecified</SelectItem>
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

      <div>
        <Button variant="outline">Export</Button>
      </div>
    </div>
  );
};