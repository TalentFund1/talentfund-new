import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { SkillsMatrixPagination } from "./skills-matrix/SkillsMatrixPagination";
import { useSelectedSkills } from "../skills/context/SelectedSkillsContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { skillsData, convertToMatrixFormat } from "../skills/data/sharedSkillsData";

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { toast } = useToast();
  const { selectedSkills, setSelectedSkills } = useSelectedSkills();
  const { hasChanges, saveChanges, cancelChanges } = useSkillsMatrixStore();

  const handleSkillsChange = (newSelectedSkills: string[]) => {
    setSelectedSkills(newSelectedSkills);
    toast({
      title: "Skills Updated",
      description: "Your skills have been updated successfully.",
    });
  };

  const handleSave = () => {
    saveChanges();
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    cancelChanges();
    toast({
      title: "Changes Cancelled",
      description: "Your changes have been discarded.",
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setPage(1);
  };

  const filteredSkills = selectedSkills.length === 0
    ? skillsData
    : skillsData.filter(skill => 
        selectedSkills.some(selected => 
          skill.name.toLowerCase().includes(selected.toLowerCase())
        )
      );

  const matrixSkills = filteredSkills
    .filter(skill => 
      selectedCategory === "all" || 
      (selectedCategory === "certification" && skill.category === "certification") ||
      (selectedCategory === "specialized" && skill.category === "specialized") ||
      (selectedCategory === "common" && skill.category === "common")
    )
    .map(convertToMatrixFormat);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedSkills = matrixSkills.slice(startIndex, endIndex);
  const totalPages = Math.ceil(matrixSkills.length / rowsPerPage);

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
          totalSkills={matrixSkills.length}
          currentPage={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};