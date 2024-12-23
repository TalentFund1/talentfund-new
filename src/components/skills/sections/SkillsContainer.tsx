import { SkillSection } from "../SkillSection";
import { SkillBadge } from "../SkillBadge";
import { Button } from "@/components/ui/button";
import { DetailedSkill, Certification } from "../types";

interface SkillsContainerProps {
  specializedSkills: DetailedSkill[];
  commonSkills: DetailedSkill[];
  certifications: Certification[];
  expandedSections: {
    specialized: boolean;
    common: boolean;
    certifications: boolean;
  };
  onToggleSection: (section: string) => void;
}

export const SkillsContainer = ({
  specializedSkills,
  commonSkills,
  certifications,
  expandedSections,
  onToggleSection
}: SkillsContainerProps) => {

  const renderDetailedSkills = (skills: DetailedSkill[], isExpanded: boolean) => {
    // Show all skills instead of limiting to INITIAL_VISIBLE_COUNT
    const displaySkills = skills;

    return displaySkills.map((skill) => (
      <SkillBadge 
        key={skill.name}
        skill={skill}
        showLevel={true}
        level={skill.level}
        isSkillGoal={skill.isSkillGoal}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <SkillSection title="Specialized Skills" count={specializedSkills.length}>
        <div className="flex flex-wrap gap-2">
          {renderDetailedSkills(specializedSkills, expandedSections.specialized)}
        </div>
      </SkillSection>

      <SkillSection title="Common Skills" count={commonSkills.length}>
        <div className="flex flex-wrap gap-2">
          {renderDetailedSkills(commonSkills, expandedSections.common)}
        </div>
      </SkillSection>

      <SkillSection title="Certifications" count={certifications.length}>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <SkillBadge 
              key={cert.name}
              skill={cert}
              showLevel={true}
              level={cert.level}
              isSkillGoal={cert.isSkillGoal}
            />
          ))}
        </div>
      </SkillSection>
    </div>
  );
};