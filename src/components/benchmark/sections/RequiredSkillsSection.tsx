import { Badge } from "@/components/ui/badge";
import { Skill } from "../types";

interface RequiredSkillsSectionProps {
  skills: Skill[];
  getLevelStyles: (level: string) => string;
  getLevelDot: (level: string) => string;
}

export const RequiredSkillsSection = ({ skills, getLevelStyles, getLevelDot }: RequiredSkillsSectionProps) => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Required Skills</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {skills.length}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge 
            key={skill.name} 
            variant="outline" 
            className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles(skill.level)}`}
          >
            {skill.name}
            <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
          </Badge>
        ))}
      </div>
    </div>
  );
};