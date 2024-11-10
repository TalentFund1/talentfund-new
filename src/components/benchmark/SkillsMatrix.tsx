import { Table, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkillsMatrixTableHeader } from "./SkillsMatrixTableHeader";
import { SkillsMatrixRow } from "./SkillsMatrixRow";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSkillsSearch } from "@/contexts/SkillsSearchContext";
import { SkillsMatrixHeader } from "./SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./SkillsMatrixFilters";

const initialSkills = [
  {
    title: "JavaScript",
    subcategory: "Programming Languages",
    level: "advanced",
    growth: "15%",
    confidence: "high"
  },
  {
    title: "Amazon Web Services",
    subcategory: "Web Services",
    level: "advanced",
    growth: "12%",
    confidence: "high"
  },
  {
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "advanced",
    growth: "19%",
    confidence: "high"
  },
  {
    title: "Conversational AI",
    subcategory: "Natural Language Processing (NLP)",
    level: "advanced",
    growth: "12%",
    confidence: "medium"
  },
  {
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "19%",
    confidence: "medium"
  },
  {
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "10%",
    confidence: "low"
  },
  {
    title: "Docker (Software)",
    subcategory: "Software Development Tools",
    level: "intermediate",
    growth: "0%",
    confidence: "n/a"
  },
  {
    title: "MLflow",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "beginner",
    growth: "11%",
    confidence: "n/a"
  },
  {
    title: "Natural Language Understanding",
    subcategory: "Natural Language Processing (NLP)",
    level: "unspecified",
    growth: "15%",
    confidence: "n/a"
  },
  {
    title: "Computer Vision",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "unspecified",
    growth: "18%",
    confidence: "n/a"
  },
  {
    title: "Kubernetes",
    subcategory: "Software Development Tools",
    level: "unspecified",
    growth: "14%",
    confidence: "n/a"
  }
];

export const SkillsMatrix = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { selectedSkills } = useSkillsSearch();
  const { toast } = useToast();

  const allSkillTitles = skills.map(skill => skill.title);

  // Check for new skills that need to be added
  const addNewSkills = (newSkills: string[]) => {
    const skillsToAdd = newSkills.map(skillName => ({
      title: skillName,
      subcategory: "Unspecified",
      level: "unspecified",
      growth: "0%",
      confidence: "n/a"
    }));
    
    setSkills(prev => [...prev, ...skillsToAdd]);
    
    toast({
      title: "Skills Added",
      description: `Added ${newSkills.length} new skill${newSkills.length > 1 ? 's' : ''} to the matrix.`,
    });
  };

  // Check for new skills whenever selectedSkills changes
  const newSkills = selectedSkills.filter(
    skill => !allSkillTitles.includes(skill)
  );
  
  if (newSkills.length > 0) {
    addNewSkills(newSkills);
  }

  const filteredSkills = selectedSkills.length === 0
    ? skills
    : skills.filter(skill => 
        selectedSkills.some(selected => 
          skill.title.toLowerCase().includes(selected.toLowerCase())
        )
      );

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <SkillsMatrixHeader />

      <div className="border-t border-blue-200 pt-6">
        <SkillsMatrixFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <div className="rounded-lg border border-blue-200 overflow-x-auto">
        <Table>
          <SkillsMatrixTableHeader />
          <TableBody>
            {filteredSkills.map((skill) => (
              <SkillsMatrixRow key={skill.title} skill={skill} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <Select defaultValue="10">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="10 rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-muted-foreground">
            1-{filteredSkills.length} of {filteredSkills.length}
          </span>
          <Button variant="outline" size="icon" className="w-8 h-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
