import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

interface MissingSkillsProps {
  roleId: string;
  employeeId: string;
}

export const MissingSkills = ({ roleId, employeeId }: MissingSkillsProps) => {
  const { toggledSkills } = useToggledSkills();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  // Get all required and preferred skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Find missing skills by comparing with employee skills, but only for toggled skills
  const missingSkills = allRoleSkills.filter(roleSkill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === roleSkill.title);
    return !hasSkill && toggledSkills.has(roleSkill.title);
  });

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  const getRequirementBadgeColor = (requirement: string | undefined) => {
    return requirement === 'required' 
      ? 'border-primary-accent bg-primary-accent/10 text-primary-accent'
      : 'border-primary-icon bg-primary-icon/10 text-primary-icon';
  };

  if (missingSkills.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Missing Skills</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {missingSkills.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {missingSkills.map((skill) => (
          <div key={skill.title} className="flex flex-col gap-1">
            <Badge 
              variant="outline" 
              className={`rounded-md px-4 py-2 border bg-white hover:bg-background/80 transition-colors flex items-center gap-2 ${getRequirementBadgeColor(skill.requirement)}`}
            >
              <span>{skill.title}</span>
              <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
              <span className="text-xs font-normal">
                ({skill.level || 'Unspecified'} - {skill.requirement || 'Preferred'})
              </span>
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};