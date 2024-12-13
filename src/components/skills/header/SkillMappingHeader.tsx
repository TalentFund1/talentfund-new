import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

      <Button 
        className="bg-[#1F2144] hover:bg-[#1F2144]/90 text-white rounded-lg px-4 py-2 flex items-center gap-2"
        onClick={() => console.log('Add Skill clicked')}
      >
        <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
          <Plus className="h-3 w-3 stroke-[2]" />
        </div>
        <span className="text-sm font-medium">Add Skill</span>
      </Button>
    </div>
  );
};