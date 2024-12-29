import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { UnifiedSkill } from "../types/SkillTypes";
import { RoleSkillData } from "../types/roleSkillTypes";
import { generateId } from "@/lib/utils";
import { useRoleSkillsStore } from "../store/roleSkillsStore";

export const AddSkillToProfileDialog = () => {
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const { toast } = useToast();
  const roleSkillsStore = useRoleSkillsStore();

  const handleAddSkill = (skill: UnifiedSkill) => {
    const roleSkillData: RoleSkillData = {
      roleId: generateId(),
      title: skill.title,
      track: "Professional",
      specialized: [{
        ...skill,
        minimumLevel: 'beginner',
        requirementLevel: 'required',
        metrics: {
          growth: skill.growth,
          salary: skill.salary,
          confidence: skill.confidence,
          skillScore: skill.skillScore || 0
        }
      }],
      common: [],
      certifications: [],
      skills: []
    };

    roleSkillsStore.initializeRoleSkills(roleSkillData.roleId);
    setOpen(false);
    setSkillName("");

    toast({
      title: "Skill Added",
      description: `${skill.title} has been added to the profile.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Skill</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Skill to Profile</DialogTitle>
          <DialogDescription>
            Enter the name of the skill you want to add to this profile.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skillName" className="text-right">
              Skill Name
            </Label>
            <Input
              id="skillName"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="col-span-3"
              placeholder="Enter skill name"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setSkillName("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (skillName.trim()) {
                handleAddSkill({
                  id: generateId(),
                  title: skillName.trim(),
                  subcategory: "General",
                  category: "specialized",
                  businessCategory: "Technical Skills",
                  weight: "technical",
                  level: "beginner",
                  growth: "0%",
                  salary: "market",
                  confidence: "medium",
                  skillScore: 0,
                  benchmarks: {
                    B: false,
                    R: false,
                    M: false,
                    O: false
                  }
                });
              }
            }}
          >
            Add Skill
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};