import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useRoleStore } from "./RoleBenchmark";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { BenchmarkMatrixContent } from "./skills-matrix/BenchmarkMatrixContent";

const ITEMS_PER_PAGE = 10;

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();

  const employeeSkills = getEmployeeSkills(id || "");

  // Filter skills based on selected criteria
  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      let matchesLevel = selectedLevel === 'all' || skill.level?.toLowerCase() === selectedLevel.toLowerCase();
      let matchesInterest = selectedInterest === 'all' || skill.requirement?.toLowerCase() === selectedInterest.toLowerCase();
      let matchesSearch = !searchTerm || skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesSkillLevel = selectedSkillLevel === 'all' || skill.level?.toLowerCase() === selectedSkillLevel.toLowerCase();

      return matchesLevel && matchesInterest && matchesSearch && matchesSkillLevel;
    });

  console.log('Filtered skills:', {
    total: filteredSkills.length,
    level: selectedLevel,
    interest: selectedInterest,
    skillLevel: selectedSkillLevel
  });

  return (
    <div className="space-y-6">
      <ToggledSkillsProvider>
        <BenchmarkMatrixContent
          roleId={selectedRole}
          employeeId={id || ""}
          roleLevel={roleLevel}
          filteredSkills={filteredSkills.slice(0, visibleItems)}
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
          observerTarget={observerTarget}
        />
      </ToggledSkillsProvider>
    </div>
  );
};