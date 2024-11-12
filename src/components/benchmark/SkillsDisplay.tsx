import { SkillBadge } from "../skills/SkillBadge";
import { SkillSection } from "../skills/SkillSection";
import { useState } from "react";
import { getSkillsByTrackAndLevel, getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";
import { RequirementSection } from "./RequirementSection";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
  roleId: string;
  selectedLevel: string;
}

export const SkillsDisplay = ({ selectedRoleSkills, toggledSkills, roleId, selectedLevel }: SkillsDisplayProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';

  // Get current role's skills
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  // Create sets of valid skills for this role
  const validSpecializedSkills = new Set(currentRoleSkills.specialized.map(s => s.title));
  const validCommonSkills = new Set(currentRoleSkills.common.map(s => s.title));
  const validCertificationSkills = new Set(currentRoleSkills.certifications.map(s => s.title));
  
  // Filter toggled skills to only include those that belong to this role
  const specializedSkills = Array.from(toggledSkills)
    .filter(title => validSpecializedSkills.has(title));
    
  const commonSkills = Array.from(toggledSkills)
    .filter(title => validCommonSkills.has(title));
    
  const certificationSkills = Array.from(toggledSkills)
    .filter(title => validCertificationSkills.has(title));

  const getSkillsForCategory = (category: string) => {
    // Get skills based on category
    let categorySkills: string[] = [];
    if (category === "All Categories" || category === "Specialized Skills") {
      categorySkills.push(...specializedSkills);
    }
    if (category === "All Categories" || category === "Common Skills") {
      categorySkills.push(...commonSkills);
    }
    if (category === "All Categories" || category === "Certification") {
      categorySkills.push(...certificationSkills);
    }

    // Convert to array and add requirements
    return categorySkills.map(skillTitle => {
      const requirements = getSkillRequirements(
        skillTitle,
        currentTrack,
        selectedLevel
      );

      return {
        title: skillTitle,
        level: requirements?.level || 'unspecified',
        requirement: requirements?.requirement || 'preferred'
      };
    });
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

  const skillsInCategory = getSkillsForCategory(selectedCategory);
  const { required: requiredSkills, preferred: preferredSkills } = categorizeSkillsByRequirement(skillsInCategory);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: "All Categories", count: specializedSkills.length + commonSkills.length + certificationSkills.length },
          { title: "Specialized Skills", count: specializedSkills.length },
          { title: "Common Skills", count: commonSkills.length },
          { title: "Certification", count: certificationSkills.length }
        ].map((category) => (
          <RequirementSection
            key={category.title}
            title={category.title}
            count={category.count}
            skills={skillsInCategory}
            isSelected={selectedCategory === category.title}
            onClick={() => setSelectedCategory(category.title)}
          />
        ))}
      </div>

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