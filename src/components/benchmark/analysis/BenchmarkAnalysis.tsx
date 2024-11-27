import { useEffect, useState } from "react";
import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useRoleStore } from "../RoleBenchmark";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

export const BenchmarkAnalysis = ({ selectedRole, roleLevel, employeeId }: BenchmarkAnalysisProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const [metrics, setMetrics] = useState({
    skillMatch: { current: 0, total: 0 },
    competencyMatch: { current: 0, total: 0 },
    skillGoals: { current: 0, total: 0 }
  });
  
  console.log('BenchmarkAnalysis - Re-rendering with:', {
    selectedRole,
    roleLevel
  });

  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  
  useEffect(() => {
    if (!currentRoleSkills) {
      console.error('No role skills found for selected role:', selectedRole);
      return;
    }

    // Get all skills for the role
    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    console.log('Calculating metrics for all skills:', {
      roleId: selectedRole,
      level: roleLevel,
      count: allRoleSkills.length,
      skills: allRoleSkills.map(s => s.title)
    });

    // Match skills based on employee skills
    const matchingSkills = allRoleSkills.filter(roleSkill => {
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
      totalSkills: allRoleSkills.length,
      matchingSkills: matchingSkills.length,
      competencyMatches: competencyMatchingSkills.length,
      skillGoalMatches: skillGoalMatchingSkills.length
    });

    setMetrics({
      skillMatch: {
        current: matchingSkills.length,
        total: allRoleSkills.length
      },
      competencyMatch: {
        current: competencyMatchingSkills.length,
        total: allRoleSkills.length
      },
      skillGoals: {
        current: skillGoalMatchingSkills.length,
        total: allRoleSkills.length
      }
    });
  }, [
    selectedRole,
    roleLevel,
    employeeId,
    currentStates,
    getSkillCompetencyState,
    employeeSkills,
    currentRoleSkills
  ]);

  if (!currentRoleSkills) {
    console.error('No role skills found for selected role:', selectedRole);
    return null;
  }

  return <BenchmarkAnalysisCard {...metrics} />;
};