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
  const [skillType, setSkillType] = useState("unknown");
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
      confidence: skillType
    });

    toast({
      title: "Success",
      description: "Skill added successfully",
    });

    setOpen(false);
    setSelectedSkill("");
    setLevel("unspecified");
    setSkillType("unknown");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white hover:bg-gray-50">
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px] shadow-lg border-border">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-primary">Add New Skill</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Add a new skill to your skills matrix. Select from available skills.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Skill Name</Label>
            <div className="bg-white">
              <ComboboxDemo 
                skills={skills.map(s => s.title)}
                selected={selectedSkill}
                onSelect={setSelectedSkill}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skillType" className="text-sm font-medium">Skill Type</Label>
            <Select value={skillType} onValueChange={setSkillType}>
              <SelectTrigger className="w-full bg-white border-input hover:bg-gray-50">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="unknown">Unknown</SelectItem>
                <SelectItem value="skill goal">Skill Goal</SelectItem>
                <SelectItem value="not interested">Not Interested</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level" className="text-sm font-medium">Initial Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full bg-white border-input hover:bg-gray-50">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="unspecified">Unspecified</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedSkill && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Subcategory</Label>
              <Input
                value={skills.find(s => s.title === selectedSkill)?.subcategory || ""}
                disabled
                className="bg-gray-50 text-gray-500 border-input"
              />
            </div>
          )}
          <div className="pt-4 flex justify-end">
            <Button 
              type="submit" 
              className="bg-[#1F2144] hover:bg-[#1F2144]/90 text-white"
            >
              Add Skill
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};