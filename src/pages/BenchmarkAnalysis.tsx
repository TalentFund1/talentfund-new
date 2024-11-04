import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const missingSkills = [
  { name: "React", level: "advanced" },
  { name: "JavaScript", level: "advanced" },
  { name: "GraphQL", level: "intermediate" },
  { name: "HTML and CSS3", level: "intermediate" },
  { name: "Angular", level: "beginner" },
  { name: "IPA Integrations", level: "intermediate" },
];

const BenchmarkAnalysis = () => {
  return (
    <div className="flex-1 space-y-6 p-6 ml-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Benchmark Analysis</h2>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              89%
            </span>
          </div>

          <div className="space-y-4 bg-slate-50 rounded-lg p-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Experience Match</span>
                <span className="text-sm font-medium">8 out of 12</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200">
                <div className="h-2.5 rounded-full bg-primary" style={{ width: "66%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Skill Match</span>
                <span className="text-sm font-medium">2 out of 6</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200">
                <div className="h-2.5 rounded-full bg-primary" style={{ width: "33%" }}></div>
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
        </div>
      </div>
    </div>
  );
};

export default BenchmarkAnalysis;