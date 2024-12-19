import { SearchFilter } from "@/components/market/SearchFilter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggledSkillsProvider } from "../context/ToggledSkillsContext";

interface SkillProfileFiltersProps {
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  selectedFunction: string;
  setSelectedFunction: (fn: string) => void;
  selectedJobTitle: string;
  setSelectedJobTitle: (title: string) => void;
  toggledSkillsList: string[];
  availableJobTitles: string[];
  companyFunctions: string[];
}

const SkillProfileFiltersContent = ({
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
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchFilter
          label="Skills"
          placeholder="Search skills..."
          items={toggledSkillsList}
          selectedItems={selectedSkills}
          onItemsChange={setSelectedSkills}
        />
        
        <Select value={selectedFunction} onValueChange={setSelectedFunction}>
          <SelectTrigger>
            <SelectValue placeholder="Select function" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Functions</SelectItem>
            {companyFunctions.map((fn) => (
              <SelectItem key={fn} value={fn}>{fn}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedJobTitle} onValueChange={setSelectedJobTitle}>
          <SelectTrigger>
            <SelectValue placeholder="Select job title" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Job Titles</SelectItem>
            {availableJobTitles.map((title) => (
              <SelectItem key={title} value={title}>{title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const SkillProfileFilters = (props: SkillProfileFiltersProps) => {
  return (
    <ToggledSkillsProvider>
      <SkillProfileFiltersContent {...props} />
    </ToggledSkillsProvider>
  );
};