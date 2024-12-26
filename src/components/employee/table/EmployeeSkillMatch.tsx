import { SkillBubble } from "../../skills/SkillBubble";
import { getEmployeeSkills } from "../../benchmark/skills-matrix/initialSkills";

interface EmployeeSkillMatchProps {
  employeeId: string;
  selectedSkills: string[];
}

export const EmployeeSkillMatch = ({ employeeId, selectedSkills }: EmployeeSkillMatchProps) => {
  const employeeSkills = getEmployeeSkills(employeeId);
  
  const matchingSkills = selectedSkills.filter(skillName => 
    employeeSkills.some(empSkill => empSkill.title === skillName)
  );

  const adjacentSkills = employeeSkills
    .filter(empSkill => !selectedSkills.includes(empSkill.title))
    .slice(0, 3);

  return (
    <>
      <td className="px-6 py-4 w-[350px] text-left">
        <div className="flex flex-wrap gap-2 min-w-[250px]">
          {matchingSkills.map(skillName => {
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
      </td>
      <td className="px-6 py-4 w-[350px] text-left">
        <div className="flex flex-wrap gap-2 min-w-[250px]">
          {adjacentSkills.map(skill => (
            <SkillBubble
              key={skill.title}
              skillName={skill.title}
              level={skill.level || 'unspecified'}
              isRequired={false}
            />
          ))}
        </div>
      </td>
    </>
  );
};