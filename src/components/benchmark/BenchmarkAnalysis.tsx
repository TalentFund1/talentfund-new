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
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">Benchmark Analysis</h2>
        <Badge variant="secondary" className="bg-[#EBFBEE] text-[#039855] hover:bg-[#EBFBEE]/90">
          89%
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-white p-8 w-full space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-foreground">Experience Match</span>
              <span className="text-base font-medium text-foreground">8 out of 12</span>
            </div>
            <Progress value={66} className="h-2 bg-[#F4F3FF]" indicatorClassName="bg-[#1F2144]" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-foreground">Skill Match</span>
              <span className="text-base font-medium text-foreground">2 out of 6</span>
            </div>
            <Progress value={33} className="h-2 bg-[#F4F3FF]" indicatorClassName="bg-[#1F2144]" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-foreground">Missing Skills / Seniority or Certification</span>
              <Badge variant="secondary" className="bg-[#8073ec]/10 text-[#1F2144]">
                6
              </Badge>
            </div>
            <button className="text-sm font-medium text-[#8073ec] hover:text-[#8073ec]/90">
              See Skill Profile
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill.name}
                variant="outline" 
                className={`rounded-lg px-3 py-1.5 border flex items-center gap-2 bg-white ${
                  skill.status === "missing" ? "border-[#FDA29B]" : "border-border"
                }`}
              >
                {skill.name}
                <div className={`h-2 w-2 rounded-full ${
                  skill.status === "missing" ? "bg-[#F04438]" : "bg-[#12B76A]"
                }`} />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};