import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useEffect, useState } from "react";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

export const BenchmarkAnalysis = ({ selectedRole, roleLevel, employeeId }: BenchmarkAnalysisProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();
  const [skillCounts, setSkillCounts] = useState({
    matching: { current: 0, total: 0 },
    competency: { current: 0, total: 0 },
    skillGoals: { current: 0, total: 0 }
  });

  useEffect(() => {
    const calculateSkillCounts = () => {
      console.log('Recalculating benchmark analysis due to changes:', {
        selectedRole,
        roleLevel,
        toggledSkillsCount: toggledSkills.size,
        toggledSkills: Array.from(toggledSkills)
      });

      const employeeSkills = getEmployeeSkills(employeeId);
      const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
      
      if (!currentRoleSkills) {
        console.error('No role skills found for selected role:', selectedRole);
        return;
      }

      // Get all toggled skills for the selected role
      const allRoleSkills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ];

      const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
      const totalToggledSkills = toggledRoleSkills.length;

      console.log('Selected role toggled skills:', {
        roleId: selectedRole,
        total: totalToggledSkills,
        skills: toggledRoleSkills.map(s => s.title)
      });

      // Skill Match calculation
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

        return employeePriority === rolePriority || employeePriority > rolePriority;
      });

      // Skill Goal Match calculation
      const skillGoalMatchingSkills = matchingSkills.filter(skill => {
        const skillState = currentStates[skill.title];
        if (!skillState) return false;
        return skillState.requirement === 'required' || 
               skillState.requirement === 'skill_goal';
      });

      console.log('Skill counts calculation result:', {
        total: totalToggledSkills,
        matching: matchingSkills.length,
        competency: competencyMatchingSkills.length,
        skillGoals: skillGoalMatchingSkills.length
      });

      setSkillCounts({
        matching: {
          current: matchingSkills.length,
          total: totalToggledSkills
        },
        competency: {
          current: competencyMatchingSkills.length,
          total: totalToggledSkills
        },
        skillGoals: {
          current: skillGoalMatchingSkills.length,
          total: totalToggledSkills
        }
      });
    };

    calculateSkillCounts();
  }, [selectedRole, roleLevel, employeeId, toggledSkills, currentStates, getSkillCompetencyState]);

  return (
    <BenchmarkAnalysisCard 
      skillMatch={skillCounts.matching}
      competencyMatch={skillCounts.competency}
      skillGoals={skillCounts.skillGoals}
    />
  );
};