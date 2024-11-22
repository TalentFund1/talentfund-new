import { SearchFilter } from '@/components/market/SearchFilter';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const jobTitles = [
  { id: "123", title: "AI Engineer" },
  { id: "124", title: "Backend Engineer" },
  { id: "125", title: "Frontend Engineer" },
  { id: "126", title: "Engineering Manager" },
  { id: "127", title: "Software Engineer" },
  { id: "128", title: "Product Manager" },
  { id: "129", title: "Designer" },
  { id: "130", title: "Data Scientist" },
  { id: "131", title: "DevOps Engineer" }
];

export const EmployeeFilters = () => {
  const [selectedJobTitle, setSelectedJobTitle] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("");

  const handleClearAll = () => {
    setSelectedJobTitle([]);
    setSelectedLevel("");
    setSelectedOffice("");
    setSelectedDepartment("");
    setSelectedEmploymentType("");
  };

  return (
    <div className="space-y-4">
      <SearchFilter
        label=""
        placeholder="Search skills..."
        items={[]}
        selectedItems={[]}
        onItemsChange={() => {}}
      />
      
      <div className="flex flex-wrap gap-3">
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Job Title" />
          </SelectTrigger>
          <SelectContent>
            {jobTitles.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                <Link 
                  to={`/skills/${job.id}`}
                  className="text-primary hover:text-primary-accent transition-colors"
                >
                  {job.title}
                </Link>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p1">P1</SelectItem>
            <SelectItem value="p2">P2</SelectItem>
            <SelectItem value="p3">P3</SelectItem>
            <SelectItem value="p4">P4</SelectItem>
            <SelectItem value="p5">P5</SelectItem>
            <SelectItem value="p6">P6</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedOffice} onValueChange={setSelectedOffice}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Office" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toronto">Toronto</SelectItem>
            <SelectItem value="vancouver">Vancouver</SelectItem>
            <SelectItem value="montreal">Montreal</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="product">Product</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedEmploymentType} onValueChange={setSelectedEmploymentType}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Employment Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};