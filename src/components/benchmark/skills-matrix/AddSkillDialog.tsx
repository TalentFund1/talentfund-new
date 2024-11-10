import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { skills } from "@/components/skills/data/skillsData";
import { ComboboxDemo } from "./SkillCombobox";

interface AddSkillDialogProps {
  onSkillAdd: (skill: { title: string; subcategory: string; level: string; growth: string; confidence: string; }) => void;
}

export const AddSkillDialog = ({ onSkillAdd }: AddSkillDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [level, setLevel] = useState("unspecified");
  const [skillType, setSkillType] = useState("current"); // New state for skill type
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSkill) {
      toast({
        title: "Error",
        description: "Please select a skill",
        variant: "destructive",
      });
      return;
    }

    const skillData = skills.find(s => s.title === selectedSkill);
    
    if (!skillData) {
      toast({
        title: "Error",
        description: "Selected skill not found in database",
        variant: "destructive",
      });
      return;
    }

    onSkillAdd({
      title: selectedSkill,
      subcategory: skillData.subcategory,
      level,
      growth: "0%",
      confidence: skillType === "goal" ? "goal" : "n/a"
    });

    toast({
      title: "Success",
      description: "Skill added successfully",
    });

    setOpen(false);
    setSelectedSkill("");
    setLevel("unspecified");
    setSkillType("current");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Skill</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>
            Add a new skill to your skills matrix. Select from available skills.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Skill Name</Label>
            <ComboboxDemo 
              skills={skills.map(s => s.title)}
              selected={selectedSkill}
              onSelect={setSelectedSkill}
            />
          </div>
          {selectedSkill && (
            <div className="space-y-2">
              <Label>Subcategory</Label>
              <Input
                value={skills.find(s => s.title === selectedSkill)?.subcategory || ""}
                disabled
                className="bg-gray-100"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="skillType">Skill Type</Label>
            <Select value={skillType} onValueChange={setSkillType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Skill</SelectItem>
                <SelectItem value="goal">Skill Goal/Interest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Initial Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unspecified">Unspecified</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-4 flex justify-end">
            <Button type="submit">Add Skill</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};