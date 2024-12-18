import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SkillTypeFilters } from "./filters/SkillTypeFilters";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { SkillProfileMatrixPagination } from "./SkillProfileMatrixPagination";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { UnifiedSkill } from "./types/SkillTypes";

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("all");
  const { toggledSkills, toggleSkill } = useToggledSkills();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<'growth' | 'salary' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // Mock data for demonstration - replace with actual data source
  const mockSkills: UnifiedSkill[] = [
    {
      title: "React",
      subcategory: "Frontend",
      category: "specialized", // Changed from "Technical" to "specialized"
      growth: "10%",
      salary: "$120k",
      level: "Advanced"
    }
    // ... Add more mock skills as needed
  ];

  const handleSort = (field: 'growth' | 'salary' | null) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate pagination values
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const totalSkills = mockSkills.length;
  const totalPages = Math.ceil(totalSkills / rowsPerPage);

  // Get paginated skills
  const paginatedSkills = mockSkills.slice(startIndex, endIndex);

  console.log('SkillProfileMatrix - Current state:', {
    sortBy,
    toggledSkillsCount: toggledSkills.size,
    currentPage,
    rowsPerPage,
    sortField,
    sortDirection
  });

  return (
    <Card className="p-6 bg-white">
      <SkillTypeFilters
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <SkillProfileMatrixTable 
        paginatedSkills={paginatedSkills}
        toggledSkills={toggledSkills}
        onToggleSkill={toggleSkill}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      <SkillProfileMatrixPagination 
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        totalSkills={totalSkills}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Card>
  );
};