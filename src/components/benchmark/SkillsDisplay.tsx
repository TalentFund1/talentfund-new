import { RequirementSection } from "./RequirementSection";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
}

export const SkillsDisplay = ({ selectedRoleSkills, toggledSkills }: SkillsDisplayProps) => {
  const filterSkillsByRequirement = (skills: any[], requirement: string) => {
    return skills.filter(skill => 
      toggledSkills.has(skill.title) && 
      skill.requirement?.toLowerCase() === requirement.toLowerCase()
    );
  };

  const requiredSpecializedSkills = filterSkillsByRequirement(selectedRoleSkills.specialized, "required");
  const requiredCommonSkills = filterSkillsByRequirement(selectedRoleSkills.common, "required");
  const requiredCertifications = filterSkillsByRequirement(selectedRoleSkills.certifications, "required");

  const preferredSpecializedSkills = filterSkillsByRequirement(selectedRoleSkills.specialized, "preferred");
  const preferredCommonSkills = filterSkillsByRequirement(selectedRoleSkills.common, "preferred");
  const preferredCertifications = filterSkillsByRequirement(selectedRoleSkills.certifications, "preferred");

  const requiredSkills = [...requiredSpecializedSkills, ...requiredCommonSkills, ...requiredCertifications];
  const preferredSkills = [...preferredSpecializedSkills, ...preferredCommonSkills, ...preferredCertifications];

  return (
    <div className="space-y-6">
      <RequirementSection 
        title="Required Skills"
        count={requiredSkills.length}
        skills={requiredSkills}
      />

      <RequirementSection 
        title="Preferred Skills"
        count={preferredSkills.length}
        skills={preferredSkills}
      />
    </div>
  );
};