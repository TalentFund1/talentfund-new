import { skillStateService } from './services/SkillStateService';
import { skillEnrichmentService } from './services/SkillEnrichmentService';
import { benchmarkCalculationService } from './services/BenchmarkCalculationService';
import { unifiedBenchmarkCalculator } from '../../components/benchmark/analysis/UnifiedBenchmarkCalculator';

class BenchmarkingService {
  public compareSkillLevels = unifiedBenchmarkCalculator.compareSkillLevels.bind(unifiedBenchmarkCalculator);
  public calculateBenchmarkPercentage = benchmarkCalculationService.calculateBenchmarkPercentage.bind(benchmarkCalculationService);
  public createSkillState = skillStateService.createSkillState.bind(skillStateService);
  public getDefaultSkillState = skillStateService.getDefaultSkillState.bind(skillStateService);
  public updateCompetencyState = skillStateService.updateCompetencyState.bind(skillStateService);
  public matchesInterestFilter = skillStateService.matchesInterestFilter.bind(skillStateService);
  public enrichSkillData = skillEnrichmentService.enrichSkillData.bind(skillEnrichmentService);
  public initializeEmployeeSkillsData = skillEnrichmentService.initializeEmployeeSkillsData.bind(skillEnrichmentService);
  public getProgressColor = unifiedBenchmarkCalculator.getProgressColor.bind(unifiedBenchmarkCalculator);
}

export const benchmarkingService = new BenchmarkingService();