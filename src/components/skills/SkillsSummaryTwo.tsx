import { Card } from "@/components/ui/card";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { SkillBadge } from "./SkillBadge";
import { useParams } from "react-router-dom";
import { UnifiedSkill } from "./types/SkillTypes";
import { useEffect } from "react";
import { getUnifiedSkillData } from "./data/skillDatabaseService";
import { SearchFilter } from "@/components/market/SearchFilter";
import { useState } from "react";

export const SkillsSummaryTwo = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmployeeSkills, initializeEmployeeSkills } = useEmployeeSkillsStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize employee skills
  useEffect(() => {
    if (id) {
      console.log('SkillsSummaryTwo - Initializing skills for employee:', id);
      initializeEmployeeSkills(id);
    }
  }, [id, initializeEmployeeSkills]);

  const employeeSkills = id ? getEmployeeSkills(id) : [];

  console.log('SkillsSummaryTwo - Loading employee skills:', {
    employeeId: id,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => s.title)
  });

  // Categorize employee skills using their actual categories from unified data
  const categorizedSkills = employeeSkills.reduce((acc, skill) => {
    const unifiedData = getUnifiedSkillData(skill.title);
    const category = unifiedData.category || 'common';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    acc[category].push({
      ...skill,
      category: unifiedData.category,
      subcategory: unifiedData.subcategory
    });
    
    return acc;
  }, {} as Record<string, UnifiedSkill[]>);

  const specializedSkills = categorizedSkills['specialized'] || [];
  const commonSkills = categorizedSkills['common'] || [];
  const certificationSkills = categorizedSkills['certification'] || [];

  console.log('SkillsSummaryTwo - Categorized employee skills:', {
    specialized: specializedSkills.length,
    common: commonSkills.length,
    certifications: certificationSkills.length
  });

  const SkillSection = ({ title, skills, count }: { title: string; skills: UnifiedSkill[]; count: number }) => (
    <div className="rounded-2xl border border-border bg-white p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {count}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills
          .filter(skill => 
            skill.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((skill) => (
            <SkillBadge
              key={skill.title}
              skill={{ name: skill.title }}
              showLevel={true}
              level={skill.level}
              isSkillGoal={skill.goalStatus === 'skill_goal' || skill.goalStatus === 'required'}
              employeeId={id || ''}
            />
          ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">Skills Summary</h3>
      
      <div className="mb-4">
        <SearchFilter
          label=""
          placeholder="Search skills..."
          items={[]}
          selectedItems={[]}
          onItemsChange={() => {}}
          singleSelect={false}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="space-y-6">
        <SkillSection 
          title="Specialized Skills" 
          skills={specializedSkills} 
          count={specializedSkills.length} 
        />
        
        <SkillSection 
          title="Common Skills" 
          skills={commonSkills} 
          count={commonSkills.length} 
        />
        
        <SkillSection 
          title="Certifications" 
          skills={certificationSkills} 
          count={certificationSkills.length} 
        />
      </div>
    </div>
  );
};