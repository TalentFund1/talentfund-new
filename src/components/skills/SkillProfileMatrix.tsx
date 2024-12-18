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

  // Load saved skills on component mount
  useEffect(() => {
    if (id) {
      try {
        const savedSkills = localStorage.getItem(getStorageKey(id));
        if (savedSkills) {
          const parsedSkills = JSON.parse(savedSkills);
          console.log('Loading saved skills:', { roleId: id, skills: parsedSkills });
          setToggledSkills(new Set(parsedSkills));
        }
      } catch (error) {
        console.error('Error loading saved skills:', error);
      }
    }
  }, [id]);

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

  // Get skills for the current role
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const filteredSkills = (() => {
    // Get base role skills based on type
    let baseSkills = [];
    if (skillType === "specialized") {
      baseSkills = currentRoleSkills.specialized;
    } else if (skillType === "common") {
      baseSkills = currentRoleSkills.common;
    } else if (skillType === "certification") {
      baseSkills = currentRoleSkills.certifications;
    } else {
      baseSkills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ];
    }

    // Add toggled skills that aren't in base skills
    const toggledSkillsArray = Array.from(toggledSkills)
      .filter(skillTitle => !baseSkills.some(s => s.title === skillTitle))
      .map(skillTitle => getUnifiedSkillData(skillTitle));

    // Combine and remove duplicates
    let skills = [...baseSkills, ...toggledSkillsArray];
    
    // Apply category filter if selected
    if (selectedCategory !== 'all') {
      skills = skills.filter(skill => {
        const skillCategory = getCategoryForSkill(skill, id || "123");
        return skillCategory === selectedCategory;
      });
    }

    // Sort by toggled state
    skills.sort((a, b) => {
      const aIsToggled = toggledSkills.has(a.title);
      const bIsToggled = toggledSkills.has(b.title);
      return aIsToggled === bIsToggled ? 0 : aIsToggled ? -1 : 1;
    });

    // Apply additional sorting if specified
    if (sortField && sortDirection) {
      skills.sort((a, b) => {
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
    }

    console.log('Filtered skills:', {
      total: skills.length,
      toggledCount: toggledSkills.size,
      skills: skills.map(s => ({
        title: s.title,
        isToggled: toggledSkills.has(s.title)
      }))
    });

    return skills;
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
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        </div>

        {hasMore && (
          <div ref={observerTarget} className="h-10" />
        )}
      </Card>
    </div>
  );
};