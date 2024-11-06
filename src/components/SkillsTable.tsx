import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { SkillGrowthSheet } from "./skills/SkillGrowthSheet";
import { SkillTableHeader } from "./skills/SkillTableHeader";
import { SkillTableRow } from "./skills/SkillTableRow";

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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-border shadow-sm">
        <div className="px-6 py-4 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
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
        
        <div className="flex justify-between items-center px-6 py-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Select value={String(rowsPerPage)} onValueChange={handleRowsPerPageChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="10 rows" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 rows</SelectItem>
                <SelectItem value="20">20 rows</SelectItem>
                <SelectItem value="50">50 rows</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground ml-4">
              {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, filteredSkills.length)} of ${filteredSkills.length}`}
            </span>
          </div>
          
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-8 h-8"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="w-8 h-8"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
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