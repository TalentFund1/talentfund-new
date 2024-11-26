import { Card } from "@/components/ui/card";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { useTrack } from "../../skills/context/TrackContext";
import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkProgressBar } from "./BenchmarkProgressBar";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

export const BenchmarkAnalysis = ({ selectedRole, roleLevel, employeeId }: BenchmarkAnalysisProps) => {
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(employeeId);
  const { getTrackForRole } = useTrack();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  console.log('Starting benchmark analysis with:', {
    selectedRole,
    roleLevel,
    employeeId,
    toggledSkillsCount: toggledSkills.size,
    toggledSkills: Array.from(toggledSkills)
  });

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.error('No role skills found for role:', selectedRole);
    return null;
  }

  // Get only toggled skills for the selected role
  const toggledRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  const totalToggledSkills = toggledRoleSkills.length;

  console.log('Filtered toggled skills:', {
    roleId: selectedRole,
    total: totalToggledSkills,
    skills: toggledRoleSkills.map(s => s.title)
  });

  // Match skills based on role profile skills (only toggled ones)
  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  // Competency Match calculation (only for toggled skills)
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
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

  // Skill Goal Match calculation (only for toggled skills)
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    if (!skillState) return false;
    return skillState.requirement === 'required' || 
           skillState.requirement === 'skill_goal';
  });

  console.log('Benchmark calculations for toggled skills:', {
    roleId: selectedRole,
    skillMatches: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    skillGoalMatches: skillGoalMatchingSkills.length,
    totalToggledSkills
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
          <BenchmarkProgressBar 
            label="Skill Match"
            current={matchingSkills.length}
            total={totalToggledSkills}
          />
          <BenchmarkProgressBar 
            label="Competency Match"
            current={competencyMatchingSkills.length}
            total={totalToggledSkills}
          />
          <BenchmarkProgressBar 
            label="Skill Goal Match"
            current={skillGoalMatchingSkills.length}
            total={totalToggledSkills}
          />
        </div>
      </Card>
    </div>
  );
};