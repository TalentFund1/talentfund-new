import { useState, useRef, useEffect } from 'react';
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

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'growth' | 'salary' | null;

const STORAGE_KEY = 'added-skills';
const getStorageKey = (roleId: string) => `${STORAGE_KEY}-${roleId}`;

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hasMore, setHasMore] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const { toast } = useToast();
  const observerTarget = useRef(null);
  const { id } = useParams();
  const { toggledSkills, setToggledSkills } = useToggledSkills();

  // Get current role skills and combine with toggled skills
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];
  
  const getSkillsWithData = () => {
    return Array.from(toggledSkills).map(skillTitle => {
      console.log('Getting data for toggled skill:', skillTitle);
      return getUnifiedSkillData(skillTitle);
    });
  };

  const handleSort = (field: 'growth' | 'salary' | null) => {
    console.log('Handling sort for field:', field);
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredSkills = (() => {
    // Get all skills with their full data
    const skillsWithData = getSkillsWithData();
    console.log('Skills with data:', skillsWithData);

    let skills = skillsWithData;
    if (skillType === "specialized") {
      skills = skills.filter(skill => skill.category === "specialized");
    } else if (skillType === "common") {
      skills = skills.filter(skill => skill.category === "common");
    } else if (skillType === "certification") {
      skills = skills.filter(skill => skill.category === "certification");
    }

    let sortedSkills = skills.filter(skill => {
      // Apply category filter
      if (selectedCategory !== 'all') {
        const skillCategory = getCategoryForSkill(skill, id || "123");
        if (skillCategory !== selectedCategory) {
          return false;
        }
      }
      return true;
    });

    // Apply sorting if specified
    if (sortField && sortDirection) {
      sortedSkills.sort((a, b) => {
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

    return sortedSkills;
  })();

  const skillCounts = calculateSkillCounts(id || "123");
  const toggledSkillCount = filteredSkills.length;

  console.log('Filtered skills for display:', {
    totalSkills: filteredSkills.length,
    toggledSkills: Array.from(toggledSkills),
    filteredSkills: filteredSkills.map(s => s.title)
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
            }}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </div>

        {hasMore && (
          <div ref={observerTarget} className="h-10" />
        )}
      </Card>
    </div>
  );
};