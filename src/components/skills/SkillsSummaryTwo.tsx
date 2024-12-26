import { Card } from "@/components/ui/card";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { SkillBadge } from "./SkillBadge";
import { useParams } from "react-router-dom";
import { filterSkillsByCategory } from "../benchmark/skills-matrix/skillCategories";
import { UnifiedSkill } from "./types/SkillTypes";
import { useEffect } from "react";

export const SkillsSummaryTwo = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmployeeSkills, initializeEmployeeSkills } = useEmployeeSkillsStore();

  // Initialize employee skills
  useEffect(() => {
    if (id) {
      console.log('SkillsSummaryTwo - Initializing skills for employee:', id);
      initializeEmployeeSkills(id);
    }
  }, [id, initializeEmployeeSkills]);

  const employeeSkills = id ? getEmployeeSkills(id) : [];

  console.log('SkillsSummaryTwo - Loading skills:', {
    employeeId: id,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => s.title)
  });

  const specializedSkills = filterSkillsByCategory(employeeSkills, "specialized") as UnifiedSkill[];
  const commonSkills = filterSkillsByCategory(employeeSkills, "common") as UnifiedSkill[];
  const certificationSkills = filterSkillsByCategory(employeeSkills, "certification") as UnifiedSkill[];

  console.log('SkillsSummaryTwo - Categorized skills:', {
    specialized: specializedSkills.length,
    common: commonSkills.length,
    certifications: certificationSkills.length
  });

  const SkillSection = ({ title, count, skills }: { title: string; count: number; skills: UnifiedSkill[] }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {count}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge
            key={skill.title}
            skill={{ name: skill.title }}
            showLevel={true}
            level={skill.level}
            employeeId={id || ''}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Card className="p-6 space-y-6 bg-white">
      <div className="space-y-6">
        <SkillSection 
          title="Specialized Skills" 
          count={specializedSkills.length} 
          skills={specializedSkills} 
        />
        
        <SkillSection 
          title="Common Skills" 
          count={commonSkills.length} 
          skills={commonSkills} 
        />
        
        <SkillSection 
          title="Certifications" 
          count={certificationSkills.length} 
          skills={certificationSkills} 
        />
      </div>
    </Card>
  );
};