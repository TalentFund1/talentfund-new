import { useEffect, useMemo } from "react";
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
  
  const employeeSkills = useMemo(() => getEmployeeSkills(employeeId), [employeeId]);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  
  // Memoize all calculations to improve performance and reactivity
  const calculations = useMemo(() => {
    if (!currentRoleSkills) {
      console.error('No role skills found for selected role:', selectedRole);
      return {
        matchingSkills: [],
        competencyMatchingSkills: [],
        skillGoalMatchingSkills: [],
        totalSkills: 0
      };
    }

    // Get all role skills that are currently toggled on
    const toggledRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ].filter(skill => toggledSkills.has(skill.title));

    console.log('Filtered toggled skills:', toggledRoleSkills.map(s => s.title));

    // Calculate matching skills
    const matchingSkills = toggledRoleSkills.filter(roleSkill => 
      employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
    );

    // Calculate competency matches
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

    // Calculate skill goal matches
    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = currentStates[skill.title];
      if (!skillState) return false;
      return skillState.requirement === 'required' || 
             skillState.requirement === 'skill_goal';
    });

    console.log('Benchmark Analysis Calculations:', {
      totalToggled: toggledRoleSkills.length,
      matching: matchingSkills.length,
      competency: competencyMatchingSkills.length,
      skillGoals: skillGoalMatchingSkills.length
    });

    return {
      matchingSkills,
      competencyMatchingSkills,
      skillGoalMatchingSkills,
      totalSkills: toggledRoleSkills.length
    };
  }, [currentRoleSkills, toggledSkills, employeeSkills, currentStates, getSkillCompetencyState, roleLevel]);

  // Log changes for debugging
  useEffect(() => {
    console.log('BenchmarkAnalysis - State Update:', {
      roleId: selectedRole,
      level: roleLevel,
      toggledSkillsCount: toggledSkills.size,
      toggledSkills: Array.from(toggledSkills),
      calculations: {
        total: calculations.totalSkills,
        matching: calculations.matchingSkills.length,
        competency: calculations.competencyMatchingSkills.length,
        skillGoals: calculations.skillGoalMatchingSkills.length
      }
    });
  }, [selectedRole, roleLevel, toggledSkills, calculations]);

  return (
    <BenchmarkAnalysisCard 
      skillMatch={{
        current: calculations.matchingSkills.length,
        total: calculations.totalSkills
      }}
      competencyMatch={{
        current: calculations.competencyMatchingSkills.length,
        total: calculations.totalSkills
      }}
      skillGoals={{
        current: calculations.skillGoalMatchingSkills.length,
        total: calculations.totalSkills
      }}
    />
  );
};