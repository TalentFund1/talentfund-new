import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useRoleStore } from "./RoleBenchmark";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { useSkillsFiltering } from "./skills-matrix/useSkillsFiltering";
import { useBenchmarkSkillsMatrixState } from "./skills-matrix/BenchmarkSkillsMatrixState";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { BenchmarkSkillsMatrixView } from "./skills-matrix/BenchmarkSkillsMatrixView";

const BenchmarkSkillsMatrixContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { id } = useParams<{ id: string }>();
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  const { visibleItems } = useBenchmarkSkillsMatrixState();

  const track = getTrackForRole(selectedRole);
  const comparisonLevel = track === "Managerial" ? "m3" : roleLevel.toLowerCase();

  const { filteredSkills } = useSkillsFiltering(
    id || "",
    selectedRole,
    comparisonLevel,
    selectedLevel,
    selectedInterest,
    selectedSkillLevel,
    searchTerm,
    toggledSkills,
    true
  );

  const paginatedSkills = filteredSkills.slice(0, visibleItems);
  
  console.log('BenchmarkSkillsMatrix - Current state:', {
    selectedRole,
    roleLevel: comparisonLevel,
    track,
    filteredSkillsCount: filteredSkills.length,
    toggledSkillsCount: toggledSkills.size,
    selectedCategory
  });

  return (
    <div className="space-y-6">
      <BenchmarkSkillsMatrixView
        roleId={selectedRole}
        employeeId={id || ""}
        roleLevel={comparisonLevel}
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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        visibleItems={visibleItems}
      />
    </div>
  );
};

export const BenchmarkSkillsMatrix = () => {
  return (
    <ToggledSkillsProvider>
      <BenchmarkSkillsMatrixContent />
    </ToggledSkillsProvider>
  );
};