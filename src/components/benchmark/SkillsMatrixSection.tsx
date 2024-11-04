import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SkillsTable } from "@/components/SkillsTable";

const missingSkills = [
  { name: "React", level: "advanced" },
  { name: "JavaScript", level: "advanced" },
  { name: "GraphQL", level: "intermediate" },
  { name: "HTML and CSS3", level: "intermediate" },
  { name: "Angular", level: "beginner" },
  { name: "IPA Integrations", level: "intermediate" },
];

export const SkillsMatrixSection = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Missing Skills / Seniority or Certification</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {missingSkills.length}
            </span>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            See Skill Profile
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill) => (
            <Badge 
              key={skill.name} 
              variant="outline" 
              className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white"
            >
              {skill.name} <div className="h-2 w-2 rounded-full bg-[#008000]" />
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-foreground">Skills Matrix</h4>
        <SkillsTable />
      </div>
    </div>
  );
};