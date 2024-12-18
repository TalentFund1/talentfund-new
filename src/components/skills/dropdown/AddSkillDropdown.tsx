import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getAllSkills } from "../data/skillsData";

export const AddSkillDropdown = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredSkills = skills.filter(skill => 
    skill.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Button 
        onClick={() => setOpen(true)}
        className="bg-[#1F2144] hover:bg-[#1F2144]/90 flex items-center gap-2"
      >
        <div className="w-5 h-5 rounded-full border-[1.75px] border-white flex items-center justify-center">
          <Plus className="h-3 w-3 stroke-[2]" />
        </div>
        <span className="text-sm font-medium">Add Skill</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">Add Skills to Profile</DialogTitle>
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

          <div className="space-y-6 py-4">
            <div className="relative">
              <Input
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 border-[#E5DEFF] focus:border-[#8073EC] focus:ring-0 rounded-lg pl-4 h-12"
              />
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => handleSkillSelect(skill.title)}
                >
                  <span className="text-sm font-medium">{skill.title}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setOpen(false)}
                className="bg-[#8073EC] hover:bg-[#8073EC]/90 px-6"
              >
                Add Selected Skills
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};