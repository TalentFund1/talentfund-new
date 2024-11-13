import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";

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
  const { currentStates } = useCompetencyStore();
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';
  
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ] as RoleSkill[];

  const missingSkills = allRoleSkills.filter(roleSkill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === roleSkill.title);
    return !hasSkill && toggledSkills.has(roleSkill.title);
  });

  const getDotColor = (skillTitle: string) => {
    // Get the current state for this skill at the selected level
    const skillState = currentStates[skillTitle]?.[selectedLevel.toUpperCase()];
    const requirements = getSkillRequirements(
      skillTitle,
      currentTrack,
      selectedLevel.toUpperCase()
    );
    
    // Use the state from the matrix if available, otherwise fall back to requirements
    const level = skillState?.level?.toLowerCase() || requirements?.level?.toLowerCase() || 'unspecified';
    
    if (level === 'advanced') {
      return "bg-primary-accent"; // Purple for advanced
    } else if (level === 'intermediate') {
      return "bg-primary-icon"; // Orange for intermediate
    }
    return "bg-gray-300"; // Grey for other levels
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