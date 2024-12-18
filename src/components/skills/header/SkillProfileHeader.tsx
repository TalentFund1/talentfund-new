import { AddSkillsDialog } from "../dialog/AddSkillsDialog";

export const SkillProfileHeader = ({ skillCount }: { skillCount: number }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Skill Mapping</h2>
        <p className="text-sm text-muted-foreground">{skillCount} Skills Added</p>
      </div>
      <AddSkillsDialog />
    </div>
  );
};