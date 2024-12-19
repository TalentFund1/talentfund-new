import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useRoleStore } from "./RoleBenchmark";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { BenchmarkSkillsMatrixView } from "./skills-matrix/BenchmarkSkillsMatrixView";
import { useTrack } from "../skills/context/TrackContext";
import { useSkillsFiltering } from "./skills-matrix/useSkillsFiltering";
import { useBenchmarkSkillsMatrixState } from "./skills-matrix/BenchmarkSkillsMatrixState";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";

const BenchmarkSkillsMatrixContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const { id } = useParams<{ id: string }>();
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  const { visibleItems } = useBenchmarkSkillsMatrixState();

  // Get only the employee's assigned skills
  const employeeSkills = getEmployeeSkills(id || "");

  console.log('BenchmarkSkillsMatrix - Employee skills:', {
    employeeId: id,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => s.title)
  });

  const track = getTrackForRole(selectedRole);
  const comparisonLevel = track === "Managerial" ? "m3" : roleLevel.toLowerCase();

  // Filter the employee's assigned skills
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

  // Only show skills that are actually assigned to the employee
  const assignedSkills = filteredSkills.filter(skill => 
    employeeSkills.some(empSkill => empSkill.title === skill.title)
  );

  console.log('BenchmarkSkillsMatrix - Filtered to assigned skills:', {
    total: assignedSkills.length,
    skills: assignedSkills.map(s => s.title)
  });

  const paginatedSkills = assignedSkills.slice(0, visibleItems);
  
  console.log('BenchmarkSkillsMatrix - Current state:', {
    selectedRole,
    roleLevel: comparisonLevel,
    track,
    filteredSkillsCount: assignedSkills.length,
    toggledSkillsCount: toggledSkills.size
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