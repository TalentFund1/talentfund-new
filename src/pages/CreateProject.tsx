import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { ProjectDescription } from "@/components/project/ProjectDescription";
import { ProjectRoles } from "@/components/project/ProjectRoles";
import { ProjectSkills } from "@/components/project/ProjectSkills";
import { ProjectMatches } from "@/components/project/ProjectMatches";
import { LearningRecommendations } from "@/components/project/LearningRecommendations";

const CreateProject = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    description: "",
    selectedRoles: [] as string[],
    roleSkills: {} as Record<string, string[]>,
  });

  console.log('Current form state:', formData);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log(`Updated ${field}:`, value);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Create a Project</h1>
            <Button variant="outline">Save Project</Button>
          </div>

          <Card className="p-6">
            {currentStep === 1 && (
              <ProjectDescription
                value={formData.description}
                onChange={(value) => updateFormData('description', value)}
                onNext={handleNext}
              />
            )}
            
            {currentStep === 2 && (
              <ProjectRoles
                selectedRoles={formData.selectedRoles}
                onChange={(roles) => updateFormData('selectedRoles', roles)}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            
            {currentStep === 3 && (
              <ProjectSkills
                selectedRoles={formData.selectedRoles}
                roleSkills={formData.roleSkills}
                onChange={(skills) => updateFormData('roleSkills', skills)}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            
            {currentStep === 4 && (
              <ProjectMatches
                selectedRoles={formData.selectedRoles}
                roleSkills={formData.roleSkills}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            
            {currentStep === 5 && (
              <LearningRecommendations
                roleSkills={formData.roleSkills}
                onBack={handleBack}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;