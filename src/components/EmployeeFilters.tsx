import { Button } from "@/components/ui/button";
import { SearchFilter } from '@/components/market/SearchFilter';
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

  return (
    <div className="space-y-4">
      <SearchFilter
        label=""
        placeholder="Search job titles..."
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
      />

      <SearchFilter
        label=""
        placeholder="Search skills..."
        items={allSkills}
        selectedItems={selectedSkills}
        onItemsChange={setSelectedSkills}
        singleSelect={false}
      />

      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <SearchFilter
            label=""
            placeholder="Search levels..."
            items={["P1", "P2", "P3", "P4", "P5", "M1", "M2", "M3"]}
            selectedItems={selectedLevel}
            onItemsChange={setSelectedLevel}
            singleSelect={false}
          />
        </div>
        
        <div className="flex-1">
          <SearchFilter
            label=""
            placeholder="Search offices..."
            items={["New York", "San Francisco", "London", "Toronto", "Berlin"]}
            selectedItems={selectedOffice}
            onItemsChange={setSelectedOffice}
            singleSelect={false}
          />
        </div>

        <div className="flex-1">
          <SearchFilter
            label=""
            placeholder="Search departments..."
            items={["Engineering", "Product", "Design", "Marketing", "Sales"]}
            selectedItems={selectedDepartment}
            onItemsChange={setSelectedDepartment}
            singleSelect={false}
          />
        </div>

        <div className="flex-1">
          <SearchFilter
            label=""
            placeholder="Search employment types..."
            items={["Full Time", "Part Time", "Contract", "Internship"]}
            selectedItems={selectedEmploymentType}
            onItemsChange={setSelectedEmploymentType}
            singleSelect={false}
          />
        </div>

        <Button 
          variant="outline" 
          onClick={() => {
            setSelectedSkills([]);
            setSelectedJobTitle([]);
            setSelectedLevel([]);
            setSelectedOffice([]);
            setSelectedDepartment([]);
            setSelectedEmploymentType([]);
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};