import { RequirementSection } from "./RequirementSection";
import { categorizeSkill } from "./skills-matrix/skillCategories";

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
      <div className="grid grid-cols-4 gap-4 mb-8">
        <RequirementSection 
          title="All Categories"
          count={requiredAll.length + preferredAll.length}
          skills={[...requiredAll, ...preferredAll]}
        />
        <RequirementSection 
          title="Specialized Skills"
          count={requiredSpecialized.length + preferredSpecialized.length}
          skills={[...requiredSpecialized, ...preferredSpecialized]}
        />
        <RequirementSection 
          title="Common Skills"
          count={requiredCommon.length + preferredCommon.length}
          skills={[...requiredCommon, ...preferredCommon]}
        />
        <RequirementSection 
          title="Certification"
          count={requiredCertifications.length + preferredCertifications.length}
          skills={[...requiredCertifications, ...preferredCertifications]}
        />
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Required Skills</h3>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {requiredAll.length} skills
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {requiredAll.map((skill) => (
              <div key={skill.title} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-md">
                {skill.title}
                <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Preferred Skills</h3>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {preferredAll.length} skills
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferredAll.map((skill) => (
              <div key={skill.title} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-md">
                {skill.title}
                <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const getLevelDot = (level: string) => {
  switch (level.toLowerCase()) {
    case "advanced":
      return "bg-primary-accent";
    case "intermediate":
      return "bg-primary-icon";
    case "beginner":
      return "bg-[#008000]";
    default:
      return "bg-gray-300";
  }
};