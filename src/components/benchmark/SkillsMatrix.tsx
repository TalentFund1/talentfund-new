import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { SkillsMatrixPagination } from "./skills-matrix/SkillsMatrixPagination";
import { useSelectedSkills } from "../skills/context/SelectedSkillsContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { technicalSkills, softSkills, certificationSkills } from "@/components/skillsData";

const initialSkills = [
  {
    title: "React",
    subcategory: "Web Development",
    level: "advanced",
    growth: "15%",
    confidence: "high"
  },
  {
    title: "JavaScript",
    subcategory: "Programming Languages",
    level: "advanced",
    growth: "12%",
    confidence: "high"
  },
  {
    title: "TypeScript",
    subcategory: "Programming Languages",
    level: "advanced",
    growth: "14%",
    confidence: "high"
  },
  {
    title: "Node.js",
    subcategory: "Backend Development",
    level: "intermediate",
    growth: "10%",
    confidence: "medium"
  },
  {
    title: "Computer Architecture",
    subcategory: "Systems",
    level: "intermediate",
    growth: "8%",
    confidence: "medium"
  },
  {
    title: "SystemVerilog",
    subcategory: "Hardware Description",
    level: "beginner",
    growth: "5%",
    confidence: "low"
  },
  {
    title: "Docker",
    subcategory: "DevOps",
    level: "intermediate",
    growth: "15%",
    confidence: "medium"
  },
  {
    title: "Static Timing Analysis",
    subcategory: "Hardware Verification",
    level: "beginner",
    growth: "4%",
    confidence: "low"
  },
  {
    title: "Cadence Encounter",
    subcategory: "EDA Tools",
    level: "beginner",
    growth: "3%",
    confidence: "low"
  },
  {
    title: "Synopsys Primetime",
    subcategory: "EDA Tools",
    level: "beginner",
    growth: "4%",
    confidence: "low"
  },
  {
    title: "GraphQL",
    subcategory: "API Development",
    level: "intermediate",
    growth: "12%",
    confidence: "medium"
  },
  {
    title: "Internet of Things",
    subcategory: "Embedded Systems",
    level: "beginner",
    growth: "8%",
    confidence: "low"
  },
  {
    title: "Kubernetes",
    subcategory: "DevOps",
    level: "intermediate",
    growth: "18%",
    confidence: "medium"
  },
  {
    title: "AWS Lambda",
    subcategory: "Cloud Computing",
    level: "intermediate",
    growth: "16%",
    confidence: "medium"
  },
  {
    title: "Azure Functions",
    subcategory: "Cloud Computing",
    level: "beginner",
    growth: "14%",
    confidence: "low"
  },
  {
    title: "UI/UX Design Principles",
    subcategory: "Design",
    level: "advanced",
    growth: "10%",
    confidence: "high"
  },
  {
    title: "Agile Methodologies",
    subcategory: "Project Management",
    level: "advanced",
    growth: "8%",
    confidence: "high"
  },
  {
    title: "Project Management",
    subcategory: "Management",
    level: "intermediate",
    growth: "7%",
    confidence: "medium"
  },
  {
    title: "Problem Solving",
    subcategory: "Soft Skills",
    level: "advanced",
    growth: "5%",
    confidence: "high"
  },
  {
    title: "Scrum",
    subcategory: "Agile",
    level: "intermediate",
    growth: "6%",
    confidence: "medium"
  },
  {
    title: "Time Management",
    subcategory: "Soft Skills",
    level: "intermediate",
    growth: "4%",
    confidence: "medium"
  },
  {
    title: "Microsoft Excel",
    subcategory: "Office Tools",
    level: "intermediate",
    growth: "3%",
    confidence: "medium"
  },
  {
    title: "Cybersecurity License",
    subcategory: "Certifications",
    level: "advanced",
    growth: "20%",
    confidence: "high"
  }
];

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const { toast } = useToast();
  const { selectedSkills, setSelectedSkills } = useSelectedSkills();
  const { hasChanges, saveChanges, cancelChanges } = useSkillsMatrixStore();

  const handleSkillsChange = (newSelectedSkills: string[]) => {
    setSelectedSkills(newSelectedSkills);
    
    const allSkills = [...technicalSkills, ...softSkills, ...certificationSkills];
    const newSkills = newSelectedSkills.filter(
      skill => !allSkills.includes(skill)
    );
    
    if (newSkills.length > 0) {
      toast({
        title: "Skills Added",
        description: `Added ${newSkills.length} new skill${newSkills.length > 1 ? 's' : ''} to the matrix.`,
      });
    }
  };

  const filteredSkills = selectedSkills.length === 0
    ? filterSkillsByCategory(initialSkills, selectedCategory)
    : filterSkillsByCategory(
        initialSkills.filter(skill => 
          selectedSkills.some(selected => 
            skill.title.toLowerCase().includes(selected.toLowerCase())
          )
        ),
        selectedCategory
      );

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
          onSkillLevelChange={handleSkillsChange}
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
