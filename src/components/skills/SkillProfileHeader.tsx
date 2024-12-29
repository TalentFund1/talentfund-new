import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AddSkillToProfileDialog } from "./dialog/AddSkillToProfileDialog";
import { useParams } from "react-router-dom";
import { roleSkills } from "./data/roleSkills";

interface SkillProfileHeaderProps {
  skillCount?: number;
  jobTitle?: string;
}

export const SkillProfileHeader = ({ skillCount = 0, jobTitle }: SkillProfileHeaderProps) => {
  const { id } = useParams();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {jobTitle ? `${jobTitle} Skills Profile` : 'Skill Profile'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Map and manage skills for this role
          </p>
        </div>
        <AddSkillToProfileDialog />
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium leading-none">Total Skills</p>
            <p className="text-2xl font-bold">{skillCount}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};