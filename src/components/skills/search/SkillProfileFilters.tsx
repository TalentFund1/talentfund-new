import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";

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

export const SkillProfileFilters = ({
  selectedSkills,
  setSelectedSkills,
  selectedFunction,
  setSelectedFunction,
  selectedJobTitle,
  setSelectedJobTitle,
  toggledSkillsList,
  availableJobTitles,
  companyFunctions,
}: SkillProfileFiltersProps) => {
  const handleClearAll = () => {
    setSelectedSkills([]);
    setSelectedFunction("");
    setSelectedJobTitle("");
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <MultiSelect
              options={toggledSkillsList.map(skill => ({ label: skill, value: skill }))}
              selected={selectedSkills}
              onChange={setSelectedSkills}
              placeholder="Search skills..."
            />
          </div>
          
          <Select value={selectedJobTitle} onValueChange={setSelectedJobTitle}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Job Title" />
            </SelectTrigger>
            <SelectContent>
              {availableJobTitles.map((title) => (
                <SelectItem key={title} value={title}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFunction} onValueChange={setSelectedFunction}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Function" />
            </SelectTrigger>
            <SelectContent>
              {companyFunctions.map((fn) => (
                <SelectItem key={fn} value={fn}>
                  {fn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            className="px-2.5"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </div>
      </div>
    </Card>
  );
};