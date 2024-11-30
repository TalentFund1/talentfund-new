import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useRoleStore } from "./RoleBenchmark";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { BenchmarkSkillsMatrixView } from "./skills-matrix/BenchmarkSkillsMatrixView";
import { useFilteredSkills } from "./skills-matrix/skillFilterUtils";
import { sortSkills } from "./skills-matrix/skillSortUtils";

const ITEMS_PER_PAGE = 10;

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  
  const { id } = useParams<{ id: string }>();
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { currentStates } = useSkillsMatrixStore();

  const employeeSkills = getEmployeeSkills(id || "");

  // Use the new filtering utility
  const filteredSkills = useFilteredSkills(
    employeeSkills,
    selectedLevel,
    selectedInterest,
    selectedSkillLevel,
    searchTerm,
    selectedSearchSkills,
    currentStates,
    getSkillCompetencyState,
    roleLevel
  );

  // Sort the filtered skills
  const sortedSkills = sortSkills(filteredSkills, currentStates);
  
  // Get paginated skills
  const paginatedSkills = sortedSkills.slice(0, visibleItems);
  
  console.log('BenchmarkSkillsMatrix - Current state:', {
    selectedRole,
    roleLevel,
    filteredSkillsCount: filteredSkills.length,
    sortedSkillsCount: sortedSkills.length,
    currentStates: Object.keys(currentStates).length
  });

  return (
    <div className="space-y-6">
      <BenchmarkSkillsMatrixView
        roleId={selectedRole}
        employeeId={id || ""}
        roleLevel={roleLevel}
        filteredSkills={paginatedSkills}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedSkillLevel={selectedSkillLevel}
        setSelectedSkillLevel={setSelectedSkillLevel}
        selectedSearchSkills={selectedSearchSkills}
        setSelectedSearchSkills={setSelectedSearchSkills}
        visibleItems={visibleItems}
      />
    </div>
  );
};