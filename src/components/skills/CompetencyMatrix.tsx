import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const skillsData = {
  specialized: [
    { name: "Amazon Web Services", level: "Advanced", required: "Required" },
    { name: "Artificial Intelligence", level: "Advanced", required: "Required" },
    { name: "Deep Learning", level: "Intermediate", required: "Required" },
    { name: "Machine Learning", level: "Advanced", required: "Required" },
    { name: "Data Science", level: "Advanced", required: "Required" },
  ],
  common: [
    { name: "Communication", level: "Intermediate", required: "Required" },
    { name: "Problem Solving", level: "Advanced", required: "Required" },
    { name: "Team Collaboration", level: "Intermediate", required: "Preferred" },
  ],
  certification: [
    { name: "AWS Certified Solutions Architect", level: "Advanced", required: "Required" },
    { name: "Google Cloud Professional", level: "Intermediate", required: "Preferred" },
  ]
};

const skillCategories = [
  { id: "specialized", name: "Specialized Skills", count: 15 },
  { id: "common", name: "Common Skills", count: 10 },
  { id: "certification", name: "Certification", count: 3 }
];

export const CompetencyMatrix = () => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("specialized");
  const { toast } = useToast();

  const handleLevelSelect = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    toast({
      title: `Viewing ${skillCategories.find(cat => cat.id === categoryId)?.name}`,
      duration: 2000
    });
  };

  const currentSkills = skillsData[selectedCategory as keyof typeof skillsData] || [];

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Competency Levels</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={selectedLevels.length.toString()}>
            <SelectTrigger className="w-[120px] bg-background">
              <SelectValue placeholder={`${selectedLevels.length} Selected`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={selectedLevels.length.toString()}>
                {selectedLevels.length} Selected
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="text-primary p-0 h-auto flex items-center gap-2 hover:bg-transparent hover:text-primary-accent"
        >
          <Plus className="h-4 w-4" /> Add Level
        </Button>

        <div className="space-y-2">
          {["P3", "P4"].map((level) => (
            <div key={level} className="flex items-center gap-3 bg-background/40 p-2 rounded-lg hover:bg-background/60 transition-colors">
              <Checkbox 
                className="rounded-sm"
                checked={selectedLevels.includes(`AI Engineer ${level}`)}
                onCheckedChange={() => handleLevelSelect(`AI Engineer ${level}`)}
              />
              <span className="text-sm font-medium">AI Engineer</span>
              <Select defaultValue={level}>
                <SelectTrigger className="w-[80px] bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={level}>{level}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4 border-border" />

      <div>
        {/* Skill Categories Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Skill Categories</h3>
          <div className="grid grid-cols-3 gap-4">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedCategory === category.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{category.count} skills</div>
              </button>
            ))}
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-3 bg-[#F7F9FF] border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Skills ({currentSkills.length})
              </span>
            </div>
            <div className="text-sm font-medium text-foreground">Skill Level</div>
            <div className="text-sm font-medium text-foreground">Required</div>
          </div>

          {currentSkills.map((skill) => (
            <div 
              key={skill.name} 
              className="grid grid-cols-3 gap-4 p-3 hover:bg-background/40 transition-colors border-b border-border last:border-b-0"
            >
              <Link 
                to={`/skills/${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-primary hover:text-primary-accent transition-colors cursor-pointer"
              >
                {skill.name}
              </Link>
              <Select defaultValue={skill.level.toLowerCase()}>
                <SelectTrigger className="bg-white border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="unspecified">Unspecified</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={skill.required.toLowerCase()}>
                <SelectTrigger className="bg-white border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="required">Required</SelectItem>
                  <SelectItem value="preferred">Preferred</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};