import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { technicalSkills, softSkills } from "../skillsData";

export const AddSkillsDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { toast } = useToast();

  const allSkills = [...technicalSkills, ...softSkills];

  const handleSelectSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAddSkills = () => {
    const newToggledSkills = new Set(toggledSkills);
    selectedSkills.forEach(skill => newToggledSkills.add(skill));
    setToggledSkills(newToggledSkills);
    
    toast({
      title: "Skills Added",
      description: `Added ${selectedSkills.length} skill${selectedSkills.length === 1 ? '' : 's'} to profile.`,
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
          <div className="flex items-center justify-between">
            <DialogTitle>Add Skills to Profile</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search skills..." />
            <CommandEmpty>No skills found.</CommandEmpty>
            <ScrollArea className="h-[200px]">
              <CommandGroup>
                {allSkills.map((skill) => (
                  <CommandItem
                    key={skill}
                    onSelect={() => handleSelectSkill(skill)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      className={`w-4 h-4 rounded border ${
                        selectedSkills.includes(skill)
                          ? "bg-primary border-primary"
                          : "border-input"
                      }`}
                    >
                      {selectedSkills.includes(skill) && (
                        <svg
                          className="h-4 w-4 text-primary-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span>{skill}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedSkills([]);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSkills}
              disabled={selectedSkills.length === 0}
              className="bg-[#1F2144] hover:bg-[#1F2144]/90"
            >
              Add Selected Skills
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};