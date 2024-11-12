import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/market/SearchFilter";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { SkillsMatrixPagination } from "./skills-matrix/SkillsMatrixPagination";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { technicalSkills, softSkills } from '@/components/skillsData';
import { roleSkills } from '../skills/data/roleSkills';
import { useToggledSkills } from '../skills/context/ToggledSkillsContext';
import { useToast } from "@/hooks/use-toast";

export const BenchmarkSkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { toast } = useToast();

  const employeeSkills = getEmployeeSkills(id || "");
  const allSkills = [...technicalSkills, ...softSkills];

  useEffect(() => {
    if (id && roleSkills[id as keyof typeof roleSkills]) {
      // Clear previous search skills and toggled skills
      setSelectedSearchSkills([]);
      setToggledSkills(new Set());

      const currentRoleSkills = roleSkills[id as keyof typeof roleSkills];
      const allRoleSkills = [
        ...(currentRoleSkills.specialized?.map(skill => skill.title) || []),
        ...(currentRoleSkills.common?.map(skill => skill.title) || []),
        ...(currentRoleSkills.certifications?.map(skill => skill.title) || [])
      ];

      // Update both selected search skills and toggled skills
      setSelectedSearchSkills(allRoleSkills);
      setToggledSkills(new Set(allRoleSkills));

      const roleName = id === "123" ? "AI Engineer" :
                      id === "124" ? "Backend Engineer" :
                      id === "125" ? "Frontend Engineer" :
                      id === "126" ? "Engineering Manager" : "selected role";
      
      toast({
        title: "Skills Updated",
        description: `Updated skills for ${roleName}`,
      });
    }
  }, [id, setToggledSkills]);

  const filteredSkills = filterSkillsByCategory(employeeSkills, selectedCategory)
    .filter(skill => {
      if (selectedSearchSkills.length === 0) return true;
      return selectedSearchSkills.some(searchTerm => 
        skill.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

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
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
        </div>

        <div className="space-y-4">
          <SearchFilter
            label=""
            placeholder="Search skills..."
            items={allSkills}
            selectedItems={selectedSearchSkills}
            onItemsChange={setSelectedSearchSkills}
            singleSelect={false}
          />
          
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