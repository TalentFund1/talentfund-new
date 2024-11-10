import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { SkillsMatrixPagination } from "./skills-matrix/SkillsMatrixPagination";
import { useSelectedSkills } from "../skills/context/SelectedSkillsContext";

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
  const [originalSkills, setOriginalSkills] = useState(initialSkills);
  const [hasChanges, setHasChanges] = useState(false);
  const { selectedSkills, setSelectedSkills } = useSelectedSkills();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { toast } = useToast();

  const handleSkillLevelChange = (skillTitle: string, newLevel: string, requirement: string) => {
    const updatedSkills = skills.map(skill => 
      skill.title === skillTitle ? { ...skill, level: newLevel, requirement } : skill
    );
    setSkills(updatedSkills);
    setHasChanges(true);
  };

  const handleSave = () => {
    setOriginalSkills(skills);
    setHasChanges(false);
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setSkills(originalSkills);
    setHasChanges(false);
    toast({
      title: "Changes Cancelled",
      description: "Your changes have been discarded.",
    });
  };

  const filteredSkills = selectedSkills.length === 0
    ? skills
    : skills.filter(skill => 
        selectedSkills.some(selected => 
          skill.title.toLowerCase().includes(selected.toLowerCase())
        )
      );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setPage(1);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedSkills = filteredSkills.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredSkills.length / rowsPerPage);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <SkillsMatrixHeader 
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <Separator className="my-4" />
        
        <SkillsMatrixFilters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <SkillsMatrixTable 
          filteredSkills={paginatedSkills} 
          onSkillLevelChange={handleSkillLevelChange}
        />
        
        <SkillsMatrixPagination 
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          totalSkills={filteredSkills.length}
          currentPage={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};
