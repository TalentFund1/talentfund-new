import { SearchFilter } from '@/components/market/SearchFilter';
import { useState, useEffect } from "react";
import { technicalSkills, softSkills } from './skillsData';
import { Button } from '@/components/ui/button';
import { employees, getBaseRole } from './EmployeeTable';

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
  selectedEmploymentType
}: EmployeeFiltersProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const allSkills = [...technicalSkills, ...softSkills];
  
  // Get unique job titles from employees
  const jobTitles = Array.from(new Set(employees.map(emp => getBaseRole(emp.role))));

  // Determine if the selected role is managerial
  const isManagerialTrack = selectedJobTitle.length > 0 && 
    selectedJobTitle[0].toLowerCase().includes('manager');

  // Get appropriate levels based on track
  const getLevelsForTrack = () => {
    if (isManagerialTrack) {
      return ["M3", "M4", "M5", "M6"];
    }
    return ["P1", "P2", "P3", "P4", "P5", "P6"];
  };

  // Reset level selection when track changes
  useEffect(() => {
    onLevelChange([]);
  }, [selectedJobTitle, onLevelChange]);

  const handleClearAll = () => {
    setSelectedSkills([]);
    onJobTitleChange([]);
    onLevelChange([]);
    onOfficeChange([]);
    onDepartmentChange([]);
    onEmploymentTypeChange([]);
  };

  return (
    <div className="space-y-0.5">
      <div className="w-full">
        <SearchFilter
          label=""
          placeholder="Search skills..."
          items={allSkills}
          selectedItems={selectedSkills}
          onItemsChange={setSelectedSkills}
          singleSelect={false}
        />
      </div>

      <div className="flex flex-wrap items-start gap-3">
        <SearchFilter
          label=""
          placeholder="Job Title"
          items={jobTitles}
          selectedItems={selectedJobTitle}
          onItemsChange={onJobTitleChange}
          singleSelect={true}
          className="w-[180px]"
        />
        
        <SearchFilter
          label=""
          placeholder="Level"
          items={getLevelsForTrack()}
          selectedItems={selectedLevel}
          onItemsChange={onLevelChange}
          singleSelect={false}
          className="w-[180px]"
        />
        
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