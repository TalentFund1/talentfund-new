import { Card } from "@/components/ui/card";
import { CompetencyGraphTable } from "@/components/skills/competency/CompetencyGraphTable";
import { useRoleStore } from "../RoleBenchmark";
import { useToggledSkills } from "@/components/skills/context/ToggledSkillsContext";
import { useState } from "react";

export const BenchmarkCompetencyMatrix = () => {
  const { selectedRole, selectedLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white mb-6">
      <CompetencyGraphTable
        currentRoleId={selectedRole}
        track="Professional"
        selectedCategory={selectedCategory}
        toggledSkills={toggledSkills}
      />
    </Card>
  );
};