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
import { useMemo, useEffect, useState } from "react";
import { BenchmarkAnalysisCard } from "./analysis/BenchmarkAnalysisCard";
import { useToast } from "@/components/ui/use-toast";

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  const { selectedRole, selectedLevel } = useRoleStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toast } = useToast();
  const [matches, setMatches] = useState({ skillMatch: 0, competencyMatch: 0, skillGoalMatch: 0, total: 0 });
  
  // Memoize employee skills
  const employeeSkills = useMemo(() => getEmployeeSkills(id || ""), [id]);

  // Memoize current role skills lookup
  const currentRoleSkills = useMemo(() => {
    const skills = roleSkills[selectedRole as keyof typeof roleSkills];
    if (!skills) {
      console.error('No role skills found for role:', selectedRole);
      return null;
    }
    return skills;
  }, [selectedRole]);

  // Get toggled role skills with memoization
  const toggledRoleSkills = useMemo(() => {
    if (!currentRoleSkills) return [];
    
    return [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ].filter(skill => toggledSkills.has(skill.title));
  }, [currentRoleSkills, toggledSkills]);

  // Calculate matches using useEffect to ensure state updates
  useEffect(() => {
    if (!toggledRoleSkills.length) {
      console.log('No toggled skills found');
      setMatches({ skillMatch: 0, competencyMatch: 0, skillGoalMatch: 0, total: 0 });
      return;
    }

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

      return employeePriority === rolePriority || employeePriority > rolePriority;
    });

    // Skill Goal Match calculation
    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = currentStates[skill.title];
      if (!skillState) return false;
      return skillState.requirement === 'required' || skillState.requirement === 'skill_goal';
    });

    const newMatches = {
      skillMatch: matchingSkills.length,
      competencyMatch: competencyMatchingSkills.length,
      skillGoalMatch: skillGoalMatchingSkills.length,
      total: toggledRoleSkills.length
    };

    console.log('Updating matches:', newMatches);
    setMatches(newMatches);

  }, [toggledRoleSkills, employeeSkills, selectedLevel, currentStates, getSkillCompetencyState]);

  // Debug effect to track match updates
  useEffect(() => {
    console.log('Benchmark Analysis Updates:', {
      selectedRole,
      selectedLevel,
      toggledSkillsCount: toggledRoleSkills.length,
      matches
    });
  }, [selectedRole, selectedLevel, toggledRoleSkills.length, matches]);

  if (!currentRoleSkills) return null;

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
      </Card>
    </div>
  );
};