import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { SkillsMatrixPagination } from "./skills-matrix/SkillsMatrixPagination";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useParams, useLocation } from "react-router-dom";
import { useSelectedSkills } from "../skills/context/SelectedSkillsContext";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchSkills, setSearchSkills] = useState<string[]>([]);
  const observer = useRef<IntersectionObserver>();
  const { toast } = useToast();
  const { hasChanges, saveChanges, cancelChanges } = useSkillsMatrixStore();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { selectedSkills } = useSelectedSkills();
  const { benchmarkSearchSkills, setBenchmarkSearchSkills } = useBenchmarkSearch();

  // Get employee-specific skills
  const employeeSkills = getEmployeeSkills(id || "");

  // Determine which selected skills to use based on the current tab
  const isRoleBenchmarkTab = location.pathname.includes('benchmark');
  const currentSelectedSkills = isRoleBenchmarkTab ? benchmarkSearchSkills : searchSkills;

  // Filter skills based on category and search
  const filteredSkills = filterSkillsByCategory(employeeSkills, selectedCategory).filter(
    skill => currentSelectedSkills.length === 0 || currentSelectedSkills.includes(skill.title)
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
          onSave={saveChanges}
          onCancel={cancelChanges}
        />
        <Separator className="my-4" />
        
        {!isRoleBenchmarkTab && (
          <SkillsMatrixFilters 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSkills={currentSelectedSkills}
            setSelectedSkills={isRoleBenchmarkTab ? setBenchmarkSearchSkills : setSearchSkills}
            isRoleBenchmarkTab={isRoleBenchmarkTab}
          />
        )}

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