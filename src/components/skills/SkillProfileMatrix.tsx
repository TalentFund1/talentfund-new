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
          setToggledSkills(new Set([...toggledSkills, ...parsedSkills]));
        }
      } catch (error) {
        console.error('Error loading saved skills:', error);
      }
    }
  }, [id]);

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

  // Get skills for the current role and include toggled skills
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const filteredSkills = (() => {
    // Start with all skills from the role
    let skills = [];
    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    // Add toggled skills that aren't already in the role skills
    const toggledSkillsArray = Array.from(toggledSkills).map(skillTitle => {
      const existingSkill = allRoleSkills.find(s => s.title === skillTitle);
      if (existingSkill) {
        return existingSkill;
      }
      // If it's a new skill, get its data
      return getUnifiedSkillData(skillTitle);
    });

    // Combine role skills with toggled skills
    const combinedSkills = [...allRoleSkills, ...toggledSkillsArray];

    // Remove duplicates
    const uniqueSkills = Array.from(new Set(combinedSkills.map(s => s.title)))
      .map(title => combinedSkills.find(s => s.title === title)!);

    // Apply skill type filter
    if (skillType === "specialized") {
      skills = uniqueSkills.filter(skill => currentRoleSkills.specialized.some(s => s.title === skill.title));
    } else if (skillType === "common") {
      skills = uniqueSkills.filter(skill => currentRoleSkills.common.some(s => s.title === skill.title));
    } else if (skillType === "certification") {
      skills = uniqueSkills.filter(skill => currentRoleSkills.certifications.some(s => s.title === skill.title));
    } else {
      skills = uniqueSkills;
    }

    // Apply category filter if selected
    if (selectedCategory !== 'all') {
      skills = skills.filter(skill => {
        const skillCategory = getCategoryForSkill(skill, id || "123");
        return skillCategory === selectedCategory;
      });
    }

    // Sort skills based on toggle state first
    skills.sort((a, b) => {
      const aIsToggled = toggledSkills.has(a.title);
      const bIsToggled = toggledSkills.has(b.title);
      
      if (aIsToggled && !bIsToggled) return -1;
      if (!aIsToggled && bIsToggled) return 1;
      return 0;
    });

    // Apply additional sorting if specified
    if (sortField && sortDirection) {
      const toggleSortedSkills = [...skills];
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
      skills = toggleSortedSkills;
    }

    console.log('Filtered skills:', skills.map(s => ({
      title: s.title,
      isToggled: toggledSkills.has(s.title),
      category: getCategoryForSkill(s, id || "123")
    })));

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
            onToggleSkill={handleToggleSkill}
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