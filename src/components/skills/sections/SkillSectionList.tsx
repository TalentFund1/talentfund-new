import { SkillSection } from "../SkillSection";
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";

interface SkillSectionListProps {
  categorizedSkills: {
    current: EmployeeSkillData[];
    developing: EmployeeSkillData[];
    adjacent: EmployeeSkillData[];
  };
}

export const SkillSectionList = ({ categorizedSkills }: SkillSectionListProps) => {
  return (
    <div className="space-y-6">
      <SkillSection 
        title="Current" 
        count={categorizedSkills.current.length}
        skills={categorizedSkills.current}
      />
      <SkillSection 
        title="Developing" 
        count={categorizedSkills.developing.length}
        skills={categorizedSkills.developing}
      />
      <SkillSection 
        title="Adjacent" 
        count={categorizedSkills.adjacent.length}
        skills={categorizedSkills.adjacent}
      />
    </div>
  );
};