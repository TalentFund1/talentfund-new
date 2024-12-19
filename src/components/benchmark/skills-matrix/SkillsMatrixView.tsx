import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillsMatrixHeader } from "./SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./SkillsMatrixFilters";
import { SkillsMatrixTable } from "./SkillsMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useSkillsMatrixStore } from "./SkillsMatrixState";

interface SkillsMatrixViewProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  filteredSkills: any[];
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
  hasChanges: boolean;
}

export const SkillsMatrixView = ({
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  filteredSkills,
  visibleItems,
  observerTarget,
  hasChanges
}: SkillsMatrixViewProps) => {
  const { toast } = useToast();
  const { saveChanges, cancelChanges } = useSkillsMatrixStore();

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
        hasChanges={hasChanges}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      
      <Separator className="my-4" />
      
      <SkillsMatrixFilters 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
      />

      <SkillsMatrixTable 
        filteredSkills={filteredSkills.slice(0, visibleItems)}
        showCompanySkill={true}
        isRoleBenchmark={false}
      />
      
      {visibleItems < filteredSkills.length && (
        <div 
          ref={observerTarget} 
          className="h-10 flex items-center justify-center"
        >
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
    </Card>
  );
};