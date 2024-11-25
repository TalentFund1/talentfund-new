import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useParams } from "react-router-dom";
import { roleSkills } from './data/roleSkills';
import { CategoryCards } from './CategoryCards';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'growth' | 'salary' | null;

const getCategoryForSkill = (skill: any, roleId: string) => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  // Critical skills are specialized skills with high growth
  if (currentRoleSkills.specialized.some(s => s.title === skill.title) && 
      parseFloat(skill.growth) >= 25) {
    return 'critical';
  }
  
  // Technical skills are specialized or common skills related to technical aspects
  if (currentRoleSkills.specialized.some(s => s.title === skill.title) ||
      (currentRoleSkills.common.some(s => s.title === skill.title) && 
       !skill.title.toLowerCase().includes('soft'))) {
    return 'technical';
  }
  
  // Necessary skills are everything else
  return 'necessary';
};

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  console.log('Current toggled skills:', Array.from(toggledSkills));

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

    let sortedSkills = skills.filter(skill => {
      const isInCurrentRole = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ].some(roleSkill => roleSkill.title === skill.title);

      // Apply category filter
      if (selectedCategory !== 'all') {
        const skillCategory = getCategoryForSkill(skill, id || "123");
        if (skillCategory !== selectedCategory) {
          return false;
        }
      }

      return isInCurrentRole;
    });

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

    return sortedSkills;
  })();

  // Calculate skill counts for each category
  const skillCounts = {
    all: filteredSkills.length,
    critical: filteredSkills.filter(skill => getCategoryForSkill(skill, id || "123") === 'critical').length,
    technical: filteredSkills.filter(skill => getCategoryForSkill(skill, id || "123") === 'technical').length,
    necessary: filteredSkills.filter(skill => getCategoryForSkill(skill, id || "123") === 'necessary').length
  };

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

        <CategoryCards
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          skillCount={skillCounts}
        />

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Select value={skillType} onValueChange={setSkillType}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Skill Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skill Type</SelectItem>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>

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