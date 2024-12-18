import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { useToast } from "@/hooks/use-toast";
import { technicalSkills, softSkills } from '@/components/skillsData';

export const AddSkillsDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { toast } = useToast();

  const allSkills = [...technicalSkills, ...softSkills];

  const handleSelectSkill = (skill: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill);
      }
      return [...prev, skill];
    });
  };

  const handleAddSkills = () => {
    const newSkills = new Set(toggledSkills);
    selectedSkills.forEach(skill => newSkills.add(skill));
    setToggledSkills(newSkills);
    
    toast({
      title: "Skills Added",
      description: `Added ${selectedSkills.length} skill${selectedSkills.length === 1 ? '' : 's'} to your profile.`,
    });
    
    setSelectedSkills([]);
    setOpen(false);
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
          <DialogTitle>Add Skills to Profile</DialogTitle>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search skills..." />
          <CommandEmpty>No skills found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {allSkills.map((skill) => (
              <CommandItem
                key={skill}
                value={skill}
                onSelect={() => handleSelectSkill(skill)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className={`w-4 h-4 rounded border ${
                  selectedSkills.includes(skill) ? 'bg-primary border-primary' : 'border-input'
                }`}>
                  {selectedSkills.includes(skill) && (
                    <svg
                      className="h-4 w-4 text-primary-foreground"
                      fill="none"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                {skill}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddSkills}
            disabled={selectedSkills.length === 0}
          >
            Add Selected Skills
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};