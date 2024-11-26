import { useState, useRef } from "react";
import { useBenchmarkSearch } from "../../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { filterSkillsByCategory } from "./skillCategories";
import { getEmployeeSkills } from "./initialSkills";
import { useRoleStore } from "../RoleBenchmark";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { roleSkills } from "../../skills/data/roleSkills";

export const useBenchmarkMatrixState = (id: string) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(10);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const observerTarget = useRef<HTMLDivElement>(null);
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { currentStates } = useSkillsMatrixStore();

  const employeeSkills = getEmployeeSkills(id);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  return {
    searchTerm,
    setSearchTerm,
    selectedSearchSkills,
    setSelectedSearchSkills,
    visibleItems,
    setVisibleItems,
    selectedLevel,
    setSelectedLevel,
    selectedInterest,
    setSelectedInterest,
    selectedSkillLevel,
    setSelectedSkillLevel,
    observerTarget,
    roleLevel,
    toggledSkills,
    getSkillCompetencyState,
    currentStates,
    employeeSkills,
    currentRoleSkills,
    selectedRole
  };
};