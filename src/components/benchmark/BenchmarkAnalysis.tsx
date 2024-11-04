import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  status: "present" | "missing";
}

const skills: Skill[] = [
  { name: "React", status: "present" },
  { name: "JavaScript", status: "present" },
  { name: "GraphQL", status: "missing" },
  { name: "HTML and CSS3", status: "present" },
  { name: "Angular", status: "missing" },
  { name: "IPA Integrations", status: "missing" }
];

export const BenchmarkAnalysis = () => {
  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          Benchmark Analysis
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            89%
          </Badge>
        </h2>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Experience Match</span>
              <span className="text-sm text-foreground">8 out of 12</span>
            </div>
            <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
              <div className="h-full bg-[#1F2144] rounded-full" style={{ width: '66%' }} />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Skill Match</span>
              <span className="text-sm text-foreground">2 out of 6</span>
            </div>
            <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
              <div className="h-full bg-[#1F2144] rounded-full" style={{ width: '33%' }} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Missing Skills / Seniority or Certification</span>
              <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                6
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill.name}
                variant="outline" 
                className={`rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white ${
                  skill.status === "missing" ? "border-destructive/50" : "border-border"
                }`}
              >
                {skill.name}
                <div className={`h-2 w-2 rounded-full ${
                  skill.status === "missing" ? "bg-destructive" : "bg-primary"
                }`} />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};