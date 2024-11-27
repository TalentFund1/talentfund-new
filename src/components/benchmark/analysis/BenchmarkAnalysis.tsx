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
  const [analysisData, setAnalysisData] = useState({
    skillMatch: { current: 0, total: 0 },
    competencyMatch: { current: 0, total: 0 },
    skillGoals: { current: 0, total: 0 }
  });

  useEffect(() => {
    const calculateAnalysis = () => {
      console.log('Recalculating benchmark analysis:', {
        selectedRole,
        roleLevel,
        toggledSkillsCount: toggledSkills.size,
        currentStatesCount: Object.keys(currentStates).length
      });

      const employeeSkills = getEmployeeSkills(employeeId);
      const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

      if (!currentRoleSkills) {
        console.error('No role skills found for selected role:', selectedRole);
        return;
      }

      // Get only toggled skills for the current role
      const allRoleSkills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ];

      const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
      const totalToggledSkills = toggledRoleSkills.length;

      console.log('Toggled skills count:', totalToggledSkills);

      // Calculate matching skills
      const matchingSkills = toggledRoleSkills.filter(roleSkill => {
        const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
        return employeeSkill !== undefined;
      });

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

      console.log('Analysis results:', {
        totalSkills: totalToggledSkills,
        matchingSkills: matchingSkills.length,
        competencyMatches: competencyMatchingSkills.length,
        skillGoalMatches: skillGoalMatchingSkills.length
      });

      setAnalysisData({
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
    };

    calculateAnalysis();
  }, [selectedRole, roleLevel, employeeId, toggledSkills, currentStates, getSkillCompetencyState]);

  return <BenchmarkAnalysisCard {...analysisData} />;
};