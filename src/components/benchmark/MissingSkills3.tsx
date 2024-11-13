import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";

interface MissingSkills3Props {
  roleId: string;
  employeeId: string;
  selectedLevel: string;
}

export const MissingSkills3 = ({ roleId, employeeId, selectedLevel }: MissingSkills3Props) => {
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useCompetencyStore();
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId)?.toLowerCase() as 'professional' | 'managerial';
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

  const getLevelColor = (skillTitle: string) => {
    const requirements = getSkillRequirements(skillTitle, track, selectedLevel.toUpperCase());
    
    if (!requirements) return "bg-gray-300"; // Unspecified
    
    const level = requirements.level;
    const isRequired = requirements.requirement === 'required';
    
    // Return color based on level and requirement type
    switch (level) {
      case 'advanced':
        return isRequired ? "bg-primary-accent" : "bg-[#008000]";
      case 'intermediate':
        return isRequired ? "bg-primary-icon" : "bg-primary-accent";
      case 'beginner':
        return isRequired ? "bg-[#008000]" : "bg-primary-icon";
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
        <span className="text-sm font-medium">Missing Skills 3</span>
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