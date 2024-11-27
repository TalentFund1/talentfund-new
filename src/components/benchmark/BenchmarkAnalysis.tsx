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
import { useEffect } from "react";

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(id || "");
  const { selectedRole, selectedLevel } = useRoleStore();
  const { getTrackForRole } = useTrack();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  
  useEffect(() => {
    if (!currentRoleSkills) {
      console.error('No role skills found for role:', selectedRole);
      return;
    }

    // Get all skills for the role
    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    // Initialize toggledSkills with all role skills
    const initialToggledSkills = new Set(allRoleSkills.map(skill => skill.title));
    setToggledSkills(initialToggledSkills);

    console.log('Initialized toggled skills:', {
      roleId: selectedRole,
      level: selectedLevel,
      skills: Array.from(initialToggledSkills)
    });
  }, [selectedRole, selectedLevel, currentRoleSkills, setToggledSkills]);

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

  // Get all toggled skills for the role
  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));

  console.log('Toggled skills for role:', {
    roleId: selectedRole,
    level: selectedLevel,
    count: toggledRoleSkills.length,
    skills: toggledRoleSkills.map(s => s.title)
  });

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

  const totalToggledSkills = toggledRoleSkills.length;
  const matchingSkillsCount = matchingSkills.length;
  const competencyMatchCount = competencyMatchingSkills.length;
  const skillGoalMatchCount = skillGoalMatchingSkills.length;

  // Calculate individual percentages based on toggled skills
  const skillMatchPercentage = totalToggledSkills > 0 ? (matchingSkillsCount / totalToggledSkills) * 100 : 0;
  const competencyMatchPercentage = totalToggledSkills > 0 ? (competencyMatchCount / totalToggledSkills) * 100 : 0;
  const skillGoalMatchPercentage = totalToggledSkills > 0 ? (skillGoalMatchCount / totalToggledSkills) * 100 : 0;

  // Calculate average percentage
  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  console.log('Benchmark Analysis Calculation:', {
    totalToggled: totalToggledSkills,
    skillMatch: { count: matchingSkillsCount, percentage: skillMatchPercentage },
    competencyMatch: { count: competencyMatchCount, percentage: competencyMatchPercentage },
    skillGoalMatch: { count: skillGoalMatchCount, percentage: skillGoalMatchPercentage },
    averagePercentage
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
        </div>
      </Card>
    </div>
  );
};