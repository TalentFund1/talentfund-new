import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { CategoryCards } from "./CategoryCards";
import { useState } from "react";
import { useRoleStore } from "./RoleBenchmark";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";

interface CategorizedSkillsProps {
  roleId: string;
  employeeId: string;
}

export const CategorizedSkills = ({ employeeId }: CategorizedSkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const employeeSkills = getEmployeeSkills(employeeId);

  console.log('CategorizedSkills - Loading employee skills:', {
    employeeId,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => s.title)
  });

  const filterSkillsByCategory = (skills: any[]) => {
    if (selectedCategory === "all") return skills;

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return skillData.category === selectedCategory;
    });
  };

  // Sort skills by level priority
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
      const levelDiff = getLevelPriority(a.level) - getLevelPriority(b.level);
      return levelDiff;
    });
  };

  // Filter and sort skills
  const filteredSkills = filterSkillsByCategory(employeeSkills);

  const requiredSkills = sortSkills(filteredSkills.filter(skill => 
    skill.goalStatus === 'required'
  ));

  const preferredSkills = sortSkills(filteredSkills.filter(skill => 
    skill.goalStatus === 'preferred'
  ));

  const otherSkills = sortSkills(filteredSkills.filter(skill => 
    skill.goalStatus !== 'required' && skill.goalStatus !== 'preferred'
  ));

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
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
    required: requiredSkills.length,
    preferred: preferredSkills.length,
    other: otherSkills.length,
    requiredSkills,
    preferredSkills,
    otherSkills
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
        employeeId={employeeId}
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
        title="Other Skills" 
        skills={otherSkills} 
        count={otherSkills.length} 
      />
    </div>
  );
};