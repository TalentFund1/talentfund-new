import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SearchFilter } from "@/components/market/SearchFilter";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllSkills } from './data/skills/allSkills';
import { getUnifiedSkillData } from './data/skillDatabaseService';
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { SkillSectionList } from "./sections/SkillSectionList";

const sortSkillsByLevel = (skills: any[]) => {
  const levelOrder = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };

  return [...skills].sort((a, b) => {
    const levelA = a.level?.toLowerCase() || 'unspecified';
    const levelB = b.level?.toLowerCase() || 'unspecified';
    return levelOrder[levelA] - levelOrder[levelB];
  });
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

  const allSkills = useMemo(() => {
    return getAllSkills().map(skill => skill.title);
  }, []);

  const filteredEmployeeSkills = useMemo(() => {
    let skills = employeeSkills;
    
    // First apply search filter if any
    if (selectedSkills.length > 0) {
      skills = skills.filter(skill => selectedSkills.includes(skill.title));
    }

    // Then apply category filter
    if (selectedCategory !== "all") {
      skills = skills.filter(skill => {
        const unifiedData = getUnifiedSkillData(skill.title);
        return unifiedData.category === selectedCategory;
      });
    }

    console.log('Filtered skills:', {
      total: skills.length,
      searchTerms: selectedSkills,
      category: selectedCategory,
      skills: skills.map(s => s.title)
    });

    return sortSkillsByLevel(skills);
  }, [employeeSkills, selectedSkills, selectedCategory]);

  // Get adjacent skills only when filtering
  const adjacentSkills = useMemo(() => {
    if (selectedSkills.length === 0) return [];
    
    const skills = employeeSkills.filter(skill => {
      const isNotSelected = !selectedSkills.includes(skill.title);
      const skillData = getUnifiedSkillData(skill.title);
      const matchesCategory = selectedCategory === 'all' || skillData.category === selectedCategory;
      return isNotSelected && matchesCategory;
    });

    return sortSkillsByLevel(skills);
  }, [employeeSkills, selectedSkills, selectedCategory]);

  const categorizedSkills = useMemo(() => {
    const developing = filteredEmployeeSkills.filter(skill => 
      skill.level === 'beginner' || skill.goalStatus === 'skill_goal'
    );

    return {
      current: filteredEmployeeSkills,
      developing: sortSkillsByLevel(developing),
      adjacent: adjacentSkills
    };
  }, [filteredEmployeeSkills, adjacentSkills]);

  // Calculate category counts based on search filter
  const getCategoryCount = (category: string) => {
    if (!selectedSkills.length) {
      // If no search filter, return total count for each category
      return employeeSkills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        return category === 'all' || skillData.category === category;
      }).length;
    }

    // If search filter is active, count only filtered skills
    return employeeSkills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      const matchesSearch = selectedSkills.includes(skill.title);
      return matchesSearch && (category === 'all' || skillData.category === category);
    }).length;
  };

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
          {selectedSkills.length > 0 && selectedCategory === "all" && (
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
        {[
          { id: "all", name: "All Categories", count: getCategoryCount('all') },
          { id: "specialized", name: "Specialized Skills", count: getCategoryCount('specialized') },
          { id: "common", name: "Common Skills", count: getCategoryCount('common') },
          { id: "certification", name: "Certification", count: getCategoryCount('certification') }
        ].map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="w-full text-left"
          >
            <Card 
              className={`
                p-4 
                transition-colors 
                ${selectedCategory === category.id
                  ? 'bg-primary-accent/5 border border-primary-accent'
                  : 'bg-background border border-border hover:border-primary-accent/50'
                }
              `}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-sm font-semibold ${
                  selectedCategory === category.id ? 'text-primary-accent' : 'text-foreground'
                }`}>
                  {category.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {category.count} {category.count === 1 ? 'skill' : 'skills'}
                </span>
              </div>
            </Card>
          </button>
        ))}
      </div>

      <Separator className="my-6" />

      <SkillSectionList 
        categorizedSkills={categorizedSkills} 
        showAdjacent={selectedSkills.length > 0}
      />
    </div>
  );
};