import { SearchFilter } from '@/components/market/SearchFilter';
import { useState, useEffect } from "react";
import { technicalSkills, softSkills } from './skillsData';
import { Button } from '@/components/ui/button';
import { employees, getBaseRole } from './EmployeeTable';
import { EmployeeSearch } from './employee/EmployeeSearch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface EmployeeFiltersProps {
  onDepartmentChange: (department: string[]) => void;
  selectedDepartment: string[];
  onJobTitleChange: (jobTitle: string[]) => void;
  selectedJobTitle: string[];
  onLevelChange: (level: string[]) => void;
  selectedLevel: string[];
  onOfficeChange: (office: string[]) => void;
  selectedOffice: string[];
  onEmploymentTypeChange: (employmentType: string[]) => void;
  selectedEmploymentType: string[];
  onSkillsChange: (skills: string[]) => void;
  selectedSkills: string[];
  onEmployeeSearch: (employees: string[]) => void;
  selectedEmployees: string[];
  onManagerChange?: (manager: string[]) => void;
  selectedManager?: string[];
}

export const EmployeeFilters = ({ 
  onDepartmentChange, 
  selectedDepartment,
  onJobTitleChange,
  selectedJobTitle,
  onLevelChange,
  selectedLevel,
  onOfficeChange,
  selectedOffice,
  onEmploymentTypeChange,
  selectedEmploymentType,
  onSkillsChange,
  selectedSkills,
  onEmployeeSearch,
  selectedEmployees,
  onManagerChange = () => {},
  selectedManager = []
}: EmployeeFiltersProps) => {
  const allSkills = [...technicalSkills, ...softSkills];
  const jobTitles = Array.from(new Set(employees.map(emp => getBaseRole(emp.role))));
  const managers = Array.from(new Set(
    employees
      .filter(emp => emp.role.toLowerCase().includes('manager'))
      .map(emp => emp.name)
  ));

  const isManagerialTrack = selectedJobTitle.length > 0 && 
    selectedJobTitle[0].toLowerCase().includes('manager');

  const getLevelsForTrack = () => {
    if (isManagerialTrack) {
      return ["M3", "M4", "M5", "M6"];
    }
    return ["P1", "P2", "P3", "P4", "P5", "P6"];
  };

  const getLevelDescription = (level: string) => {
    const descriptions: Record<string, string> = {
      "P1": "Entry",
      "P2": "Developing",
      "P3": "Career",
      "P4": "Senior",
      "P5": "Expert",
      "P6": "Principal",
      "M3": "Manager",
      "M4": "Senior Manager",
      "M5": "Director",
      "M6": "Senior Director"
    };
    return descriptions[level] || level;
  };

  useEffect(() => {
    onLevelChange([]);
  }, [selectedJobTitle, onLevelChange]);

  const handleClearAll = () => {
    onSkillsChange([]);
    onJobTitleChange([]);
    onLevelChange([]);
    onOfficeChange([]);
    onDepartmentChange([]);
    onEmploymentTypeChange([]);
    onEmployeeSearch([]);
    onManagerChange([]);
  };

  return (
    <div className="space-y-0.5">
      <EmployeeSearch 
        onEmployeeSearch={onEmployeeSearch}
        selectedEmployees={selectedEmployees}
      />

      <div className="w-full">
        <SearchFilter
          label=""
          placeholder="Search skills..."
          items={allSkills}
          selectedItems={selectedSkills}
          onItemsChange={onSkillsChange}
          singleSelect={false}
        />
      </div>

      <div className="flex flex-wrap items-start gap-3">
        <SearchFilter
          label=""
          placeholder="Manager"
          items={managers}
          selectedItems={selectedManager}
          onItemsChange={onManagerChange}
          singleSelect={true}
          className="w-[180px]"
        />

        <SearchFilter
          label=""
          placeholder="Job Title"
          items={jobTitles}
          selectedItems={selectedJobTitle}
          onItemsChange={onJobTitleChange}
          singleSelect={true}
          className="w-[180px]"
        />
        
        <div className="relative">
          <SearchFilter
            label=""
            placeholder="Level"
            items={getLevelsForTrack().map(level => `${level} - ${getLevelDescription(level)}`)}
            selectedItems={selectedLevel}
            onItemsChange={onLevelChange}
            singleSelect={false}
            className="w-[180px]"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="absolute right-8 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" align="start" className="p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-medium">Professional Track:</p>
                    <ul className="text-sm space-y-1">
                      <li><span className="font-medium">P1</span> - Entry</li>
                      <li><span className="font-medium">P2</span> - Developing</li>
                      <li><span className="font-medium">P3</span> - Career</li>
                      <li><span className="font-medium">P4</span> - Senior</li>
                      <li><span className="font-medium">P5</span> - Expert</li>
                      <li><span className="font-medium">P6</span> - Principal</li>
                    </ul>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-2">
                    <p className="font-medium">Managerial Track:</p>
                    <ul className="text-sm space-y-1">
                      <li><span className="font-medium">M3</span> - Manager</li>
                      <li><span className="font-medium">M4</span> - Senior Manager</li>
                      <li><span className="font-medium">M5</span> - Director</li>
                      <li><span className="font-medium">M6</span> - Senior Director</li>
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <SearchFilter
          label=""
          placeholder="Office"
          items={["Toronto", "New York", "San Francisco"]}
          selectedItems={selectedOffice}
          onItemsChange={onOfficeChange}
          singleSelect={false}
          className="w-[180px]"
        />

        <SearchFilter
          label=""
          placeholder="Department"
          items={["Engineering", "Product", "Design", "Marketing", "Sales"]}
          selectedItems={selectedDepartment}
          onItemsChange={onDepartmentChange}
          singleSelect={false}
          className="w-[180px]"
        />

        <SearchFilter
          label=""
          placeholder="Employment Type"
          items={["Full-time", "Part-time", "Contract", "Internship"]}
          selectedItems={selectedEmploymentType}
          onItemsChange={onEmploymentTypeChange}
          singleSelect={false}
          className="w-[180px]"
        />

        <Button 
          variant="outline" 
          onClick={handleClearAll}
          className="h-[40px] mt-4"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};