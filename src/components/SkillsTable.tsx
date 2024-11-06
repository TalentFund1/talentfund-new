import { Table, TableBody } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { SkillGrowthSheet } from "./skills/SkillGrowthSheet";
import { SkillTableHeader } from "./skills/SkillTableHeader";
import { SkillTableRow } from "./skills/SkillTableRow";
import { SkillsTableFilter } from "./skills/SkillsTableFilter";
import { SkillsTablePagination } from "./skills/SkillsTablePagination";

const skills = [
  {
    title: "Amazon Web Services",
    subcategory: "Web Services",
    level: "advanced",
    growth: "12%",
    type: "specialized"
  },
  {
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "advanced",
    growth: "19%",
    type: "specialized"
  },
  {
    title: "Conversational AI",
    subcategory: "Natural Language Processing (NLP)",
    level: "advanced",
    growth: "12%",
    type: "specialized"
  },
  {
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "19%",
    type: "specialized"
  },
  {
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "10%",
    type: "specialized"
  },
  {
    title: "Docker (Software)",
    subcategory: "Software Development Tools",
    level: "intermediate",
    growth: "0%",
    type: "common"
  },
  {
    title: "MLflow",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "beginner",
    growth: "11%",
    type: "common"
  }
];

export const SkillsTable = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<{ title: string; growth: string } | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "specialized") return skill.type === "specialized";
      if (selectedFilter === "common") return skill.type === "common";
      if (selectedFilter === "certification") return skill.type === "certification";
      return true;
    });
  }, [selectedFilter]);

  const paginatedSkills = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredSkills.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredSkills, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredSkills.length / rowsPerPage);

  const handleGrowthClick = (skill: { title: string; growth: string }) => {
    setSelectedSkill(skill);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-border shadow-sm">
        <SkillsTableFilter 
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        
        <div className="px-4">
          <Table>
            <SkillTableHeader />
            <TableBody>
              {paginatedSkills.map((skill) => (
                <SkillTableRow 
                  key={skill.title} 
                  skill={skill} 
                  onGrowthClick={handleGrowthClick}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        
        <SkillsTablePagination 
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={filteredSkills.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(Number(value));
            setCurrentPage(1);
          }}
        />
      </div>

      {selectedSkill && (
        <SkillGrowthSheet 
          open={sheetOpen} 
          onOpenChange={setSheetOpen}
          skill={selectedSkill}
        />
      )}
    </div>
  );
};
