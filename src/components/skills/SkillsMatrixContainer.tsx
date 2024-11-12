import { SkillsMatrix } from "../benchmark/SkillsMatrix";
import { SkillsSearchProvider } from "./context/SkillsSearchContext";

export const SkillsMatrixContainer = () => {
  return (
    <SkillsSearchProvider>
      <SkillsMatrix />
    </SkillsSearchProvider>
  );
};