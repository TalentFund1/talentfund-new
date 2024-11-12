import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { SkillsMatrixPagination } from "./skills-matrix/SkillsMatrixPagination";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useParams, useLocation } from "react-router-dom";
import { useSelectedSkills } from "../skills/context/SelectedSkillsContext";
import { Badge } from "../ui/badge";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const { hasChanges, saveChanges, cancelChanges } = useSkillsMatrixStore();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { selectedSkills } = useSelectedSkills();
  const { toggledSkills } = useToggledSkills();

  const isRoleBenchmarkTab = location.pathname.includes('benchmark');
  const employeeSkills = getEmployeeSkills(id || "");

  const filteredSkills = filterSkillsByCategory(employeeSkills, selectedCategory)
    .filter(skill => toggledSkills.has(skill.title))  // Only show toggled skills
    .filter(skill => {
      if (isRoleBenchmarkTab) {
        if (selectedSearchSkills.length > 0) {
          return selectedSearchSkills.some(term => 
            skill.title.toLowerCase().includes(term.toLowerCase())
          );
        }
        return searchTerm 
          ? skill.title.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
      }
      if (selectedSkills.length === 0) return true;
      return selectedSkills.some(searchTerm => 
        skill.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setPage(1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      setSelectedSearchSkills(prev => [...prev, searchTerm.trim()]);
      setSearchTerm("");
    }
  };

  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(prev => prev.filter(s => s !== skill));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedSearchSkills([]);
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
        
        {!isRoleBenchmarkTab ? (
          <SkillsMatrixFilters 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pr-8"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {selectedSearchSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedSearchSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="flex items-center gap-1 bg-background"
                    >
                      {skill}
                      <button
                        onClick={() => removeSearchSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearSearch}
                    className="text-sm"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>
            <div className="flex justify-between items-start gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="specialized">Specialized Skills</SelectItem>
                  <SelectItem value="common">Common Skills</SelectItem>
                  <SelectItem value="certification">Certifications</SelectItem>
                </SelectContent>
              </Select>
              <Button>Add Skill</Button>
            </div>
          </div>
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