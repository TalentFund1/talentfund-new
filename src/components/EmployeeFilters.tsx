import { SearchFilter } from '@/components/market/SearchFilter';
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { technicalSkills, softSkills } from './skillsData';

export const EmployeeFilters = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);

  const allSkills = [...technicalSkills, ...softSkills];

  const handleClearAll = () => {
    setSelectedSkills([]);
    setSelectedJobTitle([]);
    setSelectedLevel([]);
    setSelectedOffice([]);
    setSelectedDepartment([]);
    setSelectedEmploymentType([]);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between w-full">
        <div className="w-full max-w-md">
          <SearchFilter
            label=""
            placeholder="Search skills..."
            items={allSkills}
            selectedItems={selectedSkills}
            onItemsChange={setSelectedSkills}
            singleSelect={false}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={handleClearAll}
          className="ml-4"
        >
          Clear All
        </Button>
      </div>

      <div className="flex flex-wrap items-start gap-3">
        <SearchFilter
          label=""
          placeholder="Job Title"
          items={[
            "Software Engineer",
            "Product Manager",
            "Designer",
            "Data Scientist",
            "DevOps Engineer"
          ]}
          selectedItems={selectedJobTitle}
          onItemsChange={setSelectedJobTitle}
          singleSelect={true}
          className="w-[180px]"
        />
        
        <SearchFilter
          label=""
          placeholder="Level"
          items={["P1", "P2", "P3", "P4", "P5", "M1", "M2", "M3"]}
          selectedItems={selectedLevel}
          onItemsChange={setSelectedLevel}
          singleSelect={false}
          className="w-[180px]"
        />
        
        <SearchFilter
          label=""
          placeholder="Office"
          items={["New York", "San Francisco", "London", "Toronto", "Berlin"]}
          selectedItems={selectedOffice}
          onItemsChange={setSelectedOffice}
          singleSelect={false}
          className="w-[180px]"
        />

        <SearchFilter
          label=""
          placeholder="Department"
          items={["Engineering", "Product", "Design", "Marketing", "Sales"]}
          selectedItems={selectedDepartment}
          onItemsChange={setSelectedDepartment}
          singleSelect={false}
          className="w-[180px]"
        />

        <SearchFilter
          label=""
          placeholder="Employment Type"
          items={["Full Time", "Part Time", "Contract", "Internship"]}
          selectedItems={selectedEmploymentType}
          onItemsChange={setSelectedEmploymentType}
          singleSelect={false}
          className="w-[180px]"
        />
      </div>
    </div>
  );
};