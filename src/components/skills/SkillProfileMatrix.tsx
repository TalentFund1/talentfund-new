import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useParams } from 'react-router-dom';
import { roleSkills } from './data/roleSkills';
import { CategoryCards } from './CategoryCards';
import { getCategoryForSkill, calculateSkillCounts } from './utils/skillCountUtils';
import { SkillMappingHeader } from './header/SkillMappingHeader';
import { SkillTypeFilters } from './filters/SkillTypeFilters';
import { UnifiedSkill } from './types/SkillTypes';
import { SkillProfileMatrixTable } from './SkillProfileMatrixTable';
import { getUnifiedSkillData } from './data/skillDatabaseService';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'growth' | 'salary' | null;

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

  const handleToggleSkill = (skillTitle: string) => {
    const newToggledSkills = new Set(toggledSkills);
    if (newToggledSkills.has(skillTitle)) {
      console.log('Removing skill:', skillTitle);
      newToggledSkills.delete(skillTitle);
    } else {
      console.log('Adding skill:', skillTitle);
      newToggledSkills.add(skillTitle);
    }
    setToggledSkills(newToggledSkills);
    setIsDirty(true);
    
    toast({
      title: "Skill Updated",
      description: `${skillTitle} has been ${newToggledSkills.has(skillTitle) ? 'added to' : 'removed from'} your skills.`,
    });
  };

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

  // Get only the skills for the current role
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const transformSkillToBenchmarkFormat = (skill: any): UnifiedSkill => {
    console.log('Transforming skill to benchmark format:', skill.title);
    const unifiedSkill = getUnifiedSkillData(skill.title);
    console.log('Transformed skill result:', unifiedSkill);
    return unifiedSkill;
  };

  const filteredSkills = (() => {
    let skills: UnifiedSkill[] = [];
    
    // Get skills based on skill type
    if (skillType === "all") {
      skills = [
        ...currentRoleSkills.specialized.map(transformSkillToBenchmarkFormat),
        ...currentRoleSkills.common.map(transformSkillToBenchmarkFormat),
        ...currentRoleSkills.certifications.map(transformSkillToBenchmarkFormat)
      ];
    } else if (skillType === "specialized") {
      skills = currentRoleSkills.specialized.map(transformSkillToBenchmarkFormat);
    } else if (skillType === "common") {
      skills = currentRoleSkills.common.map(transformSkillToBenchmarkFormat);
    } else if (skillType === "certification") {
      skills = currentRoleSkills.certifications.map(transformSkillToBenchmarkFormat);
    }

    console.log('Initial filtered skills:', skills.map(s => s.title));

    // Filter skills based on category and toggle state
    let sortedSkills = skills.filter(skill => {
      if (selectedCategory !== 'all') {
        const skillCategory = getCategoryForSkill(skill, id || "123");
        return skillCategory === selectedCategory;
      }
      return true;
    });

    // Add any toggled skills that aren't already in the list
    Array.from(toggledSkills).forEach(skillTitle => {
      if (!sortedSkills.some(skill => skill.title === skillTitle)) {
        const unifiedSkill = getUnifiedSkillData(skillTitle);
        if (unifiedSkill) {
          sortedSkills.push(unifiedSkill);
        }
      }
    });

    console.log('Skills after category filtering:', sortedSkills.map(s => s.title));

    // Sort skills based on toggle state first
    sortedSkills.sort((a, b) => {
      const aIsToggled = toggledSkills.has(a.title);
      const bIsToggled = toggledSkills.has(b.title);
      
      if (aIsToggled && !bIsToggled) return -1;
      if (!aIsToggled && bIsToggled) return 1;
      return 0;
    });

    // Apply additional sorting if specified
    if (sortField && sortDirection) {
      const toggleSortedSkills = [...sortedSkills];
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
      sortedSkills = toggleSortedSkills;
    }

    console.log('Final filtered and sorted skills:', sortedSkills.map(s => s.title));
    return sortedSkills;
  })();

  const skillCounts = calculateSkillCounts(id || "123");
  const toggledSkillCount = Array.from(toggledSkills).filter(skill => 
    filteredSkills.some(fs => fs.title === skill)
  ).length;

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
            onToggleSkill={handleToggleSkill}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </div>

        {hasMore && (
          <div className="h-10" />
        )}
      </Card>
    </div>
  );
};