import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";

interface MissingSkills2Props {
  roleId: string;
  employeeId: string;
  selectedLevel: string;
}

export const MissingSkills2 = ({ roleId, employeeId, selectedLevel }: MissingSkills2Props) => {
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useCompetencyStore();
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';
  
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
    const requirements = getSkillRequirements(roleSkill.title, currentTrack, selectedLevel.toUpperCase());
    return !hasSkill && toggledSkills.has(roleSkill.title) && requirements?.requirement === 'required';
  });

  const missingPreferredSkills = allRoleSkills.filter(roleSkill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === roleSkill.title);
    const requirements = getSkillRequirements(roleSkill.title, currentTrack, selectedLevel.toUpperCase());
    return !hasSkill && toggledSkills.has(roleSkill.title) && requirements?.requirement === 'preferred';
  });

  const getLevelColor = (skillTitle: string) => {
    const requirements = getSkillRequirements(skillTitle, currentTrack, selectedLevel.toUpperCase());
    const level = requirements?.level || 'unspecified';

    switch (level.toLowerCase()) {
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

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Missing Skills Required</span>
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

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Missing Skills Preferred</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {missingPreferredSkills.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {missingPreferredSkills.map((skill) => (
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
    </div>
  );
};