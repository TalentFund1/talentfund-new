import { Card } from "@/components/ui/card";
import { BenchmarkSkillsMatrixContent } from "./skills-matrix/BenchmarkSkillsMatrixContent";
import { BenchmarkSearchProvider } from "@/components/skills/context/BenchmarkSearchContext";

export const BenchmarkSkillsMatrix = () => {
  console.log('Rendering BenchmarkSkillsMatrix with proper padding alignment');

  return (
    <BenchmarkSearchProvider>
      <Card className="max-w-7xl mx-auto p-6 bg-white">
        <BenchmarkSkillsMatrixContent />
      </Card>
    </BenchmarkSearchProvider>
  );
};