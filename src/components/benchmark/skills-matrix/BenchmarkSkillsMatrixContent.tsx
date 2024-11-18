import { useRef } from "react";
import { SkillsMatrixContent } from "./SkillsMatrixContent";
import { CategorizedSkills } from "../CategorizedSkills";
import { SkillGoalSection } from "../SkillGoalSection";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

interface BenchmarkSkillsMatrixContentProps {
  roleId: string;
  employeeId: string;
  roleLevel: string;
  filteredSkills: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSkillLevel: string;
  setSelectedSkillLevel: (level: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
}

export const BenchmarkSkillsMatrixContent = ({
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  ...props
}: BenchmarkSkillsMatrixContentProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();

  // Original skill goals - based on required skills
  const skillGoals = filteredSkills.filter(skill => {
    const currentSkillState = currentStates[skill.title];
    return currentSkillState?.requirement === 'required';
  });

  // New skill goals - based on all toggled skills
  const allSkillGoals = filteredSkills.filter(skill => {
    const currentSkillState = currentStates[skill.title];
    return currentSkillState?.requirement === 'skill_goal' || currentSkillState?.requirement === 'required';
  });

  return (
    <>
      <CategorizedSkills 
        roleId={roleId}
        employeeId={employeeId}
        selectedLevel={roleLevel}
      />

      {skillGoals.length > 0 && (
        <SkillGoalSection 
          skills={skillGoals}
          count={skillGoals.length}
          title="Skill Goals (Required)"
        />
      )}

      {allSkillGoals.length > 0 && (
        <SkillGoalSection 
          skills={allSkillGoals}
          count={allSkillGoals.length}
          title="Skill Goals (All)"
        />
      )}

      <SkillsMatrixContent 
        filteredSkills={filteredSkills}
        {...props}
      />
    </>
  );
};