import { SkillSection } from "../SkillSection";
import { SkillBadge } from "../SkillBadge";
import { Button } from "@/components/ui/button";
import { DetailedSkill, Certification } from "../types";
import { useParams } from "react-router-dom";

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
  const { id: employeeId } = useParams<{ id: string }>();
  const INITIAL_VISIBLE_COUNT = 12;

  const getSkillsToDisplay = (skills: DetailedSkill[] | Certification[], isExpanded: boolean) => {
    return isExpanded ? skills : skills.slice(0, INITIAL_VISIBLE_COUNT);
  };

  const mapToEmployeeSkillData = (skills: (DetailedSkill | Certification)[]) => {
    return skills.map(skill => ({
      id: `${employeeId}-${skill.name}`,
      employeeId: employeeId || '',
      skillId: `${employeeId}-${skill.name}`,
      title: skill.name,
      level: skill.level,
      goalStatus: skill.isSkillGoal ? 'skill_goal' : 'unknown',
      lastUpdated: new Date().toISOString(),
      confidence: 'medium',
      subcategory: 'General',
      category: 'specialized',
      businessCategory: 'Technical Skills',
      weight: 'technical',
      growth: '0%',
      salary: 'market',
      benchmarks: {
        B: false,
        R: false,
        M: false,
        O: false
      }
    }));
  };

  return (
    <div className="space-y-6">
      <SkillSection 
        title="Specialized Skills" 
        count={specializedSkills.length}
        skills={mapToEmployeeSkillData(getSkillsToDisplay(specializedSkills, expandedSections.specialized))}
      />
      {specializedSkills.length > INITIAL_VISIBLE_COUNT && (
        <div className="flex justify-start mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
            onClick={() => onToggleSection('specialized')}
          >
            {expandedSections.specialized ? 'Show Less' : 'See More'} 
            <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
              {specializedSkills.length - INITIAL_VISIBLE_COUNT}
            </span>
          </Button>
        </div>
      )}

      <SkillSection 
        title="Common Skills" 
        count={commonSkills.length}
        skills={mapToEmployeeSkillData(getSkillsToDisplay(commonSkills, expandedSections.common))}
      />
      {commonSkills.length > INITIAL_VISIBLE_COUNT && (
        <div className="flex justify-start mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
            onClick={() => onToggleSection('common')}
          >
            {expandedSections.common ? 'Show Less' : 'See More'} 
            <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
              {commonSkills.length - INITIAL_VISIBLE_COUNT}
            </span>
          </Button>
        </div>
      )}

      <SkillSection 
        title="Certifications" 
        count={certifications.length}
        skills={mapToEmployeeSkillData(getSkillsToDisplay(certifications, expandedSections.certifications))}
      />
      {certifications.length > INITIAL_VISIBLE_COUNT && (
        <div className="flex justify-start mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
            onClick={() => onToggleSection('certifications')}
          >
            {expandedSections.certifications ? 'Show Less' : 'See More'} 
            <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
              {certifications.length - INITIAL_VISIBLE_COUNT}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};