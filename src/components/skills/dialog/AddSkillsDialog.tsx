import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { Switch } from "@/components/ui/switch";
import { technicalSkills, softSkills } from '@/components/skillsData';

interface AddSkillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddSkillsDialog = ({ open, onOpenChange }: AddSkillsDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { toast } = useToast();

  const allSkills = [...technicalSkills, ...softSkills];
  
  const filteredSkills = allSkills.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleSkill = (skill: string) => {
    const newSelectedSkills = new Set(selectedSkills);
    if (newSelectedSkills.has(skill)) {
      newSelectedSkills.delete(skill);
    } else {
      newSelectedSkills.add(skill);
    }
    setSelectedSkills(newSelectedSkills);
  };

  const handleAddSkills = () => {
    const newToggledSkills = new Set(toggledSkills);
    selectedSkills.forEach(skill => newToggledSkills.add(skill));
    setToggledSkills(newToggledSkills);
    
    toast({
      title: "Skills Added",
      description: `Added ${selectedSkills.size} skill${selectedSkills.size > 1 ? 's' : ''} to your profile.`,
    });
    
    setSelectedSkills(new Set());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Skills to Profile</DialogTitle>
        </DialogHeader>
        
        <div className="relative mt-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search skills..."
            className="w-full rounded-md border border-input pl-9 pr-4 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2">
          {filteredSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg"
            >
              <span className="text-sm">{skill}</span>
              <Switch
                checked={selectedSkills.has(skill)}
                onCheckedChange={() => handleToggleSkill(skill)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedSkills(new Set());
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddSkills}
            disabled={selectedSkills.size === 0}
          >
            Add Selected Skills
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};