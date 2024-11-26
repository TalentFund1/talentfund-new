import { useState, useRef, useEffect } from "react";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";

export const SkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(10);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initialize filtered skills with actual data
  const [filteredSkills, setFilteredSkills] = useState(() => {
    const initialSkills = filterSkillsByCategory(getEmployeeSkills(""), "all");
    return initialSkills;
  });

  console.log('SkillsMatrix render:', {
    searchTerm,
    selectedLevel,
    selectedInterest,
    selectedSkillLevel,
    filteredSkillsCount: filteredSkills.length
  });

  return (
    <ToggledSkillsProvider>
      <SkillsMatrixContent
        filteredSkills={filteredSkills}
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
  );
};