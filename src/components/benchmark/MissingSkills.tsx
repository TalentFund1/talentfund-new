import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";

interface MissingSkillsProps {
  roleId: string;
  employeeId: string;
}

export const MissingSkills = ({ roleId, employeeId }: MissingSkillsProps) => {
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';
  
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  // Get all required and preferred skills for the role
  const allRoleSkills = [
    ...(currentRoleSkills.specialized || []),
    ...(currentRoleSkills.common || []),
    ...(currentRoleSkills.certifications || [])
  ];

  // Find missing skills by comparing with employee skills, but only for toggled skills
  const missingSkills = allRoleSkills.filter(roleSkill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === roleSkill.title);
    return !hasSkill && toggledSkills.has(roleSkill.title);
  }).map(skill => {
    const requirements = getSkillRequirements(
      skill.title,
      currentTrack,
      'P4'
    );
    return {
      ...skill,
      level: requirements?.level || 'unspecified',
      requirement: requirements?.requirement || 'preferred'
    };
  });

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "advanced":
        return "bg-primary-accent/10 text-primary-accent border-primary-accent";
      case "intermediate":
        return "bg-primary-icon/10 text-primary-icon border-primary-icon";
      case "beginner":
        return "bg-[#008000]/10 text-[#008000] border-[#008000]";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
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
            className={`rounded-md px-4 py-2 border ${getLevelColor(skill.level)} transition-colors flex items-center gap-2`}
          >
            {skill.title}
            <span className="text-xs font-normal opacity-90">
              ({skill.level})
            </span>
          </Badge>
        ))}
      </div>
    </Card>
  );
};