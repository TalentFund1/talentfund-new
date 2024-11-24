import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { CategoryCards } from "./CategoryCards";
import { useState } from "react";
import { SkillGoalSection } from "./SkillGoalSection";

interface CategorizedSkillsProps {
  roleId: string;
  employeeId: string;
  selectedLevel: string;
}

export const CategorizedSkills = ({ roleId, employeeId, selectedLevel }: CategorizedSkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  const filterSkillsByCategory = (skills: any[]) => {
    if (selectedCategory === "all") return skills;

    const categoryMap: { [key: string]: any[] } = {
      specialized: currentRoleSkills.specialized || [],
      common: currentRoleSkills.common || [],
      certification: currentRoleSkills.certifications || []
    };

    return skills.filter(skill => 
      categoryMap[selectedCategory]?.some(catSkill => catSkill.title === skill.title)
    );
  };

  // Get all skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  console.log('Processing role skills:', { 
    roleId, 
    selectedLevel,
    allRoleSkills: allRoleSkills.map(s => ({
      title: s.title,
      requirement: s.requirement
    }))
  });

  const getLevelPriority = (level: string = 'unspecified') => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
  };

  // Filter and sort skills based on requirement and employee possession
  const requiredSkills = filterSkillsByCategory(allRoleSkills
    .filter(skill => {
      const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
      const isRequired = skill.requirement === 'required' || competencyState?.required === 'required';
      const isToggled = toggledSkills.has(skill.title);
      
      console.log('Checking required skill:', {
        skill: skill.title,
        requirement: skill.requirement,
        competencyState,
        isToggled,
        isRequired
      });
      
      return isRequired && isToggled;
    })
    .sort((a, b) => {
      const aState = getSkillCompetencyState(a.title, selectedLevel.toLowerCase());
      const bState = getSkillCompetencyState(b.title, selectedLevel.toLowerCase());
      return getLevelPriority(aState?.level) - getLevelPriority(bState?.level);
    }));

  const preferredSkills = filterSkillsByCategory(allRoleSkills
    .filter(skill => {
      const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
      const isPreferred = skill.requirement === 'preferred' || competencyState?.required === 'preferred';
      const isToggled = toggledSkills.has(skill.title);
      const notRequired = !requiredSkills.some(req => req.title === skill.title);
      
      console.log('Checking preferred skill:', {
        skill: skill.title,
        requirement: skill.requirement,
        competencyState,
        isToggled,
        isPreferred,
        notRequired
      });
      
      return isPreferred && isToggled && notRequired;
    })
    .sort((a, b) => {
      const aState = getSkillCompetencyState(a.title, selectedLevel.toLowerCase());
      const bState = getSkillCompetencyState(b.title, selectedLevel.toLowerCase());
      return getLevelPriority(aState?.level) - getLevelPriority(bState?.level);
    }));

  const missingSkills = filterSkillsByCategory(allRoleSkills
    .filter(skill => {
      const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
      return !hasSkill && toggledSkills.has(skill.title);
    })
    .sort((a, b) => {
      const aState = getSkillCompetencyState(a.title, selectedLevel.toLowerCase());
      const bState = getSkillCompetencyState(b.title, selectedLevel.toLowerCase());
      return getLevelPriority(aState?.level) - getLevelPriority(bState?.level);
    }));

  console.log('Skills Summary:', {
    required: requiredSkills.length,
    preferred: preferredSkills.length,
    missing: missingSkills.length,
    requiredSkills,
    preferredSkills,
    missingSkills
  });

  return (
    <div className="space-y-4">
      <CategoryCards
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        roleId={roleId}
        selectedLevel={selectedLevel}
      />

      <SkillGoalSection 
        title="Required Skills" 
        skills={requiredSkills} 
        count={requiredSkills.length} 
      />
      
      <SkillGoalSection 
        title="Preferred Skills" 
        skills={preferredSkills} 
        count={preferredSkills.length} 
      />
      
      <SkillGoalSection 
        title="Missing Skills" 
        skills={missingSkills} 
        count={missingSkills.length} 
      />
    </div>
  );
};