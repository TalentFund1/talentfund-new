import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { useToast } from "@/hooks/use-toast";
import { getAllSkills } from '../data/skillsData';
import { UnifiedSkill } from "../types/SkillTypes";

export const AddSkillsDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { toast } = useToast();

  // Safely initialize skills with proper type checking
  const skills = getAllSkills();
  const allSkills: UnifiedSkill[] = Array.isArray(skills) ? skills : [];

  console.log('AddSkillsDialog rendered with:', {
    selectedSkillsCount: selectedSkills.length,
    toggledSkillsCount: toggledSkills.size,
    availableSkillsCount: allSkills.length,
    skills: allSkills
  });

  const handleSelectSkill = (skillTitle: string) => {
    console.log('Selecting skill:', skillTitle);
    setSelectedSkills(prev => {
      const isSelected = prev.includes(skillTitle);
      return isSelected ? prev.filter(s => s !== skillTitle) : [...prev, skillTitle];
    });
  };

  const handleAddSkills = () => {
    if (!selectedSkills.length) {
      console.log('No skills selected, skipping add');
      return;
    }

    console.log('Adding skills:', selectedSkills);
    const newSkills = new Set(toggledSkills);
    selectedSkills.forEach(skill => newSkills.add(skill));
    setToggledSkills(newSkills);

    toast({
      title: "Skills Added",
      description: `Successfully added ${selectedSkills.length} skills to your profile.`
    });

    setOpen(false);
    setSelectedSkills([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Skills</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Skills to Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Command>
            <CommandInput placeholder="Search skills..." />
            <CommandEmpty>No skills found.</CommandEmpty>
            <CommandGroup>
              {allSkills.map((skill) => (
                <CommandItem
                  key={skill.id}
                  value={skill.title}
                  onSelect={() => handleSelectSkill(skill.title)}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill.title)}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span>{skill.title}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSkills} disabled={selectedSkills.length === 0}>
              Add Selected Skills
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};