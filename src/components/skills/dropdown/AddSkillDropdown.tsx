import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useToast } from "@/components/ui/use-toast";
import { getAllSkills } from "../data/skillsData";

export const AddSkillDropdown = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const skills = getAllSkills();

  console.log('Available skills for dropdown:', skills.length);

  const handleSkillSelect = (skill: string) => {
    console.log('Selected skill:', skill);
    toast({
      title: "Skill Added",
      description: `${skill} has been added to your skills.`,
    });
    setOpen(false);
  };

  return (
    <div>
      <Button 
        onClick={() => setOpen(true)}
        className="bg-[#1F2144] hover:bg-[#1F2144]/90"
      >
        <div className="w-5 h-5 rounded-full border-[1.75px] border-white flex items-center justify-center">
          <Plus className="h-3 w-3 stroke-[2]" />
        </div>
        <span className="ml-2 text-sm font-medium">Add Skill</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search skills..." />
          <CommandList>
            <CommandEmpty>No skills found.</CommandEmpty>
            <CommandGroup heading="Available Skills">
              {skills.map((skill) => (
                <CommandItem
                  key={skill.id}
                  value={skill.title}
                  onSelect={() => handleSkillSelect(skill.title)}
                  className="cursor-pointer"
                >
                  {skill.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};