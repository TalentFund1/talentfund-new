import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SearchFilter } from "@/components/market/SearchFilter";
import { useParams } from "react-router-dom";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { useState, useMemo } from "react";
import { SkillBadge } from "./SkillBadge";
import { EmployeeSkillData } from "../employee/types/employeeSkillTypes";
import { BaseSkill } from "./types";
import { getAllSkills } from './data/skills/allSkills';

export const SkillsSummary = () => {
  const { id: employeeId } = useParams();
  const { getEmployeeSkills } = useEmployeeSkillsStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Get all employee skills
  const employeeSkills = useMemo(() => {
    if (!employeeId) return [];
    return getEmployeeSkills(employeeId);
  }, [employeeId, getEmployeeSkills]);

  console.log('SkillsSummary - Employee Skills:', {
    employeeId,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => s.title)
  });

  // Get all available skills from universal database for search
  const allSkills = useMemo(() => {
    return getAllSkills().map(skill => skill.title);
  }, []);

  // Categorize skills
  const specializedSkills = employeeSkills.filter(skill => skill.category === 'specialized');
  const commonSkills = employeeSkills.filter(skill => skill.category === 'common');
  const certifications = employeeSkills.filter(skill => skill.category === 'certification');

  const SkillSection = ({ title, skills }: { title: string; skills: EmployeeSkillData[] }) => (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {skills.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const baseSkill: BaseSkill = {
            name: skill.title
          };
          return (
            <SkillBadge
              key={skill.title}
              skill={baseSkill}
              showLevel={true}
              level={skill.level}
              employeeId={employeeId || ''}
            />
          );
        })}
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">Skills Summary</h3>
      
      <div className="mb-4">
        <div className="space-y-2">
          <SearchFilter
            label=""
            placeholder="Search skills..."
            items={allSkills}
            selectedItems={[]}
            onItemsChange={() => {}}
            singleSelect={false}
          />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <SkillSection title="Specialized Skills" skills={specializedSkills} />
        <SkillSection title="Common Skills" skills={commonSkills} />
        <SkillSection title="Certifications" skills={certifications} />
      </div>
    </div>
  );
};