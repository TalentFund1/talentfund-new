import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddSkillsDialog } from "../dialog/AddSkillsDialog";

interface SkillProfileMatrixHeaderProps {
  skillCount: number;
}

export const SkillProfileMatrixHeader = ({ skillCount }: SkillProfileMatrixHeaderProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Skill Mapping</h2>
        <p className="text-sm text-muted-foreground mt-1">{skillCount} Skills Added</p>
      </div>
      <Button 
        onClick={() => setDialogOpen(true)}
        className="bg-[#1F2144] hover:bg-[#1F2144]/90"
      >
        <div className="w-5 h-5 rounded-full border-[1.75px] border-white flex items-center justify-center">
          <Plus className="h-3 w-3 stroke-[2]" />
        </div>
        <span className="ml-2 text-sm font-medium">Add Skill</span>
      </Button>
      <AddSkillsDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};