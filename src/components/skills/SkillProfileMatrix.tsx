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

  // Get the current role skills
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const transformSkillToBenchmarkFormat = (skill: any): UnifiedSkill => {
    console.log('Transforming skill to benchmark format:', skill.title);
    const unifiedSkill = getUnifiedSkillData(skill.title, id);
    console.log('Transformed skill result:', unifiedSkill);
    return unifiedSkill;
  };

  const filteredSkills = (() => {
    // First collect all role skills
    let allSkills: UnifiedSkill[] = [];
    
    // Add role skills based on skill type filter
    if (skillType === "all" || skillType === "specialized") {
      allSkills = [...allSkills, ...currentRoleSkills.specialized.map(transformSkillToBenchmarkFormat)];
    }
    if (skillType === "all" || skillType === "common") {
      allSkills = [...allSkills, ...currentRoleSkills.common.map(transformSkillToBenchmarkFormat)];
    }
    if (skillType === "all" || skillType === "certification") {
      allSkills = [...allSkills, ...currentRoleSkills.certifications.map(transformSkillToBenchmarkFormat)];
    }

    console.log('Initial role skills:', allSkills.map(s => s.title));

    // Add toggled skills that aren't in role skills
    Array.from(toggledSkills).forEach(skillTitle => {
      if (!allSkills.some(skill => skill.title === skillTitle)) {
        const unifiedSkill = getUnifiedSkillData(skillTitle, id);
        if (unifiedSkill) {
          console.log('Adding toggled skill:', unifiedSkill);
          allSkills.push(unifiedSkill);
        }
      }
    });

    console.log('Skills after adding toggled:', allSkills.map(s => s.title));

    // Apply skill type filtering
    let filteredSkills = allSkills;
    if (skillType !== "all") {
      filteredSkills = allSkills.filter(skill => {
        const category = getCategoryForSkill(skill, id || "123");
        return category === skillType;
      });
    }

    // Sort by toggle state first
    filteredSkills.sort((a, b) => {
      const aIsToggled = toggledSkills.has(a.title);
      const bIsToggled = toggledSkills.has(b.title);
      return aIsToggled === bIsToggled ? 0 : aIsToggled ? -1 : 1;
    });

    // Apply additional sorting if specified
    if (sortField && sortDirection) {
      filteredSkills = filteredSkills.sort((a, b) => {
        const aIsToggled = toggledSkills.has(a.title);
        const bIsToggled = toggledSkills.has(b.title);
        
        // Keep toggled skills grouped
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
    }

    console.log('Final filtered and sorted skills:', filteredSkills.map(s => s.title));
    return filteredSkills;
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
