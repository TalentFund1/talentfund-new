import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const technicalSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "AWS",
  "Docker",
  "Kubernetes",
  "SQL",
  "MongoDB",
  "GraphQL",
  "REST APIs",
  "Git",
  "CI/CD",
];

const softSkills = [
  "Leadership",
  "Communication",
  "Problem Solving",
  "Team Collaboration",
  "Time Management",
  "Adaptability",
  "Critical Thinking",
  "Conflict Resolution",
  "Project Management",
  "Mentoring",
];

export const EmployeeFilters = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Input
          type="search"
          placeholder="Search Skills..."
          className="bg-white"
          onClick={() => setOpen(true)}
          readOnly
        />
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search skills..." />
            <CommandList>
              <CommandEmpty>No skills found.</CommandEmpty>
              <CommandGroup heading="Technical Skills">
                {technicalSkills.map((skill) => (
                  <CommandItem key={skill} onSelect={() => {
                    console.log(`Selected: ${skill}`);
                    setOpen(false);
                  }}>
                    {skill}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Soft Skills">
                {softSkills.map((skill) => (
                  <CommandItem key={skill} onSelect={() => {
                    console.log(`Selected: ${skill}`);
                    setOpen(false);
                  }}>
                    {skill}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
      
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