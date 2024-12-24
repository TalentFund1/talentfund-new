import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { CategoryCards } from "./CategoryCards";
import { useState } from "react";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";

interface CategorizedSkillsProps {
  roleId: string;
  employeeId: string;
}

export const CategorizedSkills = ({ roleId, employeeId }: CategorizedSkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toggledSkills } = useToggledSkills();
  
  // Get employee's actual skills
  const employeeSkills = getEmployeeSkills(employeeId);

  console.log('CategorizedSkills - Employee skills:', {
    employeeId,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => ({ title: s.title, level: s.level }))
  });

  const filterSkillsByCategory = (skills: any[]) => {
    if (selectedCategory === "all") return skills;

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return skillData.category === selectedCategory;
    });
  };

  const getLevelPriority = (level: string = 'unspecified') => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
  };

  // Sort skills by level
  const sortSkills = (skills: any[]) => {
    return skills.sort((a, b) => {
      const aLevel = a.level || 'unspecified';
      const bLevel = b.level || 'unspecified';
      return getLevelPriority(aLevel) - getLevelPriority(bLevel);
    });
  };

  // Filter and sort employee skills
  const filteredSkills = filterSkillsByCategory(employeeSkills
    .filter(skill => toggledSkills.has(skill.title)));

  // Categorize skills based on their actual levels
  const advancedIntermediateSkills = sortSkills(filteredSkills.filter(skill => 
    skill.level === 'advanced' || skill.level === 'intermediate'
  ));

  const beginnerSkills = sortSkills(filteredSkills.filter(skill => 
    skill.level === 'beginner'
  ));

  const unspecifiedSkills = sortSkills(filteredSkills.filter(skill => 
    !skill.level || skill.level === 'unspecified'
  ));

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
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
    advanced: advancedIntermediateSkills.length,
    beginner: beginnerSkills.length,
    unspecified: unspecifiedSkills.length,
    advancedSkills: advancedIntermediateSkills,
    beginnerSkills,
    unspecifiedSkills
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
            <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
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
      />

      <SkillSection 
        title="Advanced & Intermediate Skills" 
        skills={advancedIntermediateSkills} 
        count={advancedIntermediateSkills.length} 
      />
      
      <SkillSection 
        title="Beginner Skills" 
        skills={beginnerSkills} 
        count={beginnerSkills.length} 
      />
      
      <SkillSection 
        title="Unspecified Skills" 
        skills={unspecifiedSkills} 
        count={unspecifiedSkills.length} 
      />
    </div>
  );
};