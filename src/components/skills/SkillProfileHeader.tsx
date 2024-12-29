import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddSkillToProfileDialog } from "./dialog/AddSkillToProfileDialog";
import { useParams } from "react-router-dom";
import { roleSkills } from "./data/roleSkills";
import { RoleSkillData } from "./types/sharedSkillTypes";

interface SkillProfileHeaderProps {
  skillCount: number;
}

export const SkillMappingHeader = ({ skillCount }: SkillProfileHeaderProps) => {
  const { id } = useParams();
  const currentRole = roleSkills[id as keyof typeof roleSkills];

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          {currentRole?.title || "Role Skills"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Map and manage skills for this role profile
        </p>
      </div>
      <AddSkillToProfileDialog />
    </div>
  );
};