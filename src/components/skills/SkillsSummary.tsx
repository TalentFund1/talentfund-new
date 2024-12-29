import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SearchFilter } from "@/components/market/SearchFilter";
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { SkillBadge } from "./SkillBadge";
import { EmployeeSkillData } from "../employee/types/employeeSkillTypes";
import { BaseSkill } from "./types";
import { getAllSkills } from './data/skills/allSkills';
import { Button } from "@/components/ui/button";
import { getUnifiedSkillData } from './data/skillDatabaseService';

const getLevelPriority = (level: string): number => {
  switch (level?.toLowerCase()) {
    case 'advanced': return 4;
    case 'intermediate': return 3;
    case 'beginner': return 2;
    case 'unspecified': return 1;
    default: return 0;
  }
};

export const SkillsSummary = () => {
  const { id: employeeId } = useParams();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Get all available skills from universal database for search
  const allSkills = useMemo(() => {
    return getAllSkills().map(skill => skill.title);
  }, []);

  // Filter employee skills based on selected skills
  const filteredEmployeeSkills = useMemo(() => {
    if (selectedSkills.length === 0) return employeeSkills;
    return employeeSkills.filter(skill => 
      selectedSkills.includes(skill.title)
    );
  }, [employeeSkills, selectedSkills]);

  // Categorize and sort filtered skills using universal database metadata
  const categorizedSkills = useMemo(() => {
    const sorted = filteredEmployeeSkills.reduce((acc, skill) => {
      const unifiedData = getUnifiedSkillData(skill.title);
      const category = unifiedData.category || 'common';
      
      switch (category) {
        case 'specialized':
          acc.specialized.push(skill);
          break;
        case 'certification':
          acc.certifications.push(skill);
          break;
        default:
          acc.common.push(skill);
          break;
      }
      
      return acc;
    }, {
      specialized: [] as EmployeeSkillData[],
      common: [] as EmployeeSkillData[],
      certifications: [] as EmployeeSkillData[]
    });

    // Sort each category by level
    const sortByLevel = (skills: EmployeeSkillData[]) => {
      return skills.sort((a, b) => {
        const levelA = getLevelPriority(a.level);
        const levelB = getLevelPriority(b.level);
        return levelB - levelA;
      });
    };

    return {
      specialized: sortByLevel(sorted.specialized),
      common: sortByLevel(sorted.common),
      certifications: sortByLevel(sorted.certifications)
    };
  }, [filteredEmployeeSkills]);

  const handleClearAll = () => {
    setSelectedSkills([]);
  };

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
              isSkillGoal={skill.goalStatus === 'skill_goal' || skill.goalStatus === 'required'}
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
            selectedItems={selectedSkills}
            onItemsChange={setSelectedSkills}
            singleSelect={false}
          />
          {selectedSkills.length > 0 && (
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearAll}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <SkillSection title="Specialized Skills" skills={categorizedSkills.specialized} />
        <SkillSection title="Common Skills" skills={categorizedSkills.common} />
        <SkillSection title="Certifications" skills={categorizedSkills.certifications} />
      </div>
    </div>
  );
};