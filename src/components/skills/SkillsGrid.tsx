import React from "react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Skill {
  name: string;
  level: string;
  required: string;
}

interface SkillsGridProps {
  currentSkills: Skill[];
}

export const SkillsGrid = ({ currentSkills }: SkillsGridProps) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="grid grid-cols-3 gap-4 p-3 bg-[#F7F9FF] border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            Skills ({currentSkills.length})
          </span>
        </div>
        <div className="text-sm font-medium text-foreground">Skill Level</div>
        <div className="text-sm font-medium text-foreground">Required</div>
      </div>

      {currentSkills.map((skill) => (
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
              <SelectItem value="beginner">Beginner</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue={skill.required.toLowerCase() || "preferred"}>
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
  );
};