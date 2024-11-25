import { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useParams } from "react-router-dom";
import { roleSkills } from './data/roleSkills';
import { SkillCategoryCards } from './sections/SkillCategoryCards';
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'growth' | 'salary' | null;

const categorizeSkill = (skill: any) => {
  // Critical skills are those with high growth and required status
  if (skill.growth >= "25%" && skill.requirement === "required") {
    return "critical";
  }
  // Technical skills are those related to technical subcategories
  if (["AI & ML", "Programming Languages", "ML Frameworks", "AI Applications"].includes(skill.subcategory)) {
    return "technical";
  }
  // Necessary skills are the remaining skills
  return "necessary";
};

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const { toast } = useToast();
  const observerTarget = useRef(null);
  const { id } = useParams<{ id: string }>();
  const { toggledSkills, setToggledSkills } = useToggledSkills();

  // Get current role skills
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  // Get all skills for the current role
  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Calculate category counts
  const categoryCounts = {
    all: allSkills.length,
    critical: allSkills.filter(skill => categorizeSkill(skill) === "critical").length,
    technical: allSkills.filter(skill => categorizeSkill(skill) === "technical").length,
    necessary: allSkills.filter(skill => categorizeSkill(skill) === "necessary").length
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

  const filteredSkills = (() => {
    let skills = allSkills;

    // Filter by category
    if (skillType !== "all") {
      skills = skills.filter(skill => categorizeSkill(skill) === skillType);
    }

    // Sort skills
    if (sortField && sortDirection) {
      skills = [...skills].sort((a, b) => {
        if (sortField === 'growth') {
          const aGrowth = parseFloat(a.growth);
          const bGrowth = parseFloat(b.growth);
          return sortDirection === 'asc' ? aGrowth - bGrowth : bGrowth - aGrowth;
        }
        return 0;
      });
    }

    return skills.sort((a, b) => {
      const aIsSaved = toggledSkills.has(a.title);
      const bIsSaved = toggledSkills.has(b.title);
      if (aIsSaved === bIsSaved) return 0;
      return aIsSaved ? -1 : 1;
    });
  })();

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Skill Mapping</h2>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {Array.from(toggledSkills).filter(skill => 
                filteredSkills.some(fs => fs.title === skill)
              ).length}
            </span>
          </div>
          <Button>Add Skill</Button>
        </div>

        <Separator className="my-4" />

        <SkillCategoryCards
          selectedCategory={skillType}
          onCategorySelect={setSkillType}
          categoryCounts={categoryCounts}
        />

        <div className="flex justify-between items-center mb-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[220px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sort by All</SelectItem>
              <SelectItem value="baseline">Sort by Baseline</SelectItem>
              <SelectItem value="recommended">Sort by Recommended</SelectItem>
              <SelectItem value="benchmark">Sort by Market Benchmark</SelectItem>
              <SelectItem value="occupation">Sort by Occupation</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

export default SkillProfileMatrix;
