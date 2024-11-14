import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useSelectedSkills } from "../skills/context/SelectedSkillsContext";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useToast } from "@/components/ui/use-toast";

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
  const { selectedSkills } = useSelectedSkills();
  const { toggledSkills } = useToggledSkills();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { saveChanges, cancelChanges, hasChanges: storeHasChanges, currentStates } = useSkillsMatrixStore();

  const employeeSkills = getEmployeeSkills(id || "");

  // Sync local hasChanges state with store's hasChanges
  useEffect(() => {
    setHasChanges(storeHasChanges);
  }, [storeHasChanges]);

  const handleSave = () => {
    saveChanges();
    setHasChanges(false);
    toast({
      title: "Changes saved successfully",
      description: "Your skill matrix has been updated.",
    });
  };

  const handleCancel = () => {
    cancelChanges();
    setHasChanges(false);
    toast({
      title: "Changes discarded",
      description: "Your skill matrix has been restored to its previous state.",
    });
  };

  const filteredSkills = filterSkillsByCategory(employeeSkills, selectedCategory)
    .filter(skill => {
      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;

      if (selectedLevel !== 'all') {
        // Get the current level from the store, fallback to original level if not in store
        const currentSkillState = currentStates[skill.title];
        const skillLevel = (currentSkillState?.level || skill.level || '').toLowerCase();
        const selectedLevelLower = selectedLevel.toLowerCase();

        if (selectedLevelLower === 'unspecified') {
          matchesLevel = !skillLevel || skillLevel === 'unspecified';
        } else {
          matchesLevel = skillLevel === selectedLevelLower;
        }
      }

      if (selectedInterest !== 'all') {
        const currentSkillState = currentStates[skill.title];
        const requirement = (currentSkillState?.requirement || skill.requirement || '').toLowerCase();
        matchesInterest = requirement === selectedInterest.toLowerCase();
      }

      if (selectedSearchSkills.length > 0) {
        matchesSearch = selectedSearchSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      } else if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesLevel && matchesInterest && matchesSearch;
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