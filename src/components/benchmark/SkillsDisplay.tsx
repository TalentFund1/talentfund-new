import { SkillBadge } from "../skills/SkillBadge";
import { SkillSection } from "../skills/SkillSection";
import { useState } from "react";
import { getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";
import { CategorySection } from "./CategorySection";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { aiSkills } from "../skills/data/skills/aiSkills";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
  roleId: string;
  selectedLevel: string;
}

export const SkillsDisplay = ({ 
  selectedRoleSkills, 
  toggledSkills, 
  roleId, 
  selectedLevel 
}: SkillsDisplayProps) => {
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { currentStates } = useCompetencyStore();

  const getSkillsForCategory = () => {
    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
    
    let filteredSkills = [];
    if (selectedCategory === "all") {
      filteredSkills = [
        ...(currentRoleSkills.specialized || []),
        ...(currentRoleSkills.common || []),
        ...(currentRoleSkills.certifications || [])
      ];
    } else if (selectedCategory === "specialized") {
      filteredSkills = currentRoleSkills.specialized || [];
    } else if (selectedCategory === "common") {
      filteredSkills = currentRoleSkills.common || [];
    } else if (selectedCategory === "certification") {
      filteredSkills = currentRoleSkills.certifications || [];
    }

    return filteredSkills
      .filter(skill => toggledSkills.has(skill.title))
      .map((skill: any) => {
        // Get skill requirements for the current level
        const skillData = aiSkills.find(s => s.title === skill.title);
        const levelRequirements = skillData?.professionalTrack?.[selectedLevel];

        return {
          title: skill.title,
          level: levelRequirements?.level || 'unspecified',
          requirement: levelRequirements?.requirement || 'preferred'
        };
      });
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

  return (
    <div className="space-y-8">
      <CategorySection
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        toggledSkills={toggledSkills}
      />

      <div className="space-y-6">
        <SkillSection title="Required Skills" count={requiredSkills.length}>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill) => (
              <SkillBadge 
                key={skill.title}
                skill={{ name: skill.title }}
                showLevel={true}
                level={skill.level}
                isSkillGoal={true}
                isRoleBenchmark={true}
              />
            ))}
          </div>
        </SkillSection>

        <SkillSection title="Preferred Skills" count={preferredSkills.length}>
          <div className="flex flex-wrap gap-2">
            {preferredSkills.map((skill) => (
              <SkillBadge 
                key={skill.title}
                skill={{ name: skill.title }}
                showLevel={true}
                level={skill.level}
                isRoleBenchmark={true}
              />
            ))}
          </div>
        </SkillSection>
      </div>
    </div>
  );
};