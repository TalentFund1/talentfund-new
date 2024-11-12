import { RequirementSection } from "./RequirementSection";
import { SkillBadge } from "../skills/SkillBadge";
import { SkillSection } from "../skills/SkillSection";
import { useState } from "react";
import { getSkillsByTrackAndLevel, getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
  roleId: string;
  selectedLevel: string;
}

export const SkillsDisplay = ({ selectedRoleSkills, toggledSkills, roleId, selectedLevel }: SkillsDisplayProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const { getTrackForRole } = useTrack();
  const currentTrack = getTrackForRole(roleId);

  const getSkillsForCategory = (category: string) => {
    // Combine all skills from different sections
    const allSkills = [
      ...(selectedRoleSkills.specialized || []),
      ...(selectedRoleSkills.common || []),
      ...(selectedRoleSkills.certifications || [])
    ].map((skill: any) => ({
      title: skill.title,
      level: skill.level || 'unspecified',
      requirement: skill.requirement || 'preferred'
    })).filter((skill: any) => toggledSkills.has(skill.title));

    return allSkills.filter((skill: any) => {
      if (category === "All Categories") return true;
      if (category === "Specialized Skills") return skill.title.toLowerCase().includes('machine learning') || 
        skill.title.toLowerCase().includes('deep learning') || 
        skill.title.toLowerCase().includes('natural language') ||
        skill.title.toLowerCase().includes('computer vision') ||
        skill.title.toLowerCase().includes('pytorch') ||
        skill.title.toLowerCase().includes('tensorflow');
      if (category === "Common Skills") return skill.title === "Python" || 
        skill.title === "Problem Solving" ||
        skill.title === "Technical Writing";
      if (category === "Certification") return skill.title.toLowerCase().includes('certified') ||
        skill.title.toLowerCase().includes('certificate');
      return false;
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

  const categories = [
    {
      title: "All Categories",
      count: skillsInCategory.length,
      skills: skillsInCategory
    },
    {
      title: "Specialized Skills",
      count: getSkillsForCategory("Specialized Skills").length,
      skills: getSkillsForCategory("Specialized Skills")
    },
    {
      title: "Common Skills",
      count: getSkillsForCategory("Common Skills").length,
      skills: getSkillsForCategory("Common Skills")
    },
    {
      title: "Certification",
      count: getSkillsForCategory("Certification").length,
      skills: getSkillsForCategory("Certification")
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <RequirementSection 
            key={category.title}
            title={category.title}
            count={category.count}
            skills={category.skills}
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