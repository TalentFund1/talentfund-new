import { SkillSection } from "../SkillSection";
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";

interface SkillSectionListProps {
  categorizedSkills: {
    current: EmployeeSkillData[];
    developing: EmployeeSkillData[];
    adjacent: EmployeeSkillData[];
  };
  showAdjacent?: boolean;
}

export const SkillSectionList = ({ categorizedSkills, showAdjacent = true }: SkillSectionListProps) => {
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
      {showAdjacent && (
        <SkillSection 
          title="Adjacent" 
          count={categorizedSkills.adjacent.length}
          skills={categorizedSkills.adjacent}
        />
      )}
    </div>
  );
};