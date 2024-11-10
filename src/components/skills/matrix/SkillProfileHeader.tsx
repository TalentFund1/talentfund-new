import { Button } from "@/components/ui/button";

interface SkillProfileHeaderProps {
  toggledSkillsCount: number;
}

export const SkillProfileHeader = ({ toggledSkillsCount }: SkillProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">Skill Profile</h2>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {toggledSkillsCount}
        </span>
      </div>
      <Button>Add Skill</Button>
    </div>
  );
};