import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "../skills/competency/CompetencyState";

interface MissingSkills2Props {
  roleId: string;
  employeeId: string;
  selectedLevel: string;
}

export const MissingSkills2 = ({ roleId, employeeId, selectedLevel }: MissingSkills2Props) => {
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useCompetencyStore();
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

  // Separate missing skills into required and preferred
  const requiredMissingSkills = missingSkills.filter(skill => skill.requirement === 'required');
  const preferredMissingSkills = missingSkills.filter(skill => skill.requirement === 'preferred');

  const getLevelColor = (skillTitle: string) => {
    const skillState = currentStates[skillTitle]?.[selectedLevel];
    
    if (!skillState) return "bg-gray-300"; // Default unspecified

    if (skillState.level === "advanced") {
      return "bg-primary-accent";
    } else if (skillState.level === "intermediate") {
      return "bg-primary-icon";
    } else if (skillState.level === "beginner") {
      return "bg-[#008000]";
    }

    return "bg-gray-300"; // Default unspecified
  };

  if (missingSkills.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {requiredMissingSkills.length > 0 && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Missing Skills Required</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {requiredMissingSkills.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {requiredMissingSkills.map((skill) => (
              <Badge 
                key={skill.title}
                variant="outline" 
                className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
              >
                {skill.title}
                <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.title)}`} />
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {preferredMissingSkills.length > 0 && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Missing Skills Preferred</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {preferredMissingSkills.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferredMissingSkills.map((skill) => (
              <Badge 
                key={skill.title}
                variant="outline" 
                className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
              >
                {skill.title}
                <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.title)}`} />
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};