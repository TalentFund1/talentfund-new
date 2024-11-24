import { SkillBadge } from "../skills/SkillBadge";
import { roleSkills } from "../skills/data/roleSkills";
import { useTrack } from "../skills/context/TrackContext";

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
  const { getTrackForRole } = useTrack();
  
  if (!roleId) {
    console.error('No role ID provided to SkillsDisplay');
    return null;
  }

  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';

  const getSkillsForCategory = () => {
    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
    if (!currentRoleSkills) {
      console.error('No skills found for role:', roleId);
      return [];
    }
    
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
          />
        ))}
      </div>
    </div>
  );
};