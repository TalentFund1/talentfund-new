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
  // Calculate individual percentages
  const skillMatchPercentage = Math.round((skillMatch.current / skillMatch.total) * 100) || 0;
  const competencyMatchPercentage = Math.round((competencyMatch.current / competencyMatch.total) * 100) || 0;
  const skillGoalMatchPercentage = Math.round((skillGoals.current / skillGoals.total) * 100) || 0;

  // Calculate average percentage
  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            Benchmark Analysis
            <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
              {averagePercentage}%
            </span>
          </h2>
        </div>
      </div>

      <div className="space-y-6 rounded-xl border border-border bg-white p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Skill Match</span>
            <span className="text-sm text-foreground">
              {skillMatch.current} out of {skillMatch.total}
            </span>
          </div>
          <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1F2144] rounded-full transition-all duration-300" 
              style={{ width: `${skillMatchPercentage}%` }} 
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Competency Match</span>
            <span className="text-sm text-foreground">
              {competencyMatch.current} out of {competencyMatch.total}
            </span>
          </div>
          <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1F2144] rounded-full transition-all duration-300" 
              style={{ width: `${competencyMatchPercentage}%` }} 
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Skill Goal Match</span>
            <span className="text-sm text-foreground">
              {skillGoals.current} out of {skillGoals.total}
            </span>
          </div>
          <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1F2144] rounded-full transition-all duration-300" 
              style={{ width: `${skillGoalMatchPercentage}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};