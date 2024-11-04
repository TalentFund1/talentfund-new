import { SkillsTable } from "@/components/SkillsTable";
import { Card } from "@/components/ui/card";

export const SkillsMatrixSection = () => {
  return (
    <Card className="p-6 bg-white mt-6">
      <SkillsTable />
    </Card>
  );
};