import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useParams } from 'react-router-dom';
import { roleSkills } from './data/roleSkills';
import { CategoryCards } from './CategoryCards';
import { getCategoryForSkill, calculateSkillCounts } from './utils/skillCountUtils';
import { SkillMappingHeader } from './header/SkillMappingHeader';
import { SkillTypeFilters } from './filters/SkillTypeFilters';
import { getUnifiedSkillData } from './data/skillDatabaseService';
import { getSkillCategory } from './data/skills/categories/skillCategories';
import { normalizeSkillTitle } from './utils/normalization';

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

  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const calculateToggledSkillCounts = () => {
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    const toggledSkillsList = Array.from(toggledSkills);
    
    const counts = {
      all: toggledSkillsList.filter(skillTitle => 
        allSkills.some(skill => skill.title === skillTitle)
      ).length,
      critical: allSkills.filter(skill => 
        toggledSkills.has(skill.title) && 
        getCategoryForSkill(skill, id || "123") === 'critical'
      ).length,
      technical: allSkills.filter(skill => 
        toggledSkills.has(skill.title) && 
        getCategoryForSkill(skill, id || "123") === 'technical'
      ).length,
      necessary: allSkills.filter(skill => 
        toggledSkills.has(skill.title) && 
        getCategoryForSkill(skill, id || "123") === 'necessary'
      ).length
    };

    console.log('Calculated toggled skill counts for role:', id, counts);
    return counts;
  };

  const skillCounts = calculateToggledSkillCounts();
  const totalRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].length;

  const filteredSkills = (() => {
    const uniqueSkills = new Set();
    let skills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ].filter(skill => {
      const normalizedTitle = normalizeSkillTitle(skill.title);
      if (uniqueSkills.has(normalizedTitle)) {
        return false;
      }
      uniqueSkills.add(normalizedTitle);
      return true;
    });

    console.log(`Filtering skills for role ${id}:`, {
      totalSkills: skills.length,
      specialized: currentRoleSkills.specialized.length,
      common: currentRoleSkills.common.length,
      certifications: currentRoleSkills.certifications.length,
      uniqueCount: uniqueSkills.size,
      toggledSkillsCount: toggledSkills.size
    });

    if (skillType !== "all") {
      skills = skills.filter(skill => getSkillCategory(skill.title) === skillType);
    }

    if (selectedCategory !== "all") {
      skills = skills.filter(skill => getCategoryForSkill(skill, id || "123") === selectedCategory);
    }

    // Sort skills: toggled skills first, then by other criteria
    skills.sort((a, b) => {
      const aIsToggled = toggledSkills.has(a.title);
      const bIsToggled = toggledSkills.has(b.title);

      // First sort by toggled status
      if (aIsToggled !== bIsToggled) {
        return bIsToggled ? 1 : -1;
      }

      // If both are toggled or both are not toggled, sort by other criteria
      if (sortField && sortDirection) {
        if (sortField === 'growth') {
          const aGrowth = parseFloat(a.growth);
          const bGrowth = parseFloat(b.growth);
          return sortDirection === 'asc' ? aGrowth - bGrowth : bGrowth - aGrowth;
        } else if (sortField === 'salary') {
          const aSalary = parseFloat(a.salary?.replace(/[^0-9.-]+/g, "") || "0");
          const bSalary = parseFloat(b.salary?.replace(/[^0-9.-]+/g, "") || "0");
          return sortDirection === 'asc' ? aSalary - bSalary : bSalary - aSalary;
        }
      }

      // Finally sort alphabetically
      return a.title.localeCompare(b.title);
    });

    console.log('Filtered and sorted skills:', {
      total: skills.length,
      toggledCount: Array.from(toggledSkills).length,
      skillType,
      selectedCategory,
      firstFewSkills: skills.slice(0, 3).map(skill => ({
        title: skill.title,
        isToggled: toggledSkills.has(skill.title)
      }))
    });

    return skills;
  })();

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white mb-8">
        <SkillMappingHeader skillCount={totalRoleSkills} />
        
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
            onSort={setSortField}
          />
        </div>
      </Card>
    </div>
  );
};