import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { getRoleSkills } from "../skills/data/roles/roleDataReader";
import { roleSkills } from "../skills/data/roleSkills";

interface MissingSkillsProps {
  roleId: string;
  employeeId: string;
  selectedLevel: string;
}

export const MissingSkills = ({ roleId, employeeId, selectedLevel }: MissingSkillsProps) => {
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useCompetencyStore();
  const employeeSkills = getEmployeeSkills(employeeId);
  
  // Get current role skills
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.error('No role skills found for role:', roleId);
    return null;
  }

  // Get all role skills
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Create a set of employee skill titles for efficient lookup
  const employeeSkillTitles = new Set(employeeSkills.map(skill => skill.title));

  // Find missing skills (skills in role requirements but not in employee skills)
  const missingSkills = allRoleSkills.filter(skill => 
    !employeeSkillTitles.has(skill.title) && 
    toggledSkills.has(skill.title)
  );

  console.log('Missing skills analysis:', {
    roleId,
    employeeId,
    totalRoleSkills: allRoleSkills.length,
    missingSkillsCount: missingSkills.length,
    missingSkills: missingSkills.map(s => s.title)
  });

  const getLevelColor = (skillTitle: string) => {
    const skillState = currentStates[skillTitle];
    if (!skillState?.level) return "bg-gray-300";

    const level = String(skillState.level).toLowerCase();
    
    switch (level) {
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
            <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.title)}`} />
          </Badge>
        ))}
      </div>
    </Card>
  );
};