import { Table, TableBody } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SkillsMatrixTableHeader } from "./SkillsMatrixTableHeader";
import { SkillsMatrixRow } from "./SkillsMatrixRow";
import { useState } from "react";
import { SearchFilter } from "@/components/market/SearchFilter";
import { useToast } from "@/components/ui/use-toast";

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
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const allSkillTitles = skills.map(skill => skill.title);

  const handleSkillsChange = (newSelectedSkills: string[]) => {
    setSelectedSkills(newSelectedSkills);
    
    // Check for new skills that need to be added
    const newSkills = newSelectedSkills.filter(
      skill => !allSkillTitles.includes(skill)
    );
    
    if (newSkills.length > 0) {
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
    }
  };

  const filteredSkills = selectedSkills.length === 0
    ? skills
    : skills.filter(skill => 
        selectedSkills.some(selected => 
          skill.title.toLowerCase().includes(selected.toLowerCase())
        )
      );

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
          <Select defaultValue="modify">
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Modify As" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modify">Modify As</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>

      <div className="border-t border-blue-200 pt-6">
        <div className="flex gap-4 mb-6 items-center justify-between">
          <div className="flex gap-2 flex-1">
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1">
              <SearchFilter
                label=""
                placeholder="Search skills..."
                items={allSkillTitles}
                selectedItems={selectedSkills}
                onItemsChange={handleSkillsChange}
                singleSelect={false}
              />
            </div>
          </div>
          
          <Button>Add Skill</Button>
        </div>
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
