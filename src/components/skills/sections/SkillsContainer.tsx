import { SkillSection } from "../SkillSection";
import { SkillBadge } from "../SkillBadge";
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
  console.log('Rendering SkillsContainer with:', {
    specializedCount: specializedSkills.length,
    commonCount: commonSkills.length,
    certificationsCount: certifications.length
  });

  return (
    <div className="space-y-6">
      <SkillSection title="Specialized Skills" count={specializedSkills.length}>
        <div className="flex flex-wrap gap-2">
          {specializedSkills.map((skill) => (
            <SkillBadge 
              key={skill.name}
              skill={skill}
              showLevel={true}
              level={skill.level}
              isSkillGoal={skill.isSkillGoal}
            />
          ))}
        </div>
      </SkillSection>

      <SkillSection title="Common Skills" count={commonSkills.length}>
        <div className="flex flex-wrap gap-2">
          {commonSkills.map((skill) => (
            <SkillBadge 
              key={skill.name}
              skill={skill}
              showLevel={true}
              level={skill.level}
              isSkillGoal={skill.isSkillGoal}
            />
          ))}
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