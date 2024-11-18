import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useRoleStore } from "./RoleBenchmark";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { SkillsMatrixCategories } from "./skills-matrix/SkillsMatrixCategories";
import { SkillsMatrixSections } from "./skills-matrix/SkillsMatrixSections";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";
import { useState } from "react";

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();
  const employeeSkills = getEmployeeSkills(id || "");

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">Skills Matrix</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track employee skills and competencies
          </p>
        </div>

        <SkillsMatrixCategories 
          selectedRole={selectedRole}
          toggledSkills={toggledSkills}
        />

        <SkillsMatrixSections 
          selectedRole={selectedRole}
          selectedLevel={roleLevel}
          toggledSkills={toggledSkills}
          employeeSkills={employeeSkills}
        />

        <SkillsMatrixContent
          filteredSkills={employeeSkills}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          selectedSearchSkills={selectedSearchSkills}
          setSelectedSearchSkills={setSelectedSearchSkills}
          visibleItems={10}
          observerTarget={null}
        />
      </Card>
    </div>
  );
};