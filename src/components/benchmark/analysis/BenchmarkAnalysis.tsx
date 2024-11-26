import { useEffect, useMemo, useState } from "react";
import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useToast } from "@/components/ui/use-toast";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

export const BenchmarkAnalysis = ({ selectedRole, roleLevel, employeeId }: BenchmarkAnalysisProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();
  const { toast } = useToast();
  const [matches, setMatches] = useState({ skillMatch: 0, competencyMatch: 0, skillGoalMatch: 0, total: 0 });
  
  // Get employee skills
  const employeeSkills = useMemo(() => getEmployeeSkills(employeeId), [employeeId]);

  // Get current role skills
  const currentRoleSkills = useMemo(() => {
    const skills = roleSkills[selectedRole as keyof typeof roleSkills];
    if (!skills) {
      console.error('No role skills found for role:', selectedRole);
      return null;
    }
    return skills;
  }, [selectedRole]);

  // Get toggled role skills
  const toggledRoleSkills = useMemo(() => {
    if (!currentRoleSkills) return [];
    
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    console.log('Filtering toggled skills from:', allSkills.length, 'total skills');
    const filtered = allSkills.filter(skill => toggledSkills.has(skill.title));
    console.log('Found', filtered.length, 'toggled skills');
    
    return filtered;
  }, [currentRoleSkills, toggledSkills]);

  // Calculate matches
  useEffect(() => {
    const calculateMatches = () => {
      if (!toggledRoleSkills.length) {
        console.log('No toggled skills found');
        setMatches({ skillMatch: 0, competencyMatch: 0, skillGoalMatch: 0, total: 0 });
        return;
      }

      console.log('Calculating matches for', toggledRoleSkills.length, 'toggled skills');

      // Match skills based on role profile skills
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

      const newMatches = {
        skillMatch: matchingSkills.length,
        competencyMatch: competencyMatchingSkills.length,
        skillGoalMatch: skillGoalMatchingSkills.length,
        total: toggledRoleSkills.length
      };

      console.log('Setting new matches:', newMatches);
      setMatches(newMatches);

      // Show toast on significant changes
      if (newMatches.skillMatch !== matches.skillMatch) {
        toast({
          title: "Skills Updated",
          description: `Skill matches updated to ${newMatches.skillMatch} out of ${newMatches.total}`,
        });
      }
    };

    // Calculate matches immediately
    calculateMatches();

    // Set up subscription to toggledSkills changes
    const intervalId = setInterval(calculateMatches, 500);

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [
    toggledRoleSkills,
    employeeSkills,
    roleLevel,
    currentStates,
    getSkillCompetencyState,
    toggledSkills,
    matches.skillMatch,
    toast
  ]);

  // Debug effect
  useEffect(() => {
    console.log('BenchmarkAnalysis - Matches updated:', matches);
  }, [matches]);

  if (!currentRoleSkills) return null;

  return (
    <BenchmarkAnalysisCard 
      skillMatch={{
        current: matches.skillMatch,
        total: matches.total
      }}
      competencyMatch={{
        current: matches.competencyMatch,
        total: matches.total
      }}
      skillGoals={{
        current: matches.skillGoalMatch,
        total: matches.total
      }}
    />
  );
};