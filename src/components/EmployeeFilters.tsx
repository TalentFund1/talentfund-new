import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const EmployeeFilters = () => {
  return (
    <div className="space-y-4">
      <Input id="search" type="search" placeholder="Search Skills..." className="max-w-sm bg-white" />
      
      <div className="flex flex-wrap gap-4">
        <Select>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Job Title" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="engineer">Engineer</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="p4">P4</SelectItem>
            <SelectItem value="m3">M3</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Office" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="canada">Canada</SelectItem>
            <SelectItem value="us">US</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Employment Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="fulltime">Full Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">Clear All</Button>
      </div>
    </div>
  );
};