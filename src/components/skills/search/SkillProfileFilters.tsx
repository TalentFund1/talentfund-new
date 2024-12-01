import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchFilter } from '@/components/market/SearchFilter';
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SkillProfileFiltersProps {
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  selectedFunction: string;
  setSelectedFunction: (func: string) => void;
  selectedJobTitle: string;
  setSelectedJobTitle: (title: string) => void;
  selectedOccupation: string;
  setSelectedOccupation: (occupation: string) => void;
  toggledSkillsList: string[];
  availableJobTitles: string[];
  companyFunctions: string[];
  occupations: string[];
}

export const SkillProfileFilters = ({
  selectedSkills,
  setSelectedSkills,
  selectedFunction,
  setSelectedFunction,
  selectedJobTitle,
  setSelectedJobTitle,
  selectedOccupation,
  setSelectedOccupation,
  toggledSkillsList,
  availableJobTitles,
  companyFunctions,
  occupations
}: SkillProfileFiltersProps) => {
  const handleClearAll = () => {
    setSelectedSkills([]);
    setSelectedFunction("");
    setSelectedJobTitle("");
    setSelectedOccupation("");
  };

  return (
    <Card className="p-6">
      <div className="space-y-2">
        <SearchFilter
          label=""
          placeholder="Search skills..."
          items={toggledSkillsList}
          selectedItems={selectedSkills}
          onItemsChange={setSelectedSkills}
          singleSelect={false}
        />

        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {skill}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))}
              />
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-start gap-3 mt-2">
          <SearchFilter
            label=""
            placeholder="Job Title"
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

          <SearchFilter
            label=""
            placeholder="Occupation"
            items={occupations}
            selectedItems={selectedOccupation ? [selectedOccupation] : []}
            onItemsChange={(items) => setSelectedOccupation(items[0] || "")}
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