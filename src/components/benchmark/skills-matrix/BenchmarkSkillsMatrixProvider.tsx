import { ToggledSkillsProvider } from "../../skills/context/ToggledSkillsContext";
import { BenchmarkSkillsMatrix } from "../BenchmarkSkillsMatrix";

interface BenchmarkSkillsMatrixProviderProps {
  roleId?: string;
  employeeId?: string;
}

export const BenchmarkSkillsMatrixProvider = ({ 
  roleId, 
  employeeId 
}: BenchmarkSkillsMatrixProviderProps) => {
  return (
    <ToggledSkillsProvider>
      <BenchmarkSkillsMatrix 
        roleId={roleId} 
        employeeId={employeeId} 
      />
    </ToggledSkillsProvider>
  );
};