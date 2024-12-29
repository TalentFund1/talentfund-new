import { benchmarkingService } from "../../../services/benchmarking";

interface MatchPercentages {
  skillMatchPercentage: number;
  competencyMatchPercentage: number;
  skillGoalMatchPercentage: number;
  averagePercentage: number;
}

export const calculateMatchPercentages = (
  matchingSkillsCount: number,
  competencyMatchCount: number,
  skillGoalMatchCount: number,
  totalToggledSkills: number
): MatchPercentages => {
  console.log('Calculating match percentages:', {
    matchingSkills: matchingSkillsCount,
    competencyMatch: competencyMatchCount,
    skillGoalMatch: skillGoalMatchCount,
    total: totalToggledSkills
  });

  const skillMatchPercentage = benchmarkingService.calculateBenchmarkPercentage(
    matchingSkillsCount,
    totalToggledSkills
  );

  const competencyMatchPercentage = benchmarkingService.calculateBenchmarkPercentage(
    competencyMatchCount,
    totalToggledSkills
  );

  const skillGoalMatchPercentage = benchmarkingService.calculateBenchmarkPercentage(
    skillGoalMatchCount,
    totalToggledSkills
  );

  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  return {
    skillMatchPercentage,
    competencyMatchPercentage,
    skillGoalMatchPercentage,
    averagePercentage
  };
};