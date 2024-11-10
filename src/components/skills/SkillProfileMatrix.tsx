import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { SkillsMatrixHeader } from "../benchmark/skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "../benchmark/skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "../benchmark/skills-matrix/SkillsMatrixTable";
import { SkillsMatrixPagination } from "../benchmark/skills-matrix/SkillsMatrixPagination";
import { useSelectedSkills } from "./context/SelectedSkillsContext";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "../benchmark/skills-matrix/skillCategories";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { useParams } from "react-router-dom";
import { SelectAllToggle } from "./SelectAllToggle";

export const SkillProfileMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();
  const { selectedSkills } = useSelectedSkills();
  const { hasChanges, saveChanges, cancelChanges } = useSkillsMatrixStore();
  const { id } = useParams<{ id: string }>();
  const [toggledSkills, setToggledSkills] = useState(new Set<string>());
  const [isDirty, setIsDirty] = useState(false);

  const handleToggleSkill = (skillTitle: string) => {
    const newToggledSkills = new Set(toggledSkills);
    if (newToggledSkills.has(skillTitle)) {
      newToggledSkills.delete(skillTitle);
    } else {
      newToggledSkills.add(skillTitle);
    }
    setToggledSkills(newToggledSkills);
    setIsDirty(true);
    
    toast({
      title: "Skill Updated",
      description: `${skillTitle} has been ${newToggledSkills.has(skillTitle) ? 'added to' : 'removed from'} your skills.`,
    });
  };

  // Get employee-specific skills
  const employeeSkills = getEmployeeSkills(id || "");

  // Filter skills based on search and category
  const filteredSkills = selectedSkills.length === 0
    ? filterSkillsByCategory(employeeSkills, selectedCategory)
    : filterSkillsByCategory(
        employeeSkills.filter(skill => 
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

  const isAllSelected = paginatedSkills.length > 0 && 
    paginatedSkills.every(skill => toggledSkills.has(skill.title));

  const handleToggleAll = () => {
    if (isAllSelected) {
      // Deselect all skills
      paginatedSkills.forEach(skill => {
        if (toggledSkills.has(skill.title)) {
          handleToggleSkill(skill.title);
        }
      });
    } else {
      // Select all skills
      paginatedSkills.forEach(skill => {
        if (!toggledSkills.has(skill.title)) {
          handleToggleSkill(skill.title);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <SkillsMatrixHeader 
          hasChanges={hasChanges}
          onSave={saveChanges}
          onCancel={cancelChanges}
        />
        <Separator className="my-4" />
        
        <SkillsMatrixFilters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <SelectAllToggle 
          isAllSelected={isAllSelected}
          onToggleAll={handleToggleAll}
        />

        <SkillsMatrixTable 
          filteredSkills={paginatedSkills}
          toggledSkills={toggledSkills}
          onToggleSkill={handleToggleSkill}
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
