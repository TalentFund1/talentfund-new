import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { CategoryCards } from "./CategoryCards";
import { useState, useEffect } from "react";
import { useRoleStore } from "./RoleBenchmark";

interface CategorizedSkillsProps {
  roleId: string;
  employeeId: string;
}

export const CategorizedSkills = ({ roleId, employeeId }: CategorizedSkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  const { selectedLevel } = useRoleStore();

  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Effect to sync missing skills with toggled state
  useEffect(() => {
    const missingSkills = allRoleSkills.filter(skill => {
      const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
      const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
      return !hasSkill && (competencyState?.required === 'required' || competencyState?.required === 'preferred');
    });

    // Ensure missing skills are toggled on
    const newToggledSkills = new Set(toggledSkills);
    let hasChanges = false;

    missingSkills.forEach(skill => {
      if (!newToggledSkills.has(skill.title)) {
        newToggledSkills.add(skill.title);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      console.log('Updating toggled skills to include missing skills:', {
        missing: missingSkills.map(s => s.title),
        total: newToggledSkills.size
      });
      setToggledSkills(newToggledSkills);
    }
  }, [employeeSkills, selectedLevel, allRoleSkills]);

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

  const getLevelColor = (skillTitle: string) => {
    const competencyState = getSkillCompetencyState(skillTitle, selectedLevel.toLowerCase());
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

  const requiredSkills = filterSkillsByCategory(allRoleSkills
    .filter(skill => {
      const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
      return competencyState?.required === 'required' && toggledSkills.has(skill.title);
    }));

  const preferredSkills = filterSkillsByCategory(allRoleSkills
    .filter(skill => {
      const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
      return competencyState?.required === 'preferred' && 
             toggledSkills.has(skill.title) && 
             !requiredSkills.some(req => req.title === skill.title);
    }));

  const missingSkills = filterSkillsByCategory(allRoleSkills
    .filter(skill => {
      const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
      const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
      return !hasSkill && 
             toggledSkills.has(skill.title) && 
             (competencyState?.required === 'required' || competencyState?.required === 'preferred');
    }));

  console.log('Skills Summary:', {
    level: selectedLevel,
    required: requiredSkills.length,
    preferred: preferredSkills.length,
    missing: missingSkills.length,
    toggledCount: toggledSkills.size,
    missingSkills: missingSkills.map(s => s.title)
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