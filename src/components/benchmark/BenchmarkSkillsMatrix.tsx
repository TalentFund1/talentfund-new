import { Card } from "@/components/ui/card";
import { BenchmarkSkillsMatrixContent } from "./skills-matrix/BenchmarkSkillsMatrixContent";
import { BenchmarkSearchProvider } from "@/components/skills/context/BenchmarkSearchContext";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRoleStore } from "./RoleBenchmark";

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

  return (
    <BenchmarkSearchProvider>
      <Card className="max-w-7xl mx-auto p-6 bg-white">
        <BenchmarkSkillsMatrixContent 
          roleId={selectedRole || ""}
          employeeId={employeeId || ""}
          roleLevel="intermediate"
          filteredSkills={[]}
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