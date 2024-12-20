import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface SkillsSectionProps {
  selectedSkills: string[];
  onSkillAdd: (skill: string) => void;
  onSkillRemove: (skill: string) => void;
  roleTitle: string;
}

export const SkillsSection = ({ 
  selectedSkills,
  onSkillAdd,
  onSkillRemove,
  roleTitle
}: SkillsSectionProps) => {
  // These would typically come from an API or database
  const matchingSkills = [
    "SwiftUI",
    "Objective-C",
    "MVC",
    "Swift",
    "UIKit",
    "Core Data"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-primary">3. Add Project Skills for each Role</h2>
        <p className="text-sm text-primary/60">Add the skills needed for each role in this project.</p>
      </div>

      <h3 className="text-base font-medium text-primary mt-6">{roleTitle}</h3>

      <div className="relative">
        <Input 
          className="pl-4 border-border focus:border-primary-accent focus:ring-1 focus:ring-primary-accent bg-[#F7F9FF]"
          placeholder="Search skills..."
        />
      </div>

      {selectedSkills.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-primary">Selected Skills</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge 
                key={skill}
                variant="outline"
                className="bg-[#F7F9FF] text-primary border-[#E5E7EB] hover:bg-[#F7F9FF]/80 flex items-center gap-1.5 px-3 py-1.5 h-8 text-sm rounded-md"
              >
                {skill}
                <X 
                  className="h-3.5 w-3.5 cursor-pointer hover:text-primary-accent" 
                  onClick={() => onSkillRemove(skill)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-primary">Matching Skills</h3>
        <div className="flex flex-wrap gap-2">
          {matchingSkills.map((skill) => (
            <Button 
              key={skill}
              variant="outline"
              className="bg-[#F7F9FF] hover:bg-[#F7F9FF]/80 text-primary border-[#E5E7EB] flex items-center gap-1.5 px-3 py-1.5 h-8 font-normal text-sm rounded-md"
              onClick={() => onSkillAdd(skill)}
            >
              <Plus className="h-3.5 w-3.5" />
              {skill}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};