import { RoleDetails } from "./RoleDetails";
import { BenchmarkAnalysis } from "./BenchmarkAnalysis";
import { SkillsMatrixSection } from "./SkillsMatrixSection";
import { Separator } from "@/components/ui/separator";

export const RoleBenchmark = () => {
  return (
    <div className="space-y-6">
      <RoleDetails />
      <Separator className="my-6" />
      <BenchmarkAnalysis />
      <SkillsMatrixSection />
    </div>
  );
};