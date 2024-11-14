import { SkillBadge } from "./SkillBadge";
import { SkillSection } from "./SkillSection";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { initialSkills } from "../benchmark/skills-matrix/initialSkills";
import { useParams } from "react-router-dom";

export const SkillGoalsSection = () => {
  const { id } = useParams();
  const { currentStates } = useSkillsMatrixStore();
  
  // Get employee skills from initialSkills
  const employeeSkills = initialSkills[id as keyof typeof initialSkills] || [];
  
  // Filter skills that are marked as required (skill goal)
  const skillGoals = employeeSkills.filter(skill => 
    currentStates[skill.title]?.requirement === 'required'
  );

  if (skillGoals.length === 0) {
    return null;
  }

  return (
    <SkillSection title="Skill Goals" count={skillGoals.length}>
      <div className="flex flex-wrap gap-2">
        {skillGoals.map((skill) => (
          <SkillBadge
            key={skill.title}
            skill={{ name: skill.title }}
            showLevel={true}
            level={currentStates[skill.title]?.level || skill.level}
            isSkillGoal={true}
          />
        ))}
      </div>
    </SkillSection>
  );
};