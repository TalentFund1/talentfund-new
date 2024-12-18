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
import { useState, useMemo } from "react";

interface AddSkillDropdownProps {
  onAddSkill: (skillTitle: string) => void;
  existingSkills: Set<string>;
}

export const AddSkillDropdown = ({ onAddSkill, existingSkills }: AddSkillDropdownProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  // Use useMemo to ensure we don't recreate the skills array on every render
  // and add proper error handling
  const allSkills = useMemo(() => {
    try {
      const skills = getAllSkills();
      console.log('Loading skills for dropdown:', { count: skills?.length || 0 });
      
      if (!skills || !Array.isArray(skills)) {
        console.warn('Invalid skills data returned:', skills);
        return [];
      }
      
      return skills;
    } catch (error) {
      console.error('Error loading skills:', error);
      return [];
    }
  }, []);

  const handleSelectSkill = (skillTitle: string) => {
    if (!skillTitle) {
      console.warn('No skill title provided');
      return;
    }

    if (existingSkills.has(skillTitle)) {
      console.log('Skill already exists:', skillTitle);
      toast({
        title: "Skill already added",
        description: `${skillTitle} is already in your skills list.`,
        variant: "destructive",
      });
      return;
    }

    console.log('Adding new skill:', skillTitle);
    onAddSkill(skillTitle);
    setOpen(false);
    toast({
      title: "Skill added",
      description: `${skillTitle} has been added to your skills.`,
    });
  };

  // Early return if no skills are available
  if (!allSkills || allSkills.length === 0) {
    console.warn('No skills available for dropdown');
    return (
      <Button className="bg-[#1F2144] hover:bg-[#1F2144]/90" disabled>
        <div className="w-5 h-5 rounded-full border-[1.75px] border-white flex items-center justify-center">
          <Plus className="h-3 w-3 stroke-[2]" />
        </div>
        <span className="ml-2 text-sm font-medium">Add Skill</span>
      </Button>
    );
  }

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