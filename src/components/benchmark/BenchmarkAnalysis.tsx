import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useRoleStore } from "./RoleBenchmark";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useEffect, useState } from "react";

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(id || "");
  const { selectedRole, selectedLevel } = useRoleStore();
  const { getTrackForRole } = useTrack();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  const [metrics, setMetrics] = useState({
    matchingCount: 0,
    competencyCount: 0,
    skillGoalCount: 0,
    totalSkills: 0
  });

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  
  if (!currentRoleSkills) {
    console.error('No role skills found for role:', selectedRole);
    return null;
  }

  // Get all skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Update metrics whenever any relevant state changes
  useEffect(() => {
    console.log('Recalculating metrics due to state change:', {
      toggledSkills: Array.from(toggledSkills),
      selectedLevel,
      currentStates
    });
    
    // Get all toggled skills for the role
    const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
    const totalToggledSkills = toggledRoleSkills.length;

    console.log('Filtered toggled skills:', toggledRoleSkills.map(s => s.title));

    // Match skills based on role profile skills
    const matchingSkills = toggledRoleSkills.filter(roleSkill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
      return employeeSkill !== undefined;
    });

    // Competency Match calculation
    const competencyMatchingSkills = matchingSkills.filter(skill => {
      const roleSkillState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
      if (!roleSkillState) return false;

      const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
      const roleSkillLevel = roleSkillState.level;

      const getLevelPriority = (level: string = 'unspecified') => {
        const priorities: { [key: string]: number } = {
          'advanced': 3,
          'intermediate': 2,
          'beginner': 1,
          'unspecified': 0
        };
        return priorities[level.toLowerCase()] ?? 0;
      };

      const employeePriority = getLevelPriority(employeeSkillLevel);
      const rolePriority = getLevelPriority(roleSkillLevel);

      return employeePriority >= rolePriority;
    });

    // Skill Goal Match calculation
    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = currentStates[skill.title];
      if (!skillState) return false;
      return skillState.requirement === 'required' || skillState.requirement === 'skill_goal';
    });

    console.log('Metrics calculation:', {
      total: totalToggledSkills,
      matching: matchingSkills.length,
      competency: competencyMatchingSkills.length,
      skillGoal: skillGoalMatchingSkills.length
    });

    setMetrics({
      matchingCount: matchingSkills.length,
      competencyCount: competencyMatchingSkills.length,
      skillGoalCount: skillGoalMatchingSkills.length,
      totalSkills: totalToggledSkills
    });
  }, [toggledSkills, selectedLevel, currentStates, employeeSkills, allRoleSkills, getSkillCompetencyState]);

  // Calculate percentages based on current metrics
  const skillMatchPercentage = metrics.totalSkills > 0 ? (metrics.matchingCount / metrics.totalSkills) * 100 : 0;
  const competencyMatchPercentage = metrics.totalSkills > 0 ? (metrics.competencyCount / metrics.totalSkills) * 100 : 0;
  const skillGoalMatchPercentage = metrics.totalSkills > 0 ? (metrics.skillGoalCount / metrics.totalSkills) * 100 : 0;

  // Calculate average percentage
  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              Benchmark Analysis
              <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
                {averagePercentage}%
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage and track employee skills and competencies
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Skill Match</span>
                <span className="text-sm text-foreground">
                  {metrics.matchingCount} out of {metrics.totalSkills}
                </span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full transition-all duration-300" 
                  style={{ width: `${skillMatchPercentage}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Competency Match</span>
                <span className="text-sm text-foreground">
                  {metrics.competencyCount} out of {metrics.totalSkills}
                </span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full transition-all duration-300" 
                  style={{ width: `${competencyMatchPercentage}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Skill Goal Match</span>
                <span className="text-sm text-foreground">
                  {metrics.skillGoalCount} out of {metrics.totalSkills}
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
      </Card>
    </div>
  );
};