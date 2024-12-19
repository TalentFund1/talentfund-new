import { Card } from "@/components/ui/card";
import { SkillsMatrixTable } from "../SkillsMatrixTable";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useParams } from "react-router-dom";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";

export const BenchmarkSkillsMatrix = () => {
  const { id } = useParams();
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(id || "");

  console.log('Rendering BenchmarkSkillsMatrix for employee:', {
    id,
    skillCount: employeeSkills.length
  });

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <SkillsMatrixTable 
        filteredSkills={employeeSkills}
        showCompanySkill={false}
        isRoleBenchmark={true}
      />
    </Card>
  );
};