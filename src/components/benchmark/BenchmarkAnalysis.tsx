```tsx
interface BenchmarkAnalysisProps {
  id: string;
}

export const BenchmarkAnalysis = ({ id }: BenchmarkAnalysisProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Benchmark Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Compare skills and identify gaps against role requirements
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Card className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Skills Match</div>
              <div className="text-2xl font-bold">85%</div>
              <Progress value={85} className="h-2" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Skills Gap</div>
              <div className="text-2xl font-bold">15%</div>
              <Progress value={15} className="h-2" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Development Areas</div>
              <div className="text-2xl font-bold">3</div>
              <Progress value={30} className="h-2" />
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Key Development Areas</h3>
          <div className="grid grid-cols-1 gap-4">
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">System Design</div>
                  <div className="text-sm text-muted-foreground">
                    Required: Expert | Current: Intermediate
                  </div>
                </div>
                <Progress value={60} className="w-[100px] h-2" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Cloud Architecture</div>
                  <div className="text-sm text-muted-foreground">
                    Required: Expert | Current: Advanced
                  </div>
                </div>
                <Progress value={80} className="w-[100px] h-2" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Team Leadership</div>
                  <div className="text-sm text-muted-foreground">
                    Required: Advanced | Current: Intermediate
                  </div>
                </div>
                <Progress value={70} className="w-[100px] h-2" />
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};
```