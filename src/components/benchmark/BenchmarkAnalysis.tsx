import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  status: "present" | "missing";
}

const skills: Skill[] = [
  { name: "UI/UX Design Principles", status: "missing" },
  { name: "Communication", status: "missing" },
  { name: "Angular", status: "missing" },
  { name: "Communication", status: "missing" },
  { name: "Angular", status: "missing" }
];

export const BenchmarkAnalysis = () => {
  const getLevelStyles = () => {
    return "border-[#CCDBFF]";
  };

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          Benchmark Analysis
          <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-2.5 py-1 text-sm font-medium">
            89%
          </span>
        </h2>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Skill Match</span>
              <span className="text-sm text-foreground">2 out of 6</span>
            </div>
            <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
              <div className="h-full bg-[#1F2144] rounded-full" style={{ width: '33%' }} />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Competency Match</span>
              <span className="text-sm text-foreground">8 out of 12</span>
            </div>
            <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
              <div className="h-full bg-[#1F2144] rounded-full" style={{ width: '66%' }} />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Skill Goal</span>
              <span className="text-sm text-foreground">4 out of 6</span>
            </div>
            <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
              <div className="h-full bg-[#1F2144] rounded-full" style={{ width: '66%' }} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">Missing Skills / Seniority or Certifications</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {skills.length}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge 
                key={`${skill.name}-${index}`}
                variant="outline" 
                className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles()}`}
              >
                {skill.name} <div className="h-2 w-2 rounded-full bg-primary-icon" />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};