import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useRoleStore } from "./RoleBenchmark";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useSkillsFiltering } from "./useSkillsFiltering";
import { BenchmarkSkillsMatrixTable } from "./BenchmarkSkillsMatrixTable";
import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";

interface SkillsMatrixContentProps {
  filteredSkills: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSkillLevel: string;
  setSelectedSkillLevel: (level: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
  isRoleBenchmark?: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedRoleRequirement: string;
  setSelectedRoleRequirement: (requirement: string) => void;
}

const SkillsMatrixContent = ({
  filteredSkills,
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSkillLevel,
  setSelectedSkillLevel,
  selectedSearchSkills,
  setSelectedSearchSkills,
  visibleItems,
  observerTarget,
  isRoleBenchmark = false,
  selectedCategory,
  setSelectedCategory,
  selectedRoleRequirement,
  setSelectedRoleRequirement
}: SkillsMatrixContentProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();

  const { filteredSkills: skills } = useSkillsFiltering(
    id || "",
    selectedRoleRequirement,
    selectedLevel,
    selectedInterest,
    selectedSkillLevel,
    searchTerm,
    toggledSkills,
    isRoleBenchmark
  );

  return (
    <>
      <BenchmarkMatrixFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedSkillLevel={selectedSkillLevel}
        setSelectedSkillLevel={setSelectedSkillLevel}
        selectedSearchSkills={selectedSearchSkills}
        removeSearchSkill={(skill) => {
          setSelectedSearchSkills(prev => prev.filter(s => s !== skill));
        }}
        clearSearch={() => setSelectedSearchSkills([])}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRoleRequirement={selectedRoleRequirement}
        setSelectedRoleRequirement={setSelectedRoleRequirement}
      />

      <BenchmarkSkillsMatrixTable 
        filteredSkills={skills.slice(0, visibleItems)}
      />

      {visibleItems < skills.length && (
        <div 
          ref={observerTarget} 
          className="h-10 flex items-center justify-center"
        >
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
    </>
  );
};

export default SkillsMatrixContent;
