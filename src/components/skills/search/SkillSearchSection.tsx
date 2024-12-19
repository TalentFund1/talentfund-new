import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/market/SearchFilter";
import { getAllSkills } from '../data/skills/allSkills';
import { Separator } from "@/components/ui/separator";

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
  const allSkills = getAllSkills().map(skill => skill.title);

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
            onItemsChange={onSkillsChange}
            singleSelect={false}
          />
        </div>
        {selectedSkills.length > 0 && (
          <div className="flex justify-end mt-2">
            <Button 
              variant="outline" 
              onClick={onClearAll}
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