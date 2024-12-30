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
  // Filter skills that are marked for development via checkbox
  const developingViaCheckbox = categorizedSkills.current.filter(skill => 
    skill.inDevelopmentPlan === true
  );

  console.log('SkillSectionList - Skills marked for development via checkbox:', 
    developingViaCheckbox.map(s => ({
      title: s.title,
      inDevelopmentPlan: s.inDevelopmentPlan
    }))
  );

  return (
    <div className="space-y-6">
      <SkillSection 
        title="Current" 
        count={categorizedSkills.current.length}
        skills={categorizedSkills.current}
      />
      <SkillSection 
        title="Developing 2" 
        count={developingViaCheckbox.length}
        skills={developingViaCheckbox}
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