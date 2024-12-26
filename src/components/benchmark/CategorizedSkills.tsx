import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { CategoryCards } from "./CategoryCards";
import { useState } from "react";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { roleSkills } from '../skills/data/roleSkills';
import { useRoleStore } from "./RoleBenchmark";
import { useTrack } from "../skills/context/TrackContext";
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
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  
  // Get employee's actual skills
  const employeeSkills = getEmployeeSkills(employeeId);

  console.log('CategorizedSkills - Current state:', {
    roleId,
    employeeId,
    selectedLevel,
    track,
    skillCount: employeeSkills.length
  });

  // Get current role skills
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.error('Role skills not found:', roleId);
    return null;
  }

  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Filter skills by toggled state
  const filteredSkills = allRoleSkills
    .filter(skill => toggledSkills.has(skill.title))
    .map(skill => {
      const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), roleId);
      const employeeSkill = employeeSkills.find(es => es.title === skill.title);
      
      return {
        ...skill,
        employeeLevel: employeeSkill?.level || 'unspecified',
        roleLevel: competencyState.level,
        required: competencyState.required
      };
    });

  console.log('Filtered skills with competency states:', {
    roleId,
    level: selectedLevel,
    totalSkills: filteredSkills.length,
    skills: filteredSkills.map(s => ({
      title: s.title,
      employeeLevel: s.employeeLevel,
      roleLevel: s.roleLevel,
      required: s.required
    }))
  });

  // Categorize skills based on their competency requirements for current level
  const requiredSkills = filteredSkills.filter(skill => {
    const comparison = benchmarkingService.compareSkillLevels(
      { title: skill.title, level: skill.employeeLevel },
      { title: skill.title, minimumLevel: skill.roleLevel }
    );
    
    console.log('Checking required skill:', {
      skill: skill.title,
      employeeLevel: skill.employeeLevel,
      roleLevel: skill.roleLevel,
      required: skill.required,
      matchPercentage: comparison.matchPercentage
    });
    
    return skill.required === 'required' && comparison.matchPercentage >= 100;
  });

  const preferredSkills = filteredSkills.filter(skill => {
    const comparison = benchmarkingService.compareSkillLevels(
      { title: skill.title, level: skill.employeeLevel },
      { title: skill.title, minimumLevel: skill.roleLevel }
    );
    
    console.log('Checking preferred skill:', {
      skill: skill.title,
      employeeLevel: skill.employeeLevel,
      roleLevel: skill.roleLevel,
      required: skill.required,
      matchPercentage: comparison.matchPercentage
    });
    
    return skill.required === 'preferred' || 
           (skill.required === 'required' && comparison.matchPercentage < 100);
  });

  const missingSkills = filteredSkills.filter(skill => {
    const isUnspecified = skill.employeeLevel === 'unspecified' || !skill.employeeLevel;
    
    console.log('Checking missing skill:', {
      skill: skill.title,
      employeeLevel: skill.employeeLevel,
      roleLevel: skill.roleLevel,
      isUnspecified
    });
    
    return isUnspecified;
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

  console.log('Skills categorization:', {
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
        {skills.map((skill) => (
          <Badge 
            key={skill.title}
            variant="outline" 
            className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
          >
            {skill.title}
            <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.roleLevel)}`} />
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