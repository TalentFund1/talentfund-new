import { DetailedSkill } from "../types";
import { RequirementSection } from "@/components/benchmark/RequirementSection";

export interface SkillsContainerProps {
  specializedSkills: DetailedSkill[];
  commonSkills: DetailedSkill[];
  certifications: DetailedSkill[];
  expandedSections: {
    specialized: boolean;
    common: boolean;
    certifications: boolean;
  };
  onToggleSection: (section: "specialized" | "common" | "certifications") => void;
  visibleSpecializedCount?: number;
}

export const SkillsContainer = ({
  specializedSkills,
  commonSkills,
  certifications,
  expandedSections,
  onToggleSection,
  visibleSpecializedCount
}: SkillsContainerProps) => {
  return (
    <div className="space-y-4">
      <RequirementSection
        title="Specialized Skills"
        count={specializedSkills.length}
        skills={specializedSkills}
        isSelected={expandedSections.specialized}
        onClick={() => onToggleSection("specialized")}
      />
      <RequirementSection
        title="Common Skills"
        count={commonSkills.length}
        skills={commonSkills}
        isSelected={expandedSections.common}
        onClick={() => onToggleSection("common")}
      />
      <RequirementSection
        title="Certifications"
        count={certifications.length}
        skills={certifications}
        isSelected={expandedSections.certifications}
        onClick={() => onToggleSection("certifications")}
      />
    </div>
  );
};