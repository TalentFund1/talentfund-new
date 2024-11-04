import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Experience Match</span>
            <span className="text-sm text-muted-foreground">8 out of 12</span>
          </div>
          <Progress value={66} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Skill Match</span>
            <span className="text-sm text-muted-foreground">2 out of 6</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Missing Skills / Seniority or Certification</span>
            <span className="text-sm text-muted-foreground">6</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill.name}
                variant="outline" 
                className={`rounded-full px-3 py-1 border flex items-center gap-2 ${
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

        <Button variant="outline" className="w-full">
          See Skill Profile
        </Button>
      </div>
    </div>
  );
};