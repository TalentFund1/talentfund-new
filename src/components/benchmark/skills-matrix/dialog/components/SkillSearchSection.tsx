import { SearchFilter } from "@/components/market/SearchFilter";
import { Button } from "@/components/ui/button";

interface SkillSearchSectionProps {
  allSkills: string[];
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  onCancel: () => void;
  onAdd: () => void;
}

export const SkillSearchSection = ({
  allSkills,
  selectedSkills,
  setSelectedSkills,
  onCancel,
  onAdd
}: SkillSearchSectionProps) => {
  return (
    <div className="space-y-6 py-4">
      <SearchFilter
        label=""
        placeholder="Search skills..."
        items={allSkills}
        selectedItems={selectedSkills}
        onItemsChange={setSelectedSkills}
        singleSelect={false}
      />

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          onClick={onAdd}
          disabled={selectedSkills.length === 0}
        >
          Add Selected Skills
        </Button>
      </div>
    </div>
  );
};