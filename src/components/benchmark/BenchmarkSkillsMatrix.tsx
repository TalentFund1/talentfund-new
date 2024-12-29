import { Card } from "@/components/ui/card";
import { BenchmarkSkillsMatrixContent } from "./skills-matrix/BenchmarkSkillsMatrixContent";
import { BenchmarkSearchProvider } from "@/components/skills/context/BenchmarkSearchContext";
import { useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useRoleStore } from "./RoleBenchmark";
import { roleSkills } from "../skills/data/roleSkills";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";

export const BenchmarkSkillsMatrix = () => {
  console.log('Rendering BenchmarkSkillsMatrix with proper padding alignment');

  const { id: employeeId } = useParams();
  const { selectedRole } = useRoleStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWeight, setSelectedWeight] = useState("all");
  const observerTarget = useRef<HTMLDivElement>(null);

  const filteredSkills = useMemo(() => {
    if (!selectedRole) return [];

    const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
    if (!currentRoleSkills) return [];

    const allSkills = [
      ...(currentRoleSkills.specialized || []),
      ...(currentRoleSkills.common || []),
      ...(currentRoleSkills.certifications || [])
    ];

    console.log('Retrieved role skills:', {
      roleId: selectedRole,
      skillCount: allSkills.length,
      skills: allSkills.map(s => s.title)
    });

    return allSkills.filter(skill => {
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
  }, [selectedRole, selectedCategory, selectedWeight, selectedSearchSkills, searchTerm]);

  return (
    <BenchmarkSearchProvider>
      <Card className="max-w-7xl mx-auto p-6 bg-white">
        <BenchmarkSkillsMatrixContent 
          roleId={selectedRole || ""}
          employeeId={employeeId || ""}
          roleLevel="intermediate"
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
    </BenchmarkSearchProvider>
  );
};