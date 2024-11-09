import { Button } from "@/components/ui/button";
import { SearchFilter } from '@/components/market/SearchFilter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        label="Job Title"
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
        label="Skills"
        placeholder="Search skills..."
        items={allSkills}
        selectedItems={selectedSkills}
        onItemsChange={setSelectedSkills}
        singleSelect={false}
      />
      
      <div className="flex flex-wrap gap-4">
        <SearchFilter
          label="Level"
          placeholder="Search levels..."
          items={["P1", "P2", "P3", "P4", "P5", "M1", "M2", "M3"]}
          selectedItems={selectedLevel}
          onItemsChange={setSelectedLevel}
          singleSelect={false}
        />
        
        <SearchFilter
          label="Office"
          placeholder="Search offices..."
          items={["New York", "San Francisco", "London", "Toronto", "Berlin"]}
          selectedItems={selectedOffice}
          onItemsChange={setSelectedOffice}
          singleSelect={false}
        />

        <SearchFilter
          label="Department"
          placeholder="Search departments..."
          items={["Engineering", "Product", "Design", "Marketing", "Sales"]}
          selectedItems={selectedDepartment}
          onItemsChange={setSelectedDepartment}
          singleSelect={false}
        />

        <SearchFilter
          label="Employment Type"
          placeholder="Search employment types..."
          items={["Full Time", "Part Time", "Contract", "Internship"]}
          selectedItems={selectedEmploymentType}
          onItemsChange={setSelectedEmploymentType}
          singleSelect={false}
        />

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