import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { centralizedSkills, getUnifiedSkillData } from "../data/centralSkillsDatabase";
import { useCompetencyStore } from "@/components/benchmark/CompetencyState";

export const AddSkillDialog = () => {
  const { toast } = useToast();
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { setSkillState } = useCompetencyStore();

  const handleAddSkill = (skillTitle: string) => {
    console.log('Adding skill:', skillTitle);
    
    // Get unified skill data from the database
    const skillData = getUnifiedSkillData(skillTitle);
    
    // Add to toggled skills
    const newToggledSkills = new Set(toggledSkills);
    newToggledSkills.add(skillTitle);
    setToggledSkills(newToggledSkills);
    
    // Initialize with default competency values
    setSkillState(
      skillTitle,
      'unspecified',  // Default level
      'p4',           // Default level key
      'preferred'     // Default requirement
    );

    toast({
      title: "Skill Added",
      description: `${skillTitle} has been added to your skills.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Skills</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {centralizedSkills.map((skill) => (
              <div
                key={skill.title}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium">{skill.title}</h4>
                  <p className="text-sm text-muted-foreground">{skill.subcategory}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSkill(skill.title)}
                  disabled={toggledSkills.has(skill.title)}
                >
                  {toggledSkills.has(skill.title) ? 'Added' : 'Add'}
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};