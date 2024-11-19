import { BenchmarkProgressBar } from "./BenchmarkProgressBar";
import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";

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
  const { currentStates } = useSkillsMatrixStore();
  
  // Calculate actual skill goals from current states
  const actualSkillGoals = {
    current: Object.values(currentStates).filter(state => 
      state?.requirement === 'required' || state?.requirement === 'skill_goal'
    ).length,
    total: skillGoals.total
  };

  const matchPercentage = Math.round((skillMatch.current / skillMatch.total) * 100);

  console.log('BenchmarkAnalysisCard - Skill Goals:', {
    currentStates,
    actualSkillGoals,
    originalSkillGoals: skillGoals,
    skillGoalStates: Object.entries(currentStates).map(([key, state]) => ({
      skill: key,
      requirement: state?.requirement
    }))
  });

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
          current={actualSkillGoals.current}
          total={actualSkillGoals.total}
        />
      </div>
    </div>
  );
};