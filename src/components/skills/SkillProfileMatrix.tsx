import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { roleSkills } from './data/roleSkills';
import { getCategoryForSkill, calculateSkillCounts } from './utils/skillCountUtils';
import { SkillMappingHeader } from './header/SkillMappingHeader';
import { SkillTypeFilters } from './filters/SkillTypeFilters';
import { SkillProfileMatrixTable } from './SkillProfileMatrixTable';
import { useParams } from "react-router-dom";

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
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();

  // Get only the skills for the current role
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const filteredSkills = (() => {
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

    // Filter skills based on toggledSkills
    let filteredSkills = skills.filter(skill => toggledSkills.has(skill.title));

    // Apply category filter if selected
    if (selectedCategory !== 'all') {
      filteredSkills = filteredSkills.filter(skill => {
        const skillCategory = getCategoryForSkill(skill, id || "123");
        return skillCategory === selectedCategory;
      });
    }

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
          const aSalary = parseFloat(a.salary?.replace(/[^0-9.-]+/g, "") || "0");
          const bSalary = parseFloat(b.salary?.replace(/[^0-9.-]+/g, "") || "0");
          return sortDirection === 'asc' ? aSalary - bSalary : bSalary - aSalary;
        }
        return 0;
      });
      filteredSkills = toggleSortedSkills;
    }

    return filteredSkills;
  })();

  const skillCounts = calculateSkillCounts(id || "123");
  const toggledSkillCount = Array.from(toggledSkills).filter(skill => 
    filteredSkills.some(fs => fs.title === skill)
  ).length;

  // Debug logging
  console.log('SkillProfileMatrix - Current state:', {
    toggledSkills: Array.from(toggledSkills),
    filteredSkills: filteredSkills.map(s => s.title),
    skillType,
    selectedCategory,
    roleId: id
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
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={setSortField}
          />
        </div>

        {hasMore && (
          <div className="h-10" />
        )}
      </Card>
    </div>
  );
};