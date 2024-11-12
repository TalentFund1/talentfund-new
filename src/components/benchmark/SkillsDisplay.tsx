import { SkillBadge } from "../skills/SkillBadge";
import { SkillSection } from "../skills/SkillSection";
import { useState } from "react";
import { getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";
import { RequirementSection } from "./RequirementSection";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
  roleId: string;
  selectedLevel: string;
}

export const SkillsDisplay = ({ selectedRoleSkills, toggledSkills, roleId, selectedLevel }: SkillsDisplayProps) => {
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';
  const [selectedRequirement, setSelectedRequirement] = useState<string>("all");

  const getSkillsForCategory = () => {
    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
    
    const allSkills = [
      ...(currentRoleSkills.specialized || []),
      ...(currentRoleSkills.common || []),
      ...(currentRoleSkills.certifications || [])
    ].map((skill: any) => {
      const requirements = getSkillRequirements(
        skill.title,
        currentTrack,
        selectedLevel.toUpperCase()
      );

      return {
        title: skill.title,
        level: requirements?.level || 'unspecified',
        requirement: requirements?.requirement || 'preferred'
      };
    }).filter((skill: any) => toggledSkills.has(skill.title));

    return allSkills;
  };

  const categorizeSkillsByRequirement = (skills: ReturnType<typeof getSkillsForCategory>) => {
    return skills.reduce((acc: { required: any[], preferred: any[] }, skill) => {
      if (skill.requirement === 'required') {
        acc.required.push(skill);
      } else {
        acc.preferred.push(skill);
      }
      return acc;
    }, { required: [], preferred: [] });
  };

  const skills = getSkillsForCategory();
  const { required: requiredSkills, preferred: preferredSkills } = categorizeSkillsByRequirement(skills);

  const filteredSkills = selectedRequirement === "all" 
    ? [...requiredSkills, ...preferredSkills]
    : selectedRequirement === "required" 
      ? requiredSkills 
      : preferredSkills;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <RequirementSection
          title="All Categories"
          count={skills.length}
          skills={skills}
          isSelected={selectedRequirement === "all"}
          onClick={() => setSelectedRequirement("all")}
        />
        <RequirementSection
          title="Required Skills"
          count={requiredSkills.length}
          skills={requiredSkills}
          isSelected={selectedRequirement === "required"}
          onClick={() => setSelectedRequirement("required")}
        />
        <RequirementSection
          title="Preferred Skills"
          count={preferredSkills.length}
          skills={preferredSkills}
          isSelected={selectedRequirement === "preferred"}
          onClick={() => setSelectedRequirement("preferred")}
        />
      </div>

      <div className="space-y-6">
        <SkillSection title={`${selectedRequirement === "all" ? "All" : selectedRequirement === "required" ? "Required" : "Preferred"} Skills`} count={filteredSkills.length}>
          <div className="flex flex-wrap gap-2">
            {filteredSkills.map((skill) => (
              <SkillBadge 
                key={skill.title}
                skill={{ name: skill.title }}
                showLevel={true}
                level={skill.level}
                isSkillGoal={skill.requirement === "required"}
              />
            ))}
          </div>
        </SkillSection>
      </div>
    </div>
  );
};