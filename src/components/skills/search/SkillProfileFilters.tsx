import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchFilter } from '@/components/market/SearchFilter';

interface SkillProfileFiltersProps {
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  selectedFunction: string;
  setSelectedFunction: (func: string) => void;
  selectedJobTitle: string;
  setSelectedJobTitle: (title: string) => void;
  toggledSkillsList: string[];
  availableJobTitles: string[];
  companyFunctions: string[];
}

export const SkillProfileFilters = ({
  selectedSkills,
  setSelectedSkills,
  selectedFunction,
  setSelectedFunction,
  selectedJobTitle,
  setSelectedJobTitle,
  toggledSkillsList,
  availableJobTitles,
  companyFunctions
}: SkillProfileFiltersProps) => {
  const handleClearAll = () => {
    setSelectedSkills([]);
    setSelectedFunction("");
    setSelectedJobTitle("");
  };

  return (
    <Card className="p-6">
      <div className="space-y-1">
        <SearchFilter
          label=""
          placeholder="Search skills..."
          items={toggledSkillsList}
          selectedItems={selectedSkills}
          onItemsChange={setSelectedSkills}
          singleSelect={false}
        />

        <div className="flex flex-wrap items-center gap-3">
          <SearchFilter
            label=""
            placeholder="Role"
            items={availableJobTitles}
            selectedItems={selectedJobTitle ? [selectedJobTitle] : []}
            onItemsChange={(items) => setSelectedJobTitle(items[0] || "")}
            singleSelect={true}
            className="w-[180px]"
          />

          <SearchFilter
            label=""
            placeholder="Function"
            items={companyFunctions}
            selectedItems={selectedFunction ? [selectedFunction] : []}
            onItemsChange={(items) => setSelectedFunction(items[0] || "")}
            singleSelect={true}
            className="w-[180px]"
          />

          <Button 
            variant="outline" 
            onClick={handleClearAll}
            className="h-[40px]"
          >
            Clear All
          </Button>
        </div>
      </div>
    </Card>
  );
};