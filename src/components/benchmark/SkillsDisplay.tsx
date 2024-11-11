import { RequirementSection } from "./RequirementSection";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
}

export const SkillsDisplay = ({ selectedRoleSkills, toggledSkills }: SkillsDisplayProps) => {
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

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Required Skills ({requiredAll.length})</h3>
        <div className="grid grid-cols-4 gap-4">
          <RequirementSection 
            title="All Categories"
            count={requiredAll.length}
            skills={requiredAll}
          />
          <RequirementSection 
            title="Specialized Skills"
            count={requiredSpecialized.length}
            skills={requiredSpecialized}
          />
          <RequirementSection 
            title="Common Skills"
            count={requiredCommon.length}
            skills={requiredCommon}
          />
          <RequirementSection 
            title="Certification"
            count={requiredCertifications.length}
            skills={requiredCertifications}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preferred Skills ({preferredAll.length})</h3>
        <div className="grid grid-cols-4 gap-4">
          <RequirementSection 
            title="All Categories"
            count={preferredAll.length}
            skills={preferredAll}
          />
          <RequirementSection 
            title="Specialized Skills"
            count={preferredSpecialized.length}
            skills={preferredSpecialized}
          />
          <RequirementSection 
            title="Common Skills"
            count={preferredCommon.length}
            skills={preferredCommon}
          />
          <RequirementSection 
            title="Certification"
            count={preferredCertifications.length}
            skills={preferredCertifications}
          />
        </div>
      </div>
    </div>
  );
};