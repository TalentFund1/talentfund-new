import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/market/SearchFilter";
import { technicalSkills, softSkills } from '@/components/skillsData';
import { Separator } from "@/components/ui/separator";
import { useSkillsMatrixSearch } from "../context/SkillsMatrixSearchContext";

interface SkillSearchSectionProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  onClearAll: () => void;
}

export const SkillSearchSection = ({ 
  selectedSkills, 
  onSkillsChange,
  onClearAll 
}: SkillSearchSectionProps) => {
  const allSkills = [...technicalSkills, ...softSkills];
  const { setMatrixSearchSkills } = useSkillsMatrixSearch();

  const handleSkillsChange = (skills: string[]) => {
    onSkillsChange(skills);
    setMatrixSearchSkills(skills); // Auto-populate and persist Skills Matrix search
  };

  const handleClearAll = () => {
    onClearAll();
    setMatrixSearchSkills([]); // Clear persisted Skills Matrix search
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">Skills Summary</h3>
      
      <div className="mb-4">
        <div className="space-y-2">
          <SearchFilter
            label=""
            placeholder="Search skills..."
            items={allSkills}
            selectedItems={selectedSkills}
            onItemsChange={handleSkillsChange}
            singleSelect={false}
          />
        </div>
        {selectedSkills.length > 0 && (
          <div className="flex justify-end mt-2">
            <Button 
              variant="outline" 
              onClick={handleClearAll}
              size="sm"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      <Separator className="my-6" />
    </div>
  );
};