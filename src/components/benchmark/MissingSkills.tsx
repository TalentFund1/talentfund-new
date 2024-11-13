import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

interface MissingSkillsProps {
  roleId: string;
  employeeId: string;
  selectedLevel: string;
}

interface RoleSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  requirement?: 'required' | 'preferred';
}

export const MissingSkills = ({ roleId, employeeId, selectedLevel }: MissingSkillsProps) => {
  const { toggledSkills } = useToggledSkills();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  // Get all required and preferred skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ] as RoleSkill[];

  // Find missing skills by comparing with employee skills, but only for toggled skills
  const missingSkills = allRoleSkills.filter(roleSkill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === roleSkill.title);
    return !hasSkill && toggledSkills.has(roleSkill.title);
  });

  const getDotColor = (skillTitle: string) => {
    // Find the skill in the role skills to determine if it's required or preferred
    const skill = allRoleSkills.find(s => s.title === skillTitle);
    
    // For Frontend Engineer role (125)
    if (roleId === "125") {
      if (skillTitle === "React" || skillTitle === "TypeScript") {
        return "bg-primary-accent"; // Purple dot for required skills
      }
      return "bg-primary-icon"; // Orange dot for preferred skills
    }
    
    // Default colors for other roles based on requirement
    return skill?.requirement === 'required' 
      ? "bg-primary-accent" 
      : "bg-primary-icon";
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
          <Badge 
            key={skill.title}
            variant="outline" 
            className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
          >
            {skill.title}
            <div className={`h-2 w-2 rounded-full ${getDotColor(skill.title)}`} />
          </Badge>
        ))}
      </div>
    </Card>
  );
};