import { SkillBadge } from "../skills/SkillBadge";
import { SkillSection } from "../skills/SkillSection";
import { useState } from "react";
import { getSkillsByTrackAndLevel, getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";

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

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  // Get filtered skills for each category
  const specializedSkills = currentRoleSkills.specialized
    .map(s => s.title)
    .filter(title => toggledSkills.has(title));
    
  const commonSkills = currentRoleSkills.common
    .map(s => s.title)
    .filter(title => toggledSkills.has(title));
    
  const certificationSkills = currentRoleSkills.certifications
    .map(s => s.title)
    .filter(title => toggledSkills.has(title));

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

  // Calculate total skills for each category
  const totalSkills = {
    all: [...specializedSkills, ...commonSkills, ...certificationSkills].length,
    specialized: specializedSkills.length,
    common: commonSkills.length,
    certification: certificationSkills.length
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: "All Categories", count: totalSkills.all },
          { title: "Specialized Skills", count: totalSkills.specialized },
          { title: "Common Skills", count: totalSkills.common },
          { title: "Certification", count: totalSkills.certification }
        ].map((category) => (
          <button
            key={category.title}
            onClick={() => setSelectedCategory(category.title)}
            className={`rounded-lg p-4 transition-colors ${
              selectedCategory === category.title
                ? 'bg-primary-accent/5 border border-primary-accent'
                : 'bg-background border border-border hover:border-primary-accent/50'
            }`}
          >
            <div className="flex flex-col items-start">
              <span className={`text-sm font-semibold mb-1 ${
                selectedCategory === category.title
                  ? 'text-primary-accent'
                  : 'text-foreground group-hover:text-primary-accent'
              }`}>
                {category.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {category.count} {category.count === 1 ? 'skill' : 'skills'}
              </span>
            </div>
          </button>
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