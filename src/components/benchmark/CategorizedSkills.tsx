import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { CategoryCards } from "./CategoryCards";
import { useState } from "react";
import { useRoleStore } from "./RoleBenchmark";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { EmployeeSkillState, mapEmployeeToRoleRequirement } from "@/types/skillTypes";

interface CategorizedSkillsProps {
  roleId: string;
  employeeId: string;
}

export const CategorizedSkills = ({ roleId, employeeId }: CategorizedSkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { currentStates } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(employeeId);
  const { selectedLevel } = useRoleStore();

  console.log('CategorizedSkills - Using selected level:', selectedLevel);

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

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  if (!currentRoleSkills) {
    console.error('No role skills found for role:', roleId);
    return null;
  }

  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));

  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), roleId);
    if (!roleSkillState) return false;

    const employeeState = currentStates[skill.title] as EmployeeSkillState;
    if (!employeeState) return false;

    const mappedEmployeeRequirement = mapEmployeeToRoleRequirement(employeeState.requirement);
    return roleSkillState.requirement === 'required' && mappedEmployeeRequirement === 'required';
  });

  const missingSkills = toggledRoleSkills.filter(skill => {
    const hasSkill = employeeSkills.some(empSkill => {
      const employeeState = currentStates[empSkill.title] as EmployeeSkillState;
      return empSkill.title === skill.title && 
             (!employeeState || employeeState.requirement === 'not_interested');
    });
    
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), roleId);
    return !hasSkill && 
           toggledSkills.has(skill.title) && 
           competencyState?.level !== 'unspecified';
  });

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
          const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), roleId);
          const employeeState = currentStates[skill.title] as EmployeeSkillState;
          const isSkillGoal = employeeState?.requirement === 'skill_goal';
          
          return (
            <Badge 
              key={skill.title}
              variant="outline" 
              className={`rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2 ${
                competencyState?.requirement === 'required' ? 'border-primary-accent' : ''
              } ${isSkillGoal ? 'border-primary-accent' : ''}`}
            >
              {skill.title}
              <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.title)}`} />
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
        selectedLevel={selectedLevel}
      />

      <SkillSection 
        title="Required Skills" 
        skills={competencyMatchingSkills} 
        count={competencyMatchingSkills.length} 
      />
      
      <SkillSection 
        title="Missing Skills" 
        skills={missingSkills} 
        count={missingSkills.length} 
      />
    </div>
  );
};