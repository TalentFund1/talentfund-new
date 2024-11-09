import { SearchFilter } from '@/components/market/SearchFilter';
import { useState } from "react";
import { technicalSkills, softSkills } from './skillsData';
import { Button } from '@/components/ui/button';

export const EmployeeFilters = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([]);

  const allSkills = [...technicalSkills, ...softSkills];

  const handleClearAll = () => {
    setSelectedSkills([]);
    setSelectedJobTitle([]);
    setSelectedOffice([]);
    setSelectedDepartment([]);
    setSelectedEmploymentType([]);
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