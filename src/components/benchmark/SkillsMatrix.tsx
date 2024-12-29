import { Card } from "@/components/ui/card";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";
import { SkillsMatrixSearchProvider } from "@/components/skills/context/SkillsMatrixSearchContext";

export const SkillsMatrix = () => {
  console.log('Rendering SkillsMatrix with proper padding alignment');
  
  return (
    <SkillsMatrixSearchProvider>
      <Card className="max-w-7xl mx-auto p-6 bg-white">
        <SkillsMatrixContent />
      </Card>
    </SkillsMatrixSearchProvider>
  );
};