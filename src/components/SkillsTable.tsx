import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useState, useMemo } from "react";
import { SkillGrowthSheet } from "./skills/SkillGrowthSheet";
import { TableHeader } from "./skills-table/TableHeader";
import { TablePagination } from "./skills-table/TablePagination";
import { SkillLevelIcon } from "./skills-table/SkillLevelIcon";

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
      return true;
    });
  }, [selectedFilter]);

  const paginatedSkills = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredSkills.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredSkills, currentPage, rowsPerPage]);

  const handleGrowthClick = (skill: { title: string; growth: string }) => {
    setSelectedSkill(skill);
    setSheetOpen(true);
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-2xl border border-border shadow-sm w-full">
        <TableHeader 
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Skill Title</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead className="text-center">Beginner</TableHead>
                <TableHead className="text-center">Intermediate</TableHead>
                <TableHead className="text-center">Advanced</TableHead>
                <TableHead>Projected Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSkills.map((skill) => (
                <TableRow key={skill.title}>
                  <TableCell className="font-medium">{skill.title}</TableCell>
                  <TableCell>{skill.subcategory}</TableCell>
                  <TableCell className="text-center">
                    {skill.level === "beginner" && <SkillLevelIcon level="beginner" />}
                  </TableCell>
                  <TableCell className="text-center">
                    {skill.level === "intermediate" && <SkillLevelIcon level="intermediate" />}
                  </TableCell>
                  <TableCell className="text-center">
                    {skill.level === "advanced" && <SkillLevelIcon level="advanced" />}
                  </TableCell>
                  <TableCell>
                    <span 
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity ${
                        skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                      }`}
                      onClick={() => handleGrowthClick(skill)}
                    >
                      ↗ {skill.growth}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <TablePagination
          currentPage={currentPage}
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