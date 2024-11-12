import { SkillBadge } from "../skills/SkillBadge";
import { SkillSection } from "../skills/SkillSection";
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";
import { getSkillRequirements } from "../skills/data/skillsDatabase";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
  roleId: string;
  selectedLevel: string;
}

export const SkillsDisplay = ({ selectedRoleSkills, toggledSkills, roleId, selectedLevel }: SkillsDisplayProps) => {
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';

  const getSkillsForCategory = (category: string) => {
    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
    
    const allSkills = [
      ...(currentRoleSkills.specialized || []),
      ...(currentRoleSkills.common || []),
      ...(currentRoleSkills.certifications || [])
    ].map((skill: any) => {
      const requirements = getSkillRequirements(
        skill.title,
        currentTrack,
        selectedLevel.toUpperCase()
      );

      return {
        title: skill.title,
        level: requirements?.level || 'unspecified',
        requirement: requirements?.requirement || 'preferred'
      };
    }).filter((skill: any) => toggledSkills.has(skill.title));

    if (category === "Specialized Skills") {
      return allSkills.filter(skill => 
        currentRoleSkills.specialized.some((s: any) => s.title === skill.title)
      );
    }
    if (category === "Common Skills") {
      return allSkills.filter(skill => 
        currentRoleSkills.common.some((s: any) => s.title === skill.title)
      );
    }
    if (category === "Certification") {
      return allSkills.filter(skill => 
        currentRoleSkills.certifications.some((s: any) => s.title === skill.title)
      );
    }
    return allSkills;
  };

  const categorizeSkillsByRequirement = (skills: ReturnType<typeof getSkillsForCategory>) => {
    return skills.reduce((acc: { required: any[], preferred: any[] }, skill) => {
      if (skill.requirement === 'required') {
        acc.required.push(skill);
      } else {
        acc.preferred.push(skill);
      }
      return acc;
    }, { required: [], preferred: [] });
  };

  const skillsInCategory = getSkillsForCategory("Specialized Skills");
  const { required: requiredSkills, preferred: preferredSkills } = categorizeSkillsByRequirement(skillsInCategory);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <SkillSection title="Required Skills" count={requiredSkills.length}>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill) => (
              <SkillBadge 
                key={skill.title}
                skill={{ name: skill.title }}
                showLevel={true}
                level={skill.level}
                isSkillGoal={true}
              />
            ))}
          </div>
        </SkillSection>

        <SkillSection title="Preferred Skills" count={preferredSkills.length}>
          <div className="flex flex-wrap gap-2">
            {preferredSkills.map((skill) => (
              <SkillBadge 
                key={skill.title}
                skill={{ name: skill.title }}
                showLevel={true}
                level={skill.level}
              />
            ))}
          </div>
        </SkillSection>
      </div>
    </div>
  );
};