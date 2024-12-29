import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SearchFilter } from "@/components/market/SearchFilter";
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { SkillBadge } from "./SkillBadge";
import { BaseSkill } from "./types";
import { getAllSkills } from './data/skills/allSkills';
import { Button } from "@/components/ui/button";
import { getUnifiedSkillData } from './data/skillDatabaseService';
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { EmployeeSkillData } from "../employee/types/employeeSkillTypes";

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
  const { getEmployeeSkills } = useEmployeeSkillsStore();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get all employee skills
  const employeeSkills = useMemo(() => {
    if (!employeeId) return [];
    return getEmployeeSkills(employeeId);
  }, [employeeId, getEmployeeSkills]);

  console.log('Employee skills loaded:', {
    employeeId,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => ({ title: s.title, level: s.level }))
  });

  // Get all available skills from universal database for search
  const allSkills = useMemo(() => {
    return getAllSkills().map(skill => skill.title);
  }, []);

  // Filter employee skills based on selected skills and category
  const filteredEmployeeSkills = useMemo(() => {
    let skills = employeeSkills;
    
    if (selectedSkills.length > 0) {
      skills = skills.filter(skill => selectedSkills.includes(skill.title));
    }

    if (selectedCategory !== "all") {
      skills = skills.filter(skill => {
        const unifiedData = getUnifiedSkillData(skill.title);
        return unifiedData.category === selectedCategory;
      });
    }

    return skills;
  }, [employeeSkills, selectedSkills, selectedCategory]);

  // Categorize skills by level and status
  const categorizedSkills = useMemo(() => {
    return {
      current: filteredEmployeeSkills.filter(skill => 
        getLevelPriority(skill.level) >= getLevelPriority('intermediate')
      ),
      developing: filteredEmployeeSkills.filter(skill => 
        skill.level === 'beginner' || skill.goalStatus === 'skill_goal'
      ),
      adjacent: filteredEmployeeSkills.filter(skill => 
        skill.level === 'unspecified' && skill.goalStatus !== 'skill_goal'
      )
    };
  }, [filteredEmployeeSkills]);

  const handleClearAll = () => {
    setSelectedSkills([]);
    setSelectedCategory("all");
  };

  const CategoryCard = ({ id, name, count, selected }: { id: string; name: string; count: number; selected: boolean }) => (
    <button
      onClick={() => setSelectedCategory(id)}
      className={`rounded-lg p-4 transition-colors ${
        selected
          ? 'bg-primary-accent/5 border border-primary-accent'
          : 'bg-background border border-border hover:border-primary-accent/50'
      }`}
    >
      <div className="flex flex-col items-start">
        <span className={`text-sm font-semibold mb-1 ${
          selected ? 'text-primary-accent' : 'text-foreground'
        }`}>
          {name}
        </span>
        <span className="text-xs text-muted-foreground">
          {count} skills
        </span>
      </div>
    </button>
  );

  const SkillSection = ({ title, count, skills }: { title: string; count: number; skills: EmployeeSkillData[] }) => (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {count}
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

  const categories = [
    { id: "all", name: "All Categories", count: filteredEmployeeSkills.length },
    { id: "specialized", name: "Specialized Skills", count: employeeSkills.filter(s => getUnifiedSkillData(s.title).category === 'specialized').length },
    { id: "common", name: "Common Skills", count: employeeSkills.filter(s => getUnifiedSkillData(s.title).category === 'common').length },
    { id: "certification", name: "Certification", count: employeeSkills.filter(s => getUnifiedSkillData(s.title).category === 'certification').length }
  ];

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
          {(selectedSkills.length > 0 || selectedCategory !== "all") && (
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

      <div className="grid grid-cols-4 gap-4 mb-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            count={category.count}
            selected={selectedCategory === category.id}
          />
        ))}
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <SkillSection 
          title="Current" 
          count={categorizedSkills.current.length} 
          skills={categorizedSkills.current} 
        />
        <SkillSection 
          title="Developing" 
          count={categorizedSkills.developing.length} 
          skills={categorizedSkills.developing} 
        />
        <SkillSection 
          title="Adjacent" 
          count={categorizedSkills.adjacent.length} 
          skills={categorizedSkills.adjacent} 
        />
      </div>
    </div>
  );
};