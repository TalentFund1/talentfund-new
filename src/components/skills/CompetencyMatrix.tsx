import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { CategorySection } from "./competency/CategorySection";

const skillCategories = [
  { id: "all", name: "All Categories", count: 28 },
  { id: "specialized", name: "Specialized Skills", count: 15 },
  { id: "common", name: "Common Skills", count: 10 },
  { id: "certification", name: "Certification", count: 3 }
];

export const CompetencyMatrix = () => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [track, setTrack] = useState<"Technical" | "Managerial">("Technical");
  const { toggledSkills } = useToggledSkills();

  const handleLevelSelect = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleTrackChange = (newTrack: "Technical" | "Managerial") => {
    setTrack(newTrack);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const skillsArray = Array.from(toggledSkills);

  return (
    <Card className="space-y-8 p-6 bg-white shadow-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">Skills Graph</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={() => {/* existing cancel logic */}}
            >
              Cancel
            </Button>
            <Button 
              className="text-sm bg-primary hover:bg-primary/90"
              onClick={() => {/* existing save logic */}}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">AI Engineer</h3>
            <RadioGroup 
              value={track} 
              onValueChange={handleTrackChange}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Technical" id="technical" />
                <Label 
                  htmlFor="technical"
                  className="text-sm font-medium cursor-pointer"
                >
                  Technical
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Managerial" id="managerial" />
                <Label 
                  htmlFor="managerial"
                  className="text-sm font-medium cursor-pointer"
                >
                  Managerial
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-4 gap-4">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                rounded-lg p-4 transition-all duration-200
                ${selectedCategory === category.id
                  ? 'bg-primary/5 border-2 border-primary shadow-sm'
                  : 'bg-white border border-border hover:border-primary/50 hover:shadow-sm'
                }
              `}
            >
              <div className="flex flex-col items-start">
                <span className={`
                  text-sm font-semibold mb-1
                  ${selectedCategory === category.id
                    ? 'text-primary'
                    : 'text-foreground'
                  }
                `}>
                  {category.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {category.count} skills
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {Array.from(toggledSkills).map((skill) => (
            <div 
              key={skill}
              className="p-4 border border-border rounded-lg bg-white hover:border-primary/50 transition-colors"
            >
              <span className="text-sm text-foreground">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};