import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { CategoryCards } from "./CategoryCards";
import { useState, useEffect } from "react";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { roleSkills } from '../skills/data/roleSkills';
import { useRoleStore } from "./RoleBenchmark";
import { benchmarkingService } from "../../services/benchmarking";

interface CategorizedSkillsProps {
  roleId: string;
  employeeId: string;
}

export const CategorizedSkills = ({ roleId, employeeId }: CategorizedSkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedLevel } = useRoleStore();
  
  // Get employee's actual skills
  const employeeSkills = getEmployeeSkills(employeeId);

  console.log('CategorizedSkills - Employee skills:', {
    employeeId,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => ({ title: s.title, level: s.level }))
  });

  // Get current role skills
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Create sets for efficient lookup
  const employeeSkillTitles = new Set(employeeSkills.map(skill => skill.title));
  const roleSkillTitles = new Set(allRoleSkills.map(skill => skill.title));

  // Filter skills that exist in both employee skills and toggled skills
  const matchingSkills = allRoleSkills.filter(skill => 
    employeeSkillTitles.has(skill.title) && 
    toggledSkills.has(skill.title)
  );

  console.log('Matching skills:', {
    roleId,
    employeeId,
    matchingCount: matchingSkills.length,
    skills: matchingSkills.map(s => s.title)
  });

  // Find missing skills (skills in role requirements but not in employee skills)
  const missingSkills = allRoleSkills.filter(skill => 
    !employeeSkillTitles.has(skill.title) && 
    toggledSkills.has(skill.title)
  );

  console.log('Missing skills:', {
    roleId,
    employeeId,
    missingCount: missingSkills.length,
    skills: missingSkills.map(s => s.title)
  });

  // Categorize matching skills based on their competency requirements
  const requiredSkills = matchingSkills.filter(skill => {
    const state = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), roleId);
    return state.required === 'required';
  });

  const preferredSkills = matchingSkills.filter(skill => {
    const state = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), roleId);
    return state.required === 'preferred';
  });

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

  console.log('Skills categorization for level:', {
    level: selectedLevel,
    required: requiredSkills.length,
    preferred: preferredSkills.length,
    missing: missingSkills.length,
    requiredSkills: requiredSkills.map(s => s.title),
    preferredSkills: preferredSkills.map(s => s.title),
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
        {skills.map((skill) => {
          const competencyState = getSkillCompetencyState(
            skill.title, 
            selectedLevel.toLowerCase(), 
            roleId
          );
          
          return (
            <Badge 
              key={skill.title}
              variant="outline" 
              className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
            >
              {skill.title}
              <div className={`h-2 w-2 rounded-full ${getLevelColor(competencyState.level)}`} />
            </Badge>
          );
        })}
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

      {requiredSkills.length > 0 && (
        <SkillSection 
          title="Required Skills" 
          skills={requiredSkills} 
          count={requiredSkills.length} 
        />
      )}
      
      {preferredSkills.length > 0 && (
        <SkillSection 
          title="Preferred Skills" 
          skills={preferredSkills} 
          count={preferredSkills.length} 
        />
      )}
      
      {missingSkills.length > 0 && (
        <SkillSection 
          title="Missing Skills" 
          skills={missingSkills} 
          count={missingSkills.length} 
        />
      )}
    </div>
  );
};