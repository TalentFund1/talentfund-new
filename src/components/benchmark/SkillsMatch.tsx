import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { RoleSkill } from "../skills/types";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";

export const SkillsMatch = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["125"];
  const employeeSkills = getEmployeeSkills(id || "");
  
  // Calculate total required and preferred skills
  const requiredAndPreferredSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter((skill: RoleSkill) => skill.requirement === 'required' || skill.requirement === 'preferred');

  // Calculate matching skills
  const matchingSkills = requiredAndPreferredSkills.filter(skill => 
    employeeSkills.some(empSkill => empSkill.title === skill.title)
  );

  // Calculate skill match percentage
  const totalSkillsCount = requiredAndPreferredSkills.length;
  const matchingSkillsCount = matchingSkills.length;
  const matchPercentage = totalSkillsCount > 0 
    ? Math.round((matchingSkillsCount / totalSkillsCount) * 100)
    : 0;

  return (
    <Card className="p-6 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          Skills Match
          <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
            {matchPercentage}%
          </span>
        </h2>
      </div>
      <div className="text-sm text-muted-foreground">
        {matchingSkillsCount} out of {totalSkillsCount} required and preferred skills
      </div>
    </Card>
  );
};