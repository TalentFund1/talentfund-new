import { SkillBadge } from "../skills/SkillBadge";
import { SkillSection } from "../skills/SkillSection";
import { useState } from "react";
import { getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";
import { CategorySection } from "./CategorySection";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
  roleId: string;
  selectedLevel: string;
  benchmarkSearchSkills: string[];
  setBenchmarkSearchSkills: (skills: string[]) => void;
}

export const SkillsDisplay = ({ 
  selectedRoleSkills, 
  toggledSkills, 
  roleId, 
  selectedLevel,
  benchmarkSearchSkills,
  setBenchmarkSearchSkills
}: SkillsDisplayProps) => {
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';
  const [selectedCategory, setSelectedCategory] = useState("all");

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
      .filter(skill => {
        if (benchmarkSearchSkills.length === 0) return true;
        return benchmarkSearchSkills.some(searchSkill => 
          skill.title.toLowerCase().includes(searchSkill.toLowerCase())
        );
      })
      .map((skill: any) => {
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