import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { BenchmarkSkillsMatrixInner } from "./skills-matrix/BenchmarkSkillsMatrixInner";

export const BenchmarkSkillsMatrix = () => {
  return (
    <ToggledSkillsProvider>
      <BenchmarkSkillsMatrixInner />
    </ToggledSkillsProvider>
  );
};