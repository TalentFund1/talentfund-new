import { BenchmarkProgressBar } from "./BenchmarkProgressBar";

interface BenchmarkAnalysisCardProps {
  skillMatch: { current: number; total: number };
  competencyMatch: { current: number; total: number };
  skillGoals: { current: number; total: number };
}

export const BenchmarkAnalysisCard = ({ 
  skillMatch, 
  competencyMatch, 
  skillGoals 
}: BenchmarkAnalysisCardProps) => {
  const matchPercentage = Math.round((skillMatch.current / skillMatch.total) * 100);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            Benchmark Analysis
            <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
              {matchPercentage}%
            </span>
          </h2>
        </div>
      </div>

      <div className="space-y-6 rounded-xl border border-border bg-white p-6">
        <BenchmarkProgressBar 
          label="Skill Match"
          current={skillMatch.current}
          total={skillMatch.total}
        />
        <BenchmarkProgressBar 
          label="Competency Match"
          current={competencyMatch.current}
          total={competencyMatch.total}
        />
        <BenchmarkProgressBar 
          label="Skill Goal Match"
          current={skillGoals.current}
          total={skillGoals.total}
        />
      </div>
    </div>
  );
};