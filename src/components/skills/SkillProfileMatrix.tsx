import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useParams } from 'react-router-dom';
import { roleSkills } from './data/roleSkills';
import { CategoryCards } from './CategoryCards';
import { getCategoryForSkill, calculateSkillCounts } from './utils/skillCountUtils';
import { SkillMappingHeader } from './header/SkillMappingHeader';
import { SkillTypeFilters } from './filters/SkillTypeFilters';
import { getUnifiedSkillData } from './data/skillDatabaseService';
import { getSkillCategory } from './data/skills/categories/skillCategories';

type SortField = 'growth' | 'salary' | null;
type SortDirection = 'asc' | 'desc' | null;

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDirty, setIsDirty] = useState(false);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const { toast } = useToast();
  const { id } = useParams();
  const { toggledSkills, setToggledSkills } = useToggledSkills();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const getAllSkills = () => {
    // Get all role skills
    const roleSkillsList = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    // Create a Set of role skill titles for quick lookup
    const roleSkillTitles = new Set(roleSkillsList.map(s => s.title));

    // Get additional skills that aren't in role skills
    const additionalSkills = Array.from(toggledSkills)
      .filter(skillTitle => !roleSkillTitles.has(skillTitle))
      .map(skillTitle => getUnifiedSkillData(skillTitle));

    // Combine all skills
    return [...roleSkillsList, ...additionalSkills];
  };

  const filteredSkills = (() => {
    console.log('Starting skill filtering process');
    let skills = getAllSkills();
    
    console.log('Initial skills count:', skills.length);

    // Filter by skill type if selected
    if (skillType !== "all") {
      skills = skills.filter(skill => {
        const category = getSkillCategory(skill.title);
        console.log(`Filtering skill ${skill.title}: category=${category}, selected=${skillType}`);
        return category === skillType;
      });
    }

    // Filter by selected category if not "all"
    if (selectedCategory !== 'all') {
      skills = skills.filter(skill => {
        const skillCategory = getCategoryForSkill(skill, id || "123");
        console.log(`Filtering skill ${skill.title}: category=${skillCategory}, selected=${selectedCategory}`);
        return skillCategory === selectedCategory;
      });
    }

    console.log('Skills after category filtering:', skills.length);

    // Sort skills based on toggle state (toggled skills first)
    const sortedSkills = [...skills].sort((a, b) => {
      const aIsToggled = toggledSkills.has(a.title);
      const bIsToggled = toggledSkills.has(b.title);
      
      if (aIsToggled && !bIsToggled) return -1;
      if (!aIsToggled && bIsToggled) return 1;

      // If both have same toggle state, apply additional sorting
      if (sortField && sortDirection) {
        if (sortField === 'growth') {
          const aGrowth = parseFloat(a.growth);
          const bGrowth = parseFloat(b.growth);
          return sortDirection === 'asc' ? aGrowth - bGrowth : bGrowth - aGrowth;
        } else if (sortField === 'salary') {
          const aSalary = parseFloat(a.salary.replace(/[^0-9.-]+/g, ""));
          const bSalary = parseFloat(b.salary.replace(/[^0-9.-]+/g, ""));
          return sortDirection === 'asc' ? aSalary - bSalary : bSalary - aSalary;
        }
      }
      
      // If no other sorting criteria, sort alphabetically
      return a.title.localeCompare(b.title);
    });

    console.log('Final filtered and sorted skills:', {
      total: sortedSkills.length,
      toggled: Array.from(toggledSkills).length,
      sample: sortedSkills.slice(0, 3).map(s => ({
        title: s.title,
        isToggled: toggledSkills.has(s.title)
      }))
    });

    return sortedSkills;
  })();

  const skillCounts = calculateSkillCounts(id || "123");
  const toggledSkillCount = Array.from(toggledSkills).length;

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white mb-8">
        <SkillMappingHeader skillCount={toggledSkillCount} />
        
        <Separator className="my-4" />

        <CategoryCards
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          skillCount={skillCounts}
        />

        <SkillTypeFilters
          skillType={skillType}
          setSkillType={setSkillType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="rounded-lg border border-border overflow-hidden">
          <SkillProfileMatrixTable 
            paginatedSkills={filteredSkills}
            toggledSkills={toggledSkills}
            onToggleSkill={(skillTitle) => {
              const newToggledSkills = new Set(toggledSkills);
              if (newToggledSkills.has(skillTitle)) {
                newToggledSkills.delete(skillTitle);
              } else {
                newToggledSkills.add(skillTitle);
              }
              setToggledSkills(newToggledSkills);
              setIsDirty(true);
              
              toast({
                title: "Skill Updated",
                description: `${skillTitle} has been ${newToggledSkills.has(skillTitle) ? 'added to' : 'removed from'} your skills.`,
              });
            }}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </div>
      </Card>
    </div>
  );
};