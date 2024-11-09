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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
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