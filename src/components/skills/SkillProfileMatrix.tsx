import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useParams } from 'react-router-dom';
import { roleSkills } from './data/roleSkills';
import { CategoryCards } from './CategoryCards';
import { getUnifiedSkillData } from './data/skillDatabaseService';
import { SkillMappingHeader } from './header/SkillMappingHeader';
import { SkillProfileMatrixFilters } from './matrix/SkillProfileMatrixFilters';
import { SkillProfileMatrixContent } from './matrix/SkillProfileMatrixContent';
import { normalizeSkillTitle } from './utils/normalization';

type SortField = 'growth' | 'salary' | null;
type SortDirection = 'asc' | 'desc' | null;

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
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
      critical: allSkills.filter(skill => {
        if (!toggledSkills.has(skill.title)) return false;
        const skillData = getUnifiedSkillData(skill.title);
        return skillData.weight === 'critical';
      }).length,
      technical: allSkills.filter(skill => {
        if (!toggledSkills.has(skill.title)) return false;
        const skillData = getUnifiedSkillData(skill.title);
        return skillData.weight === 'technical';
      }).length,
      necessary: allSkills.filter(skill => {
        if (!toggledSkills.has(skill.title)) return false;
        const skillData = getUnifiedSkillData(skill.title);
        return skillData.weight === 'necessary';
      }).length
    };

    console.log('CategoryCards - Displaying counts for toggled skills:', {
      total: counts.all,
      critical: counts.critical,
      technical: counts.technical,
      necessary: counts.necessary
    });
    
    return counts;
  };

  const skillCounts = calculateToggledSkillCounts();
  const totalRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].length;

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

    if (skillType !== "all") {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        return skillData.category === skillType;
      });
    }

    if (selectedCategory !== "all") {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        return skillData.weight === selectedCategory;
      });
    }

    if (sortField && sortDirection) {
      skills.sort((a, b) => {
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
    }

    return skills;
  })();

  const handleToggleSkill = (skillTitle: string) => {
    const newToggledSkills = new Set(toggledSkills);
    if (newToggledSkills.has(skillTitle)) {
      newToggledSkills.delete(skillTitle);
    } else {
      newToggledSkills.add(skillTitle);
    }
    setToggledSkills(newToggledSkills);
    
    toast({
      title: "Skill Updated",
      description: `${skillTitle} has been ${newToggledSkills.has(skillTitle) ? 'added to' : 'removed from'} your skills.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white mb-8">
        <SkillMappingHeader skillCount={totalRoleSkills} />
        
        <Separator className="my-4" />

        <CategoryCards
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          roleId={id || "123"}
          counts={skillCounts}
        />

        <SkillProfileMatrixFilters
          skillType={skillType}
          setSkillType={setSkillType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <SkillProfileMatrixContent 
          skills={filteredSkills}
          toggledSkills={toggledSkills}
          onToggleSkill={handleToggleSkill}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </Card>
    </div>
  );
};
