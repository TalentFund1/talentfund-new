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
  visibleSpecializedCount?: number;
  onToggleSection: (section: string) => void;
}

export const SkillsContainer = ({
  specializedSkills,
  commonSkills,
  certifications,
  expandedSections,
  onToggleSection
}: SkillsContainerProps) => {
  const INITIAL_VISIBLE_COUNT = 12;

  const renderDetailedSkills = (skills: DetailedSkill[], isExpanded: boolean) => {
    const displaySkills = isExpanded ? skills : skills.slice(0, INITIAL_VISIBLE_COUNT);

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

  const renderSeeMoreButton = (skillCount: number, sectionType: string, isExpanded: boolean) => {
    if (skillCount > INITIAL_VISIBLE_COUNT) {
      return (
        <div className="flex justify-start mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
            onClick={() => onToggleSection(sectionType)}
          >
            {isExpanded ? 'Show Less' : 'See More'} 
            <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
              {skillCount - INITIAL_VISIBLE_COUNT}
            </span>
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <SkillSection title="Specialized Skills" count={specializedSkills.length}>
        <div className="flex flex-wrap gap-2">
          {renderDetailedSkills(specializedSkills, expandedSections.specialized)}
        </div>
        {renderSeeMoreButton(specializedSkills.length, 'specialized', expandedSections.specialized)}
      </SkillSection>

      <SkillSection title="Common Skills" count={commonSkills.length}>
        <div className="flex flex-wrap gap-2">
          {renderDetailedSkills(commonSkills, expandedSections.common)}
        </div>
        {renderSeeMoreButton(commonSkills.length, 'common', expandedSections.common)}
      </SkillSection>

      <SkillSection title="Certifications" count={certifications.length}>
        <div className="flex flex-wrap gap-2">
          {(expandedSections.certifications ? certifications : certifications.slice(0, INITIAL_VISIBLE_COUNT))
            .map((cert) => (
              <SkillBadge 
                key={cert.name}
                skill={cert}
                showLevel={true}
                level={cert.level}
                isSkillGoal={cert.isSkillGoal}
              />
            ))}
        </div>
        {renderSeeMoreButton(certifications.length, 'certifications', expandedSections.certifications)}
      </SkillSection>
    </div>
  );
};