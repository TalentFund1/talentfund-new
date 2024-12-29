import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditSkillProfileForm } from "./EditSkillProfileForm";
import { RoleSkillData } from "../types";

export const SkillProfileHeader = ({ profile }: { profile: RoleSkillData }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{profile.title}</h1>
          <p className="text-muted-foreground">{profile.function}</p>
        </div>
        <Button onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      </div>

      {isEditing && (
        <EditSkillProfileForm 
          profile={profile}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};
