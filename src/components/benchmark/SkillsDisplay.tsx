import { RequirementSection } from "./RequirementSection";
import { categorizeSkill } from "./skills-matrix/skillCategories";
import { SkillBadge } from "../skills/SkillBadge";
import { SkillSection } from "../skills/SkillSection";
import { useState } from "react";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
}

export const SkillsDisplay = ({ selectedRoleSkills, toggledSkills }: SkillsDisplayProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  const filterSkillsByRequirement = (skills: any[], requirement: string, category?: string) => {
    return skills.filter(skill => 
      toggledSkills.has(skill.title) && 
      skill.requirement?.toLowerCase() === requirement.toLowerCase() &&
      (!category || categorizeSkill(skill.title) === category)
    );
  };

  // Required Skills
  const requiredSpecialized = filterSkillsByRequirement(selectedRoleSkills.specialized, "required", "specialized");
  const requiredCommon = filterSkillsByRequirement(selectedRoleSkills.common, "required", "common");
  const requiredCertifications = filterSkillsByRequirement(selectedRoleSkills.certifications, "required", "certification");
  const requiredAll = [...requiredSpecialized, ...requiredCommon, ...requiredCertifications];

  // Preferred Skills
  const preferredSpecialized = filterSkillsByRequirement(selectedRoleSkills.specialized, "preferred", "specialized");
  const preferredCommon = filterSkillsByRequirement(selectedRoleSkills.common, "preferred", "common");
  const preferredCertifications = filterSkillsByRequirement(selectedRoleSkills.certifications, "preferred", "certification");
  const preferredAll = [...preferredSpecialized, ...preferredCommon, ...preferredCertifications];

  const categories = [
    {
      title: "All Categories",
      count: requiredAll.length + preferredAll.length,
      skills: [...requiredAll, ...preferredAll]
    },
    {
      title: "Specialized Skills",
      count: requiredSpecialized.length + preferredSpecialized.length,
      skills: [...requiredSpecialized, ...preferredSpecialized]
    },
    {
      title: "Common Skills",
      count: requiredCommon.length + preferredCommon.length,
      skills: [...requiredCommon, ...preferredCommon]
    },
    {
      title: "Certification",
      count: requiredCertifications.length + preferredCertifications.length,
      skills: [...requiredCertifications, ...preferredCertifications]
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
        <SkillSection title="Required Skills" count={requiredAll.length}>
          <div className="flex flex-wrap gap-2">
            {requiredAll.map((skill) => (
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

        <SkillSection title="Preferred Skills" count={preferredAll.length}>
          <div className="flex flex-wrap gap-2">
            {preferredAll.map((skill) => (
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