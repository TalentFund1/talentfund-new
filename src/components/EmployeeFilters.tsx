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
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const allSkills = [...technicalSkills, ...softSkills];

  return (
    <div className="space-y-4">
      <SearchFilter
        label=""
        placeholder="Search skills..."
        items={allSkills}
        selectedItems={selectedSkills}
        onItemsChange={setSelectedSkills}
      />
      
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

        <Button 
          variant="outline" 
          onClick={() => setSelectedSkills([])}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};
