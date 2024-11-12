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
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useParams } from "react-router-dom";

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const { toast } = useToast();
  const { selectedSkills } = useSelectedSkills();
  const { hasChanges, saveChanges, cancelChanges } = useSkillsMatrixStore();
  const { id } = useParams<{ id: string }>();

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

  // Get employee-specific skills
  const employeeSkills = getEmployeeSkills(id || "");

  // Create a Set of unique skill titles
  const uniqueSkillTitles = new Set(employeeSkills.map(skill => skill.title));

  // Filter skills based on search and category, ensuring uniqueness
  const filteredSkills = selectedSkills.length === 0
    ? filterSkillsByCategory(
        employeeSkills.filter(skill => uniqueSkillTitles.has(skill.title)),
        selectedCategory
      )
    : filterSkillsByCategory(
        employeeSkills.filter(skill => 
          uniqueSkillTitles.has(skill.title) &&
          selectedSkills.some(selected => 
            skill.title.toLowerCase().includes(selected.toLowerCase())
          )
        ),
        selectedCategory
      );

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
        />
        
        <SkillsMatrixPagination 
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          totalSkills={filteredSkills.length}
          currentPage={page}
          totalPages={totalPages}
          handlePageChange={setPage}
        />
      </Card>
    </div>
  );
};