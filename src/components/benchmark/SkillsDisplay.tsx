import { SkillBadge } from "../skills/SkillBadge";
import { roleSkills } from "../skills/data/roleSkills";
import { useTrack } from "../skills/context/TrackContext";
import { useParams } from "react-router-dom";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
  roleId: string;
  selectedLevel: string;
}

export const SkillsDisplay = ({ 
  selectedRoleSkills, 
  toggledSkills, 
  roleId, 
  selectedLevel 
}: SkillsDisplayProps) => {
  const { id: employeeId } = useParams();
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';

  const getSkillsForCategory = () => {
    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
    
    const filteredSkills = [
      ...(currentRoleSkills.specialized || []),
      ...(currentRoleSkills.common || []),
      ...(currentRoleSkills.certifications || [])
    ];

    return filteredSkills
      .filter(skill => toggledSkills.has(skill.title))
      .map((skill: any) => ({
        title: skill.title,
        level: skill.level || 'unspecified',
        requirement: skill.requirement || 'preferred'
      }));
  };

  const skills = getSkillsForCategory();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge 
            key={skill.title}
            skill={{ name: skill.title }}
            showLevel={true}
            level={skill.level}
            isRoleBenchmark={true}
            employeeId={employeeId || ''}
          />
        ))}
      </div>
    </div>
  );
};
