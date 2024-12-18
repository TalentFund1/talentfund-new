import { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useParams } from 'react-router-dom';
import { CategoryCards } from './CategoryCards';
import { SkillTypeFilters } from './filters/SkillTypeFilters';
import { SkillProfileMatrixTable } from './SkillProfileMatrixTable';
import { SkillProfileMatrixHeader } from './matrix/SkillProfileMatrixHeader';
import { calculateSkillCounts } from './utils/skillCountUtils';

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
  const observerTarget = useRef(null);
  const { id } = useParams();
  const { toggledSkills } = useToggledSkills();

  const skillCounts = calculateSkillCounts(id || "123");
  const toggledSkillCount = Array.from(toggledSkills).length;

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

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white mb-8">
        <SkillProfileMatrixHeader skillCount={toggledSkillCount} />
        
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
            paginatedSkills={[]}  // This will be populated by your existing logic
            toggledSkills={toggledSkills}
            onToggleSkill={() => {}}  // This will use your existing toggle logic
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