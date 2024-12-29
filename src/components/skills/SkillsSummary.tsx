import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SearchFilter } from "@/components/market/SearchFilter";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllSkills } from './data/skills/allSkills';
import { getUnifiedSkillData } from './data/skillDatabaseService';
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { SkillCategoryCards } from "./sections/SkillCategoryCards";
import { SkillSectionList } from "./sections/SkillSectionList";

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

  const employeeSkills = useMemo(() => {
    if (!employeeId) return [];
    return getEmployeeSkills(employeeId);
  }, [employeeId, getEmployeeSkills]);

  console.log('Employee skills loaded:', {
    employeeId,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => ({ title: s.title, level: s.level }))
  });

  const allSkills = useMemo(() => {
    return getAllSkills().map(skill => skill.title);
  }, []);

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

  const categorizedSkills = useMemo(() => {
    return {
      current: filteredEmployeeSkills,
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

      <SkillCategoryCards
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        employeeSkills={employeeSkills}
      />

      <Separator className="my-6" />

      <SkillSectionList categorizedSkills={categorizedSkills} />
    </div>
  );
};