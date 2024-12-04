import { SkillBubble } from "../skills/SkillBubble";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

interface SkillsDisplayProps {
  employeeId: string;
  selectedSkills: string[];
}

export const SkillsDisplay = ({ employeeId, selectedSkills }: SkillsDisplayProps) => {
  if (selectedSkills.length === 0) return null;

  const employeeSkills = getEmployeeSkills(employeeId);
  
  const skillsToShow = selectedSkills.filter(skillName => 
    employeeSkills.some(empSkill => empSkill.title === skillName)
  );

  return (
    <div className="flex flex-wrap gap-2 min-w-[300px] px-4">
      {skillsToShow.map(skillName => {
        const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skillName);
        if (!employeeSkill) return null;
        
        return (
          <SkillBubble
            key={skillName}
            skillName={skillName}
            level={employeeSkill.level || 'unspecified'}
            isRequired={false}
          />
        );
      })}
    </div>
  );
};