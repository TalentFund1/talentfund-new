import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { BenchmarkSkillsMatrixContent } from "./skills-matrix/BenchmarkSkillsMatrixContent";
import { useBenchmarkMatrixState } from "./skills-matrix/BenchmarkMatrixStateAndFilters";
import { useFilteredSkills } from "./skills-matrix/BenchmarkSkillsFilter";

const BenchmarkSkillsMatrixInner = () => {
  const { id } = useParams<{ id: string }>();
  const state = useBenchmarkMatrixState(id || "");
  
  const filteredSkills = useFilteredSkills({
    employeeSkills: state.employeeSkills,
    selectedLevel: state.selectedLevel,
    selectedInterest: state.selectedInterest,
    selectedSkillLevel: state.selectedSkillLevel,
    searchTerm: state.searchTerm,
    selectedSearchSkills: state.selectedSearchSkills,
    toggledSkills: state.toggledSkills,
    getSkillCompetencyState: state.getSkillCompetencyState,
    currentStates: state.currentStates,
    roleLevel: state.roleLevel
  });

  useEffect(() => {
    const allRoleSkills = [
      ...state.currentRoleSkills.specialized,
      ...state.currentRoleSkills.common,
      ...state.currentRoleSkills.certifications
    ];

    const toggledRoleSkills = allRoleSkills
      .filter(skill => state.toggledSkills.has(skill.title))
      .map(skill => skill.title);
    
    state.setSelectedSearchSkills(toggledRoleSkills);
  }, [state.selectedRole, state.toggledSkills, state.currentRoleSkills]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && state.visibleItems < filteredSkills.length) {
          state.setVisibleItems(prev => Math.min(prev + 10, filteredSkills.length));
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = state.observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [state.visibleItems, filteredSkills.length]);

  const paginatedSkills = filteredSkills.slice(0, state.visibleItems);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <BenchmarkSkillsMatrixContent 
          roleId={state.selectedRole}
          employeeId={id || ""}
          roleLevel={state.roleLevel}
          filteredSkills={paginatedSkills}
          searchTerm={state.searchTerm}
          setSearchTerm={state.setSearchTerm}
          selectedLevel={state.selectedLevel}
          setSelectedLevel={state.setSelectedLevel}
          selectedInterest={state.selectedInterest}
          setSelectedInterest={state.setSelectedInterest}
          selectedSkillLevel={state.selectedSkillLevel}
          setSelectedSkillLevel={state.setSelectedSkillLevel}
          selectedSearchSkills={state.selectedSearchSkills}
          setSelectedSearchSkills={state.setSelectedSearchSkills}
          visibleItems={state.visibleItems}
          observerTarget={state.observerTarget}
        />
      </Card>
    </div>
  );
};

export const BenchmarkSkillsMatrix = () => {
  return (
    <ToggledSkillsProvider>
      <BenchmarkSkillsMatrixInner />
    </ToggledSkillsProvider>
  );
};