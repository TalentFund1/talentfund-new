import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useToast } from "@/components/ui/use-toast";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { SkillsMatrixSearch } from "./skills-matrix/SkillsMatrixSearch";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("advanced");
  const [selectedInterest, setSelectedInterest] = useState("skill_goal");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { saveChanges, cancelChanges, hasChanges: storeHasChanges, currentStates } = useSkillsMatrixStore();
  const { searchTerm, setSearchTerm } = useBenchmarkSearch();

  const employeeSkills = getEmployeeSkills(id || "");

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const newTerm = searchTerm.trim().toLowerCase();
      if (!selectedSearchSkills.includes(newTerm)) {
        setSelectedSearchSkills(prev => [...prev, newTerm]);
        setSearchTerm("");
      }
    }
  };

  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(prev => prev.filter(s => s !== skill));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedSearchSkills([]);
  };

  const getLevelPriority = (level: string) => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 4;
  };

  const getInterestPriority = (requirement: string) => {
    const priorities: { [key: string]: number } = {
      'required': 0,
      'skill_goal': 0,
      'preferred': 1,
      'not_interested': 2,
      'unknown': 3
    };
    return priorities[requirement.toLowerCase()] ?? 4;
  };

  const filteredSkills = filterSkillsByCategory(employeeSkills, selectedCategory)
    .filter(skill => {
      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;

      const currentSkillState = currentStates[skill.title];
      const skillLevel = (currentSkillState?.level || skill.level || '').toLowerCase();
      const requirement = (currentSkillState?.requirement || skill.requirement || '').toLowerCase();

      if (selectedLevel !== 'all') {
        matchesLevel = skillLevel === selectedLevel.toLowerCase();
      }

      if (selectedInterest !== 'all') {
        switch (selectedInterest.toLowerCase()) {
          case 'skill_goal':
            matchesInterest = requirement === 'required' || requirement === 'skill_goal';
            break;
          case 'not_interested':
            matchesInterest = requirement === 'not_interested';
            break;
          case 'unknown':
            matchesInterest = !requirement || requirement === 'unknown';
            break;
          default:
            matchesInterest = requirement === selectedInterest.toLowerCase();
        }
      }

      if (selectedSearchSkills.length > 0) {
        matchesSearch = selectedSearchSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      } else if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesLevel && matchesInterest && matchesSearch;
    })
    .sort((a, b) => {
      const aState = currentStates[a.title];
      const bState = currentStates[b.title];
      
      const aLevel = aState?.level || a.level || 'unspecified';
      const bLevel = bState?.level || b.level || 'unspecified';
      
      const aInterest = aState?.requirement || a.requirement || 'unknown';
      const bInterest = bState?.requirement || b.requirement || 'unknown';

      const levelDiff = getLevelPriority(aLevel) - getLevelPriority(bLevel);
      if (levelDiff !== 0) return levelDiff;

      const interestDiff = getInterestPriority(aInterest) - getInterestPriority(bInterest);
      if (interestDiff !== 0) return interestDiff;

      return a.title.localeCompare(b.title);
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleItems < filteredSkills.length) {
          setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredSkills.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [visibleItems, filteredSkills.length]);

  useEffect(() => {
    setHasChanges(storeHasChanges);
  }, [storeHasChanges]);

  const paginatedSkills = filteredSkills.slice(0, visibleItems);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <SkillsMatrixHeader 
          hasChanges={hasChanges}
          onSave={saveChanges}
          onCancel={cancelChanges}
        />
        
        <SkillsMatrixSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSearchSkills={selectedSearchSkills}
          setSelectedSearchSkills={setSelectedSearchSkills}
          handleSearchKeyDown={handleSearchKeyDown}
          removeSearchSkill={removeSearchSkill}
          clearSearch={clearSearch}
        />
        
        <SkillsMatrixFilters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSearchSkills={selectedSearchSkills}
          setSelectedSearchSkills={setSelectedSearchSkills}
          handleSearchKeyDown={handleSearchKeyDown}
          removeSearchSkill={removeSearchSkill}
          clearSearch={clearSearch}
        />

        <SkillsMatrixTable 
          filteredSkills={paginatedSkills}
          setHasChanges={setHasChanges}
        />
        
        {visibleItems < filteredSkills.length && (
          <div 
            ref={observerTarget} 
            className="h-10 flex items-center justify-center"
          >
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
      </Card>
    </div>
  );
};