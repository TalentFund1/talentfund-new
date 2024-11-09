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
  visibleSpecializedCount: number;
  onToggleSection: (section: string) => void;
}

export const SkillsContainer = ({
  specializedSkills,
  commonSkills,
  certifications,
  expandedSections,
  visibleSpecializedCount,
  onToggleSection
}: SkillsContainerProps) => {
  const renderDetailedSkills = (skills: DetailedSkill[], isExpanded: boolean, isSpecialized: boolean = false) => {
    const displaySkills = isSpecialized 
      ? (isExpanded ? skills : skills.slice(0, visibleSpecializedCount))
      : (isExpanded ? skills : skills.slice(0, 7));

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
        <div className="flex flex-wrap gap-2 mb-4">
          {renderDetailedSkills(specializedSkills, expandedSections.specialized, true)}
        </div>
        {specializedSkills.length > visibleSpecializedCount && (
          <div className="flex justify-start">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
              onClick={() => onToggleSection('specialized')}
            >
              {expandedSections.specialized ? 'Show Less' : 'See More'} 
              <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
                {specializedSkills.length - visibleSpecializedCount}
              </span>
            </Button>
          </div>
        )}
      </SkillSection>

      <SkillSection title="Common Skills" count={commonSkills.length}>
        <div className="flex flex-wrap gap-2">
          {renderDetailedSkills(commonSkills, expandedSections.common)}
        </div>
        {commonSkills.length > 7 && (
          <div className="flex justify-start mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
              onClick={() => onToggleSection('common')}
            >
              {expandedSections.common ? 'Show Less' : 'See More'} 
              <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
                {commonSkills.length - 7}
              </span>
            </Button>
          </div>
        )}
      </SkillSection>

      <SkillSection title="Certifications" count={certifications.length}>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <SkillBadge key={cert.name} skill={cert} />
          ))}
        </div>
      </SkillSection>
    </div>
  );
};