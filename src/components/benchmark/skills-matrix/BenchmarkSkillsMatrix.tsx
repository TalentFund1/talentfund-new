import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { SkillsMatrixContent } from "./SkillsMatrixContent";
import { ToggledSkillsProvider } from "../../skills/context/ToggledSkillsContext";

interface BenchmarkSkillsMatrixProps {
  roleId?: string;
  employeeId?: string;
}

export const BenchmarkSkillsMatrix = ({ roleId, employeeId }: BenchmarkSkillsMatrixProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(10);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const observerTarget = useRef<HTMLDivElement>(null);

  return (
    <ToggledSkillsProvider>
      <div className="space-y-6">
        <Card className="p-6 space-y-6 animate-fade-in bg-white">
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
            visibleItems={visibleItems}
            observerTarget={observerTarget}
          />
        </Card>
      </div>
    </ToggledSkillsProvider>
  );
};