import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useParams, useLocation } from "react-router-dom";
import { useSelectedSkills } from "../skills/context/SelectedSkillsContext";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useToast } from "@/hooks/use-toast";

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const { hasChanges, saveChanges, cancelChanges } = useSkillsMatrixStore();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { selectedSkills } = useSelectedSkills();
  const { toggledSkills } = useToggledSkills();
  const { toast } = useToast();

  const isRoleBenchmarkTab = location.pathname.includes('benchmark');
  const employeeSkills = getEmployeeSkills(id || "");

  const filteredSkills = filterSkillsByCategory(employeeSkills, selectedCategory)
    .filter(skill => {
      if (!toggledSkills.has(skill.title)) {
        return false;
      }

      if (isRoleBenchmarkTab) {
        if (selectedSearchSkills.length > 0) {
          return selectedSearchSkills.some(term => 
            skill.title.toLowerCase().includes(term.toLowerCase())
          );
        }
        return true;
      }
      if (selectedSkills.length === 0) return true;
      return selectedSkills.some(searchTerm => 
        skill.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handleSave = () => {
    saveChanges();
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully."
    });
  };

  const handleCancel = () => {
    cancelChanges();
    toast({
      title: "Changes cancelled",
      description: "Your changes have been discarded."
    });
  };

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
          selectedSearchSkills={selectedSearchSkills}
          setSelectedSearchSkills={setSelectedSearchSkills}
        />

        <SkillsMatrixTable 
          filteredSkills={filteredSkills}
        />
      </Card>
    </div>
  );
};