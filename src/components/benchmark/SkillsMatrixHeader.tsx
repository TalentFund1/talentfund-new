import { Separator } from "@/components/ui/separator";

export const SkillsMatrixHeader = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
      </div>
      <Separator className="mb-6" />
    </div>
  );
};