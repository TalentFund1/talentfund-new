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
  // Programming Languages
  "JavaScript", "TypeScript", "Python", "Java", "C++", "Ruby", "Go", "Rust", "PHP", "Swift",
  
  // Web Development
  "React", "Angular", "Vue.js", "Next.js", "Node.js", "Express.js", "Django", "Flask",
  "HTML5", "CSS3", "Sass", "Tailwind CSS", "Bootstrap", "Material UI",
  
  // Database
  "SQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Oracle", "MySQL",
  
  // Cloud & DevOps
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "GitLab CI",
  "Terraform", "Ansible", "Linux", "Nginx", "Apache",
  
  // AI & ML
  "TensorFlow", "PyTorch", "Scikit-learn", "Natural Language Processing",
  "Computer Vision", "Machine Learning", "Deep Learning", "Data Science",
  
  // Mobile Development
  "React Native", "Flutter", "iOS Development", "Android Development",
  "Kotlin", "SwiftUI", "Mobile App Architecture",
  
  // Testing
  "Jest", "Cypress", "Selenium", "JUnit", "TestNG", "Mocha", "Testing Methodologies",
  
  // Version Control
  "Git", "GitHub", "Bitbucket", "GitLab", "Version Control Best Practices"
];

const softSkills = [
  // Leadership & Management
  "Team Leadership", "Project Management", "Strategic Planning", "Decision Making",
  "Conflict Resolution", "Change Management", "Performance Management",
  "Mentoring", "Coaching", "Team Building",
  
  // Communication
  "Verbal Communication", "Written Communication", "Public Speaking",
  "Presentation Skills", "Technical Writing", "Active Listening",
  "Interpersonal Communication", "Cross-cultural Communication",
  
  // Problem Solving
  "Critical Thinking", "Analytical Skills", "Problem Analysis",
  "Creative Problem Solving", "Research Skills", "Logical Reasoning",
  "Innovation", "Design Thinking",
  
  // Collaboration
  "Team Collaboration", "Cross-functional Collaboration", "Remote Collaboration",
  "Stakeholder Management", "Client Relations", "Partnership Building",
  
  // Work Management
  "Time Management", "Task Prioritization", "Organization Skills",
  "Meeting Management", "Deadline Management", "Multitasking",
  
  // Personal Development
  "Adaptability", "Learning Agility", "Growth Mindset", "Self-motivation",
  "Emotional Intelligence", "Resilience", "Work Ethics", "Initiative",
  
  // Business Skills
  "Business Acumen", "Strategic Thinking", "Requirements Gathering",
  "Process Improvement", "Risk Management", "Quality Assurance",
  
  // Customer Focus
  "Customer Service", "User Experience", "Client Communication",
  "Needs Assessment", "Customer Feedback Management"
];

export const EmployeeFilters = () => {
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Input
          type="text"
          placeholder="Search Skills..."
          className="bg-white"
          value={selectedSkill}
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
                  <CommandItem
                    key={skill}
                    onSelect={() => {
                      setSelectedSkill(skill);
                      setOpen(false);
                    }}
                  >
                    {skill}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Soft Skills">
                {softSkills.map((skill) => (
                  <CommandItem
                    key={skill}
                    onSelect={() => {
                      setSelectedSkill(skill);
                      setOpen(false);
                    }}
                  >
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