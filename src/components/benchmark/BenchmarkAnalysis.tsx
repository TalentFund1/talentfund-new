import { Progress } from "@/components/ui/progress";

export const BenchmarkAnalysis = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-semibold text-foreground">Benchmark Analysis</h3>
        <span className="bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs font-medium">
          89%
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Experience Match</span>
              <span className="font-medium">8 out of 12</span>
            </div>
            <Progress value={66} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Skill Match</span>
              <span className="font-medium">2 out of 6</span>
            </div>
            <Progress value={33} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};