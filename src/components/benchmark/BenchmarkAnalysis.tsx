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

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(id || "");
  const { selectedRole, selectedLevel } = useRoleStore();
  const { getTrackForRole } = useTrack();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.error('No role skills found for role:', selectedRole);
    return null;
  }

  const track = getTrackForRole(selectedRole);
  console.log('Current track and selected level:', { track, selectedLevel });

  const comparisonLevel = selectedLevel.toLowerCase();
  console.log('Using comparison level:', comparisonLevel);

  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));

  console.log('Toggled skills for role:', {
    roleId: selectedRole,
    level: comparisonLevel,
    count: toggledRoleSkills.length,
    skills: toggledRoleSkills.map(s => s.title)
  });

  // Basic skill match - employee has the skill
  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  // Competency match - employee skill level meets or exceeds role requirement
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel);
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[skill.title]?.level || 'unspecified';
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

    console.log('Competency comparison:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel,
      employeePriority,
      rolePriority,
      isMatch: employeePriority >= rolePriority
    });

    return employeePriority >= rolePriority;
  });

  // Skill goal match - employee has marked the skill as required or skill_goal
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel);
    
    console.log('Skill goal check:', {
      skill: skill.title,
      employeeState: skillState?.requirement,
      roleRequired: roleSkillState?.required
    });

    return skillState?.requirement === 'skill_goal' || 
           (roleSkillState?.required === 'required' && skillState?.requirement === 'required');
  });

  const totalToggledSkills = toggledRoleSkills.length;
  const matchingSkillsCount = matchingSkills.length;
  const competencyMatchCount = competencyMatchingSkills.length;
  const skillGoalMatchCount = skillGoalMatchingSkills.length;

  const skillMatchPercentage = totalToggledSkills > 0 ? (matchingSkillsCount / totalToggledSkills) * 100 : 0;
  const competencyMatchPercentage = totalToggledSkills > 0 ? (competencyMatchCount / totalToggledSkills) * 100 : 0;
  const skillGoalMatchPercentage = totalToggledSkills > 0 ? (skillGoalMatchCount / totalToggledSkills) * 100 : 0;

  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  console.log('Benchmark Analysis Calculation:', {
    totalToggled: totalToggledSkills,
    skillMatch: { count: matchingSkillsCount, percentage: skillMatchPercentage },
    competencyMatch: { count: competencyMatchCount, percentage: competencyMatchPercentage },
    skillGoalMatch: { count: skillGoalMatchCount, percentage: skillGoalMatchPercentage },
    averagePercentage,
    track,
    comparisonLevel
  });

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">
              Benchmark Analysis
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
                  {matchingSkillsCount} out of {totalToggledSkills}
                </span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full" 
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
                  {competencyMatchCount} out of {totalToggledSkills}
                </span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full" 
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
                  {skillGoalMatchCount} out of {totalToggledSkills}
                </span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full" 
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