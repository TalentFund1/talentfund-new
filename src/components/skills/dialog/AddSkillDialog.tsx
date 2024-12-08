import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchFilter } from "@/components/market/SearchFilter";
import { technicalSkills, softSkills } from '@/components/skillsData';
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AddSkillDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillType, setSkillType] = useState<'specialized' | 'common' | 'certification'>('specialized');
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const allSkills = [...technicalSkills, ...softSkills];

  const handleAddSkills = () => {
    console.log('Adding skills:', selectedSkills);
    console.log('Skill type:', skillType);
    console.log('Current toggled skills before addition:', Array.from(toggledSkills));
    
    const newToggledSkills = new Set(toggledSkills);
    
    // Add each skill with its type
    selectedSkills.forEach(skill => {
      console.log(`Adding skill ${skill} as ${skillType}`);
      newToggledSkills.add(skill);
    });
    
    console.log('New toggled skills after addition:', Array.from(newToggledSkills));
    setToggledSkills(newToggledSkills);

    // Count skills by type for the toast message
    const addedCount = selectedSkills.length;

    toast({
      title: "Skills Added",
      description: `Added ${addedCount} ${skillType} skill${addedCount === 1 ? '' : 's'} to the profile.`,
    });

    setSelectedSkills([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Skills to Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Select value={skillType} onValueChange={(value: 'specialized' | 'common' | 'certification') => setSkillType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select skill type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>

            <SearchFilter
              label=""
              placeholder="Search skills..."
              items={allSkills}
              selectedItems={selectedSkills}
              onItemsChange={setSelectedSkills}
              singleSelect={false}
            />
          </div>

          <div className="flex justify-end gap-2">
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
            >
              Add Selected Skills
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};