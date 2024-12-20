import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectSkillsProps {
  selectedRoles: string[];
  roleSkills: Record<string, string[]>;
  onChange: (skills: Record<string, string[]>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProjectSkills = ({ 
  selectedRoles, 
  roleSkills, 
  onChange, 
  onNext, 
  onBack 
}: ProjectSkillsProps) => {
  const [currentRole, setCurrentRole] = useState(selectedRoles[0]);

  const commonSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "Git",
    "AWS",
    "Docker"
  ];

  const handleSkillToggle = (skill: string) => {
    onChange({
      ...roleSkills,
      [currentRole]: roleSkills[currentRole]?.includes(skill)
        ? roleSkills[currentRole].filter(s => s !== skill)
        : [...(roleSkills[currentRole] || []), skill]
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">3. Select Required Skills</h2>
        
        <div className="flex gap-2">
          {selectedRoles.map(role => (
            <Button
              key={role}
              variant={currentRole === role ? "default" : "outline"}
              onClick={() => setCurrentRole(role)}
            >
              {role}
            </Button>
          ))}
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-4">Skills for {currentRole}</h3>
          
          {roleSkills[currentRole]?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm text-muted-foreground mb-2">Selected Skills</h4>
              <div className="flex flex-wrap gap-2">
                {roleSkills[currentRole].map(skill => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm text-muted-foreground mb-2">Available Skills</h4>
            <div className="flex flex-wrap gap-2">
              {commonSkills
                .filter(skill => !roleSkills[currentRole]?.includes(skill))
                .map(skill => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};