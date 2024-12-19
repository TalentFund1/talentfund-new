import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/hooks/use-toast";
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
import { getSkillWeight } from './data/skills/categories/skillWeights';

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

  // Add event listener for skill updates
  useEffect(() => {
    const handleSkillsUpdate = (event: CustomEvent) => {
      console.log('Received skills update event:', event.detail);
      const { toggledSkills: newToggledSkills } = event.detail;
      if (newToggledSkills) {
        console.log('Updating toggled skills with:', newToggledSkills);
        setToggledSkills(new Set(newToggledSkills));
      }
    };

    window.addEventListener('skillsUpdated', handleSkillsUpdate as EventListener);
    return () => {
      window.removeEventListener('skillsUpdated', handleSkillsUpdate as EventListener);
    };
  }, [setToggledSkills]);

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

    console.log('Calculated toggled skill counts:', counts);
    return counts;
  };

  const skillCounts = calculateToggledSkillCounts();
  const totalRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].length;

  const getWeightPriority = (weight: string) => {
    switch (weight.toLowerCase()) {
      case 'critical':
        return 0;
      case 'technical':
        return 1;
      case 'necessary':
        return 2;
      default:
        return 3;
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

    // Sort skills: toggled first, then by weight (critical > technical > necessary)
    skills.sort((a, b) => {
      const aIsToggled = toggledSkills.has(a.title);
      const bIsToggled = toggledSkills.has(b.title);

      // First sort by toggled status
      if (aIsToggled !== bIsToggled) {
        return bIsToggled ? 1 : -1;
      }

      // Then sort by weight priority
      const aWeight = getSkillWeight(a.title);
      const bWeight = getSkillWeight(b.title);
      const weightDiff = getWeightPriority(aWeight) - getWeightPriority(bWeight);
      
      if (weightDiff !== 0) {
        return weightDiff;
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
        weight: getSkillWeight(skill.title),
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