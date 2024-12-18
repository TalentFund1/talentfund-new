import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useParams } from 'react-router-dom';
import { roleSkills } from './data/roleSkills';
import { CategoryCards } from './CategoryCards';
import { getCategoryForSkill } from './utils/skillCountUtils';
import { SkillMappingHeader } from './header/SkillMappingHeader';
import { SkillTypeFilters } from './filters/SkillTypeFilters';
import { getUnifiedSkillData } from './data/skillDatabaseService';

type SortField = 'growth' | 'salary' | null;
type SortDirection = 'asc' | 'desc' | null;

const INITIAL_VISIBLE_COUNT = 12;

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hasMore, setHasMore] = useState(true);
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

  const filteredSkills = (() => {
    console.log('Filtering skills with type:', skillType);
    
    let skills = [];
    if (skillType === "all") {
      skills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ];
    } else if (skillType === "specialized") {
      skills = currentRoleSkills.specialized;
    } else if (skillType === "common") {
      skills = currentRoleSkills.common;
    } else if (skillType === "certification") {
      skills = currentRoleSkills.certifications;
    }

    console.log('Initial skills array:', skills.length);

    // Get all skills that aren't in the role skills
    const allSkillTitles = new Set(skills.map(s => s.title));
    const additionalSkills = Array.from(toggledSkills)
      .filter(skillTitle => !allSkillTitles.has(skillTitle))
      .map(skillTitle => {
        console.log('Adding skill:', skillTitle);
        const skillData = getUnifiedSkillData(skillTitle);
        // Determine the category based on the skill type
        if (currentRoleSkills.specialized.some(s => s.title === skillTitle)) {
          skillData.category = 'specialized';
        } else if (currentRoleSkills.common.some(s => s.title === skillTitle)) {
          skillData.category = 'common';
        } else if (currentRoleSkills.certifications.some(s => s.title === skillTitle)) {
          skillData.category = 'certification';
        }
        return skillData;
      });

    // Combine role skills with additional skills
    skills = [...skills, ...additionalSkills];
    console.log('Combined skills array:', skills.length);

    let filteredSkills = skills;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filteredSkills = filteredSkills.filter(skill => {
        if (selectedCategory === 'specialized') {
          return currentRoleSkills.specialized.some(s => s.title === skill.title);
        } else if (selectedCategory === 'common') {
          return currentRoleSkills.common.some(s => s.title === skill.title);
        } else if (selectedCategory === 'certification') {
          return currentRoleSkills.certifications.some(s => s.title === skill.title);
        }
        return true;
      });
    }

    console.log('After filtering:', filteredSkills.length);

    // Sort skills based on toggle state first
    filteredSkills.sort((a, b) => {
      const aIsToggled = toggledSkills.has(a.title);
      const bIsToggled = toggledSkills.has(b.title);
      
      if (aIsToggled && !bIsToggled) return -1;
      if (!aIsToggled && bIsToggled) return 1;
      return 0;
    });

    // Apply additional sorting if specified
    if (sortField && sortDirection) {
      const toggleSortedSkills = [...filteredSkills];
      toggleSortedSkills.sort((a, b) => {
        // Preserve toggle-based ordering within each group
        const aIsToggled = toggledSkills.has(a.title);
        const bIsToggled = toggledSkills.has(b.title);
        if (aIsToggled !== bIsToggled) {
          return aIsToggled ? -1 : 1;
        }

        if (sortField === 'growth') {
          const aGrowth = parseFloat(a.growth);
          const bGrowth = parseFloat(b.growth);
          return sortDirection === 'asc' ? aGrowth - bGrowth : bGrowth - aGrowth;
        } else if (sortField === 'salary') {
          const aSalary = parseFloat(a.salary.replace(/[^0-9.-]+/g, ""));
          const bSalary = parseFloat(b.salary.replace(/[^0-9.-]+/g, ""));
          return sortDirection === 'asc' ? aSalary - bSalary : bSalary - aSalary;
        }
        return 0;
      });
      filteredSkills = toggleSortedSkills;
    }

    console.log('Final filtered skills:', filteredSkills.length);
    return filteredSkills;
  })();

  const skillCounts = {
    all: filteredSkills.length,
    specialized: filteredSkills.filter(skill => 
      currentRoleSkills.specialized.some(s => s.title === skill.title)
    ).length,
    common: filteredSkills.filter(skill => 
      currentRoleSkills.common.some(s => s.title === skill.title)
    ).length,
    certification: filteredSkills.filter(skill => 
      currentRoleSkills.certifications.some(s => s.title === skill.title)
    ).length
  };

  const toggledSkillCount = Array.from(toggledSkills).length;

  console.log('Skill counts:', {
    total: filteredSkills.length,
    toggled: toggledSkillCount,
    categories: skillCounts
  });

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