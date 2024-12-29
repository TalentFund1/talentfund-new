import { skillComparisonService } from './services/SkillComparisonService';
import { skillStateService } from './services/SkillStateService';
import { skillEnrichmentService } from './services/SkillEnrichmentService';
import { benchmarkCalculationService } from './services/BenchmarkCalculationService';

class BenchmarkingService {
  public compareSkillLevels = skillComparisonService.compareSkillLevels.bind(skillComparisonService);
  public calculateBenchmarkPercentage = benchmarkCalculationService.calculateBenchmarkPercentage.bind(benchmarkCalculationService);
  public createSkillState = skillStateService.createSkillState.bind(skillStateService);
  public getDefaultSkillState = skillStateService.getDefaultSkillState.bind(skillStateService);
  public updateCompetencyState = skillStateService.updateCompetencyState.bind(skillStateService);
  public matchesInterestFilter = skillStateService.matchesInterestFilter.bind(skillStateService);
  public enrichSkillData = skillEnrichmentService.enrichSkillData.bind(skillEnrichmentService);
  public initializeEmployeeSkillsData = skillEnrichmentService.initializeEmployeeSkillsData.bind(skillEnrichmentService);
  public getProgressColor = skillComparisonService.getProgressColor.bind(skillComparisonService);
}

export const benchmarkingService = new BenchmarkingService();