import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roleSkills } from "../skills/data/roleSkills";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { CategoryCards } from "./CategoryCards";
import { useState } from "react";
import { useRoleStore } from "./RoleBenchmark";

interface CategorizedSkillsProps {
  roleId: string;
  employeeId: string;
}

export const CategorizedSkills = ({ roleId, employeeId }: CategorizedSkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  const { selectedLevel } = useRoleStore();

  console.log('CategorizedSkills - Using selected level:', selectedLevel);
  console.log('CategorizedSkills - Total employee skills:', employeeSkills.length);

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

  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const getLevelPriority = (level: string = 'unspecified') => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
  };

  // Combined sorting function for all skill types
  const sortSkills = (skills: any[]) => {
    return skills.sort((a, b) => {
      const aState = getSkillCompetencyState(a.title, selectedLevel.toLowerCase(), roleId);
      const bState = getSkillCompetencyState(b.title, selectedLevel.toLowerCase(), roleId);
      
      // First sort by level (advanced to unspecified)
      const levelDiff = getLevelPriority(aState?.level) - getLevelPriority(bState?.level);
      if (levelDiff !== 0) return levelDiff;
      
      // Then sort by requirement (required before preferred)
      const aRequired = aState?.required === 'required' ? 0 : 1;
      const bRequired = bState?.required === 'required' ? 0 : 1;
      return aRequired - bRequired;
    });
  };

  // Filter and sort skills based on competency state for the selected level
  const filteredSkills = filterSkillsByCategory(allRoleSkills);

  const requiredSkills = sortSkills(filteredSkills.filter(skill => {
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), roleId);
    return competencyState?.required === 'required';
  }));

  const preferredSkills = sortSkills(filteredSkills.filter(skill => {
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), roleId);
    return competencyState?.required === 'preferred';
  }));

  const missingSkills = sortSkills(filteredSkills.filter(skill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), roleId);
    return !hasSkill && 
           (competencyState?.required === 'required' || competencyState?.required === 'preferred');
  }));

  const getLevelColor = (skillTitle: string) => {
    const competencyState = getSkillCompetencyState(skillTitle, selectedLevel.toLowerCase(), roleId);
    if (!competencyState?.level) return "bg-gray-300";

    const level = String(competencyState.level).toLowerCase();
    
    switch (level) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  console.log('Skills Summary:', {
    level: selectedLevel,
    required: requiredSkills.length,
    preferred: preferredSkills.length,
    missing: missingSkills.length,
    requiredSkills,
    preferredSkills,
    missingSkills
  });

  const SkillSection = ({ title, skills, count }: { title: string, skills: any[], count: number }) => (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {count}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge 
            key={skill.title}
            variant="outline" 
            className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
          >
            {skill.title}
            <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.title)}`} />
          </Badge>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      <CategoryCards
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        roleId={roleId}
        selectedLevel={selectedLevel}
      />

      <SkillSection 
        title="Required Skills" 
        skills={requiredSkills} 
        count={requiredSkills.length} 
      />
      
      <SkillSection 
        title="Preferred Skills" 
        skills={preferredSkills} 
        count={preferredSkills.length} 
      />
      
      <SkillSection 
        title="Missing Skills" 
        skills={missingSkills} 
        count={missingSkills.length} 
      />
    </div>
  );
};