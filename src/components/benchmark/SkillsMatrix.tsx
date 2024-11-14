import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams, useLocation } from "react-router-dom";
import { useSelectedSkills } from "../skills/context/SelectedSkillsContext";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { selectedSkills } = useSelectedSkills();
  const { toggledSkills } = useToggledSkills();
  const observerTarget = useRef<HTMLDivElement>(null);

  const isRoleBenchmarkTab = location.pathname.includes('benchmark');
  const employeeSkills = getEmployeeSkills(id || "");

  const handleSave = () => {
    setHasChanges(false);
  };

  const handleCancel = () => {
    setHasChanges(false);
  };

  const filteredSkills = filterSkillsByCategory(employeeSkills, selectedCategory)
    .filter(skill => {
      if (!toggledSkills.has(skill.title)) {
        return false;
      }

      // Filter by skill level
      if (selectedLevel !== 'all') {
        const skillLevel = skill.level.toLowerCase();
        if (skillLevel !== selectedLevel.toLowerCase()) {
          return false;
        }
      }

      // Filter by skill interest/requirement
      if (selectedInterest !== 'all') {
        const requirement = skill.requirement?.toLowerCase() || 'unknown';
        if (requirement !== selectedInterest.toLowerCase()) {
          return false;
        }
      }

      if (isRoleBenchmarkTab) {
        if (selectedSearchSkills.length > 0) {
          return selectedSearchSkills.some(term => 
            skill.title.toLowerCase().includes(term.toLowerCase())
          );
        }
        return searchTerm 
          ? skill.title.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
      }
      if (selectedSkills.length === 0) return true;
      return selectedSkills.some(searchTerm => 
        skill.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      setSelectedSearchSkills(prev => [...prev, searchTerm.trim()]);
      setSearchTerm("");
    }
  };

  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(prev => prev.filter(s => s !== skill));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedSearchSkills([]);
  };

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

  const paginatedSkills = filteredSkills.slice(0, visibleItems);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <SkillsMatrixHeader 
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <Separator className="my-4" />
        
        {!isRoleBenchmarkTab ? (
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
            handleSearchKeyDown={handleSearchKeyDown}
            removeSearchSkill={removeSearchSkill}
            clearSearch={clearSearch}
          />
        ) : (
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
            handleSearchKeyDown={handleSearchKeyDown}
            removeSearchSkill={removeSearchSkill}
            clearSearch={clearSearch}
          />
        )}

        <SkillsMatrixTable 
          filteredSkills={paginatedSkills}
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