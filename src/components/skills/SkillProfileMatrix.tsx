import { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { roleSkills } from './data/roleSkills';
import { CategoryCards } from './CategoryCards';
import { calculateSkillCounts } from './utils/skillCountUtils';
import { SkillMappingHeader } from './header/SkillMappingHeader';
import { SkillTypeFilters } from './filters/SkillTypeFilters';
import { AddSkillDropdown } from './dropdown/AddSkillDropdown';
import { SkillProfileTable } from './table/SkillProfileTable';
import { filterSkillsByType } from './utils/filterUtils';
import { sortSkills } from './utils/sortUtils';
import { useParams } from 'react-router-dom';

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hasMore, setHasMore] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [sortField, setSortField] = useState<'growth' | 'salary' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const observerTarget = useRef(null);
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { id } = useParams();

  const handleSort = (field: 'growth' | 'salary' | null) => {
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

  const handleToggleSkill = (skillTitle: string) => {
    const newToggledSkills = new Set(toggledSkills);
    if (newToggledSkills.has(skillTitle)) {
      newToggledSkills.delete(skillTitle);
    } else {
      newToggledSkills.add(skillTitle);
    }
    setToggledSkills(newToggledSkills);
    setIsDirty(true);
  };

  const currentRole = roleSkills[id as keyof typeof roleSkills];
  const allSkills = [
    ...currentRole?.specialized || [],
    ...currentRole?.common || [],
    ...currentRole?.certifications || []
  ];

  const filteredSkills = filterSkillsByType(
    allSkills,
    skillType,
    selectedCategory
  );

  const sortedSkills = sortSkills(
    filteredSkills,
    sortField,
    sortDirection,
    toggledSkills
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // Load more skills logic here
          setHasMore(false);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white mb-8">
        <div className="flex justify-between items-center">
          <SkillMappingHeader skillCount={Array.from(toggledSkills).length} />
          <AddSkillDropdown />
        </div>
        
        <Separator className="my-4" />

        <CategoryCards
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          skillCount={calculateSkillCounts(id || "123")}
        />

        <SkillTypeFilters
          skillType={skillType}
          setSkillType={setSkillType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="rounded-lg border border-border overflow-hidden">
          <SkillProfileTable 
            paginatedSkills={sortedSkills}
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