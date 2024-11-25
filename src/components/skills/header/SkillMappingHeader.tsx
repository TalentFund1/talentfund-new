import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface SkillMappingHeaderProps {
  skillCount: number;
}

export const SkillMappingHeader = ({ skillCount }: SkillMappingHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Skill Mapping</h2>
          <div className="flex items-center gap-2">
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-md px-3 py-1 text-sm font-medium flex items-center gap-1.5">
              {skillCount}
              <span className="text-[#1F2144]/80">Skills Added</span>
            </span>
          </div>
        </div>
      </div>
      <Button className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Add Skill
      </Button>
    </div>
  );
};