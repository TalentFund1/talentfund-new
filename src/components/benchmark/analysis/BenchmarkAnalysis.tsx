import { useEffect, useState } from "react";
import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

export const BenchmarkAnalysis = ({ selectedRole, roleLevel, employeeId }: BenchmarkAnalysisProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();
  const [metrics, setMetrics] = useState({
    skillMatch: { current: 0, total: 0 },
    competencyMatch: { current: 0, total: 0 },
    skillGoals: { current: 0, total: 0 }
  });

  console.log('BenchmarkAnalysis - Re-rendering with:', {
    selectedRole,
    roleLevel,
    toggledSkillsCount: toggledSkills.size,
    toggledSkills: Array.from(toggledSkills)
  });

  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

  useEffect(() => {
    if (!currentRoleSkills) {
      console.error('No role skills found for selected role:', selectedRole);
      return;
    }

    // Get all skills for the role that are toggled on
    const toggledRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ].filter(skill => toggledSkills.has(skill.title));

    console.log('Toggled role skills:', toggledRoleSkills.map(s => s.title));
    const totalToggledSkills = toggledRoleSkills.length;

    if (totalToggledSkills === 0) {
      console.log('No toggled skills found, setting all metrics to 0');
      setMetrics({
        skillMatch: { current: 0, total: 0 },
        competencyMatch: { current: 0, total: 0 },
        skillGoals: { current: 0, total: 0 }
      });
      return;
    }

    // Match skills based on employee skills
    const matchingSkills = toggledRoleSkills.filter(roleSkill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
      return employeeSkill !== undefined;
    });

    // Competency Match calculation
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

    // Skill Goal Match calculation
    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = currentStates[skill.title];
      if (!skillState) return false;
      return skillState.requirement === 'required' || 
             skillState.requirement === 'skill_goal';
    });

    console.log('Metrics calculation results:', {
      totalSkills: totalToggledSkills,
      matchingSkills: matchingSkills.length,
      competencyMatches: competencyMatchingSkills.length,
      skillGoalMatches: skillGoalMatchingSkills.length
    });

    setMetrics({
      skillMatch: {
        current: matchingSkills.length,
        total: totalToggledSkills
      },
      competencyMatch: {
        current: competencyMatchingSkills.length,
        total: totalToggledSkills
      },
      skillGoals: {
        current: skillGoalMatchingSkills.length,
        total: totalToggledSkills
      }
    });
  }, [
    selectedRole,
    roleLevel,
    employeeId,
    toggledSkills,
    currentStates,
    getSkillCompetencyState,
    employeeSkills,
    currentRoleSkills
  ]);

  return <BenchmarkAnalysisCard {...metrics} />;
};