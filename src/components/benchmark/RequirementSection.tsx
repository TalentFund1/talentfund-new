import { Badge } from "@/components/ui/badge";

interface RequirementSectionProps {
  title: string;
  count: number;
  skills: Array<{
    title: string;
    level: string;
    requirement?: string;
  }>;
}

export const RequirementSection = ({ title, count, skills }: RequirementSectionProps) => {
  const getLevelDot = (level: string) => {
    switch (level.toLowerCase()) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {count}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge 
            key={skill.title} 
            variant="outline" 
            className="rounded-md px-4 py-2 border-2 border-[#CCDBFF] flex items-center gap-2 bg-white hover:bg-background/80 transition-colors"
          >
            {skill.title} <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
          </Badge>
        ))}
      </div>
    </div>
  );
};