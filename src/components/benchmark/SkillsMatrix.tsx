import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { AddEmployeeSkillDialog } from "./skills-matrix/dialog/AddEmployeeSkillDialog";
import { useParams } from "react-router-dom";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";

export const SkillsMatrix = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { saveChanges, cancelChanges } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(id || "");

  const handleSave = () => {
    saveChanges();
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    cancelChanges();
    toast({
      title: "Changes cancelled",
      description: "Your changes have been discarded.",
    });
  };

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <SkillsMatrixHeader 
        hasChanges={false}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      
      <Separator className="my-4" />
      
      <SkillsMatrixFilters 
        addSkillButton={<AddEmployeeSkillDialog />}
      />

      <SkillsMatrixTable 
        skills={employeeSkills}
        isRoleBenchmark={false}
      />
    </Card>
  );
};