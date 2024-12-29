import { Card } from "@/components/ui/card";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";
import { SkillsMatrixSearchProvider } from "@/components/skills/context/SkillsMatrixSearchContext";
import { useState, useRef } from "react";

export const SkillsMatrix = () => {
  console.log('Rendering SkillsMatrix with proper padding alignment');
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWeight, setSelectedWeight] = useState("all");
  const observerTarget = useRef<HTMLDivElement>(null);

  return (
    <SkillsMatrixSearchProvider>
      <Card className="max-w-7xl mx-auto p-6 bg-white">
        <SkillsMatrixContent 
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
    </SkillsMatrixSearchProvider>
  );
};