import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllSkills } from "./data/skills/allSkills";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface AddSkillDropdownProps {
  onAddSkill: (skillTitle: string) => void;
  existingSkills: Set<string>;
}

export const AddSkillDropdown = ({ onAddSkill, existingSkills }: AddSkillDropdownProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const allSkills = getAllSkills();

  const handleSelectSkill = (skillTitle: string) => {
    if (existingSkills.has(skillTitle)) {
      toast({
        title: "Skill already added",
        description: `${skillTitle} is already in your skills list.`,
        variant: "destructive",
      });
      return;
    }

    onAddSkill(skillTitle);
    setOpen(false);
    toast({
      title: "Skill added",
      description: `${skillTitle} has been added to your skills.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1F2144] hover:bg-[#1F2144]/90">
          <div className="w-5 h-5 rounded-full border-[1.75px] border-white flex items-center justify-center">
            <Plus className="h-3 w-3 stroke-[2]" />
          </div>
          <span className="ml-2 text-sm font-medium">Add Skill</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search skills..." />
          <CommandEmpty>No skills found.</CommandEmpty>
          <ScrollArea className="h-72">
            <CommandGroup>
              {allSkills.map((skill) => (
                <CommandItem
                  key={skill.id}
                  value={skill.title}
                  onSelect={() => handleSelectSkill(skill.title)}
                  className="cursor-pointer"
                >
                  <span>{skill.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </DialogContent>
    </Dialog>
  );
};