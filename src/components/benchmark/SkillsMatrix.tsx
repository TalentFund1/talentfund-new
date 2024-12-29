import { Card } from "@/components/ui/card";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";
import { SkillsMatrixSearchProvider } from "@/components/skills/context/SkillsMatrixSearchContext";
import { useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";

export const SkillsMatrix = () => {
  console.log('Rendering SkillsMatrix with proper padding alignment');
  
  const { id: employeeId } = useParams();
  const { getEmployeeSkills } = useEmployeeSkillsStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWeight, setSelectedWeight] = useState("all");
  const observerTarget = useRef<HTMLDivElement>(null);

  const filteredSkills = useMemo(() => {
    if (!employeeId) return [];

    const skills = getEmployeeSkills(employeeId);
    console.log('Retrieved employee skills:', {
      employeeId,
      skillCount: skills.length,
      skills: skills.map(s => s.title)
    });

    return skills.filter(skill => {
      const unifiedData = getUnifiedSkillData(skill.title);
      
      // Filter by category
      if (selectedCategory !== "all" && unifiedData.category !== selectedCategory) {
        return false;
      }

      // Filter by weight
      if (selectedWeight !== "all" && unifiedData.weight !== selectedWeight) {
        return false;
      }

      // Filter by search term or selected skills
      if (selectedSearchSkills.length > 0) {
        return selectedSearchSkills.includes(skill.title);
      }

      if (searchTerm) {
        return skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return true;
    });
  }, [employeeId, getEmployeeSkills, selectedCategory, selectedWeight, selectedSearchSkills, searchTerm]);

  return (
    <SkillsMatrixSearchProvider>
      <Card className="max-w-7xl mx-auto p-6 bg-white">
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
          visibleItems={10}
          observerTarget={observerTarget}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedWeight={selectedWeight}
          setSelectedWeight={setSelectedWeight}
        />
      </Card>
    </SkillsMatrixSearchProvider>
  );
};