import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";

export const SkillsMatrix = () => {
  return (
    <ToggledSkillsProvider>
      <SkillsMatrixContent />
    </ToggledSkillsProvider>
  );
};