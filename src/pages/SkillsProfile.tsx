import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Users, Briefcase, Equal, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";
import { SkillProfileTable } from "@/components/skills/SkillProfileTable";
import { SearchFilter } from '@/components/market/SearchFilter';
import { technicalSkills, softSkills } from '@/components/skillsData';
import { jobTitles } from '@/components/skills/competency/skillProfileData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define company functions/departments
const companyFunctions = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Operations",
  "Legal",
  "Customer Success"
];

// Sample projects data - in a real app this would come from an API
const projects = [
  { id: "123", title: "AI Engineer", function: "Engineering", skillCount: 16, employees: 2, matches: "$180,178", lastUpdated: "10/20/24" },
  { id: "124", title: "Backend Engineer", function: "Engineering", skillCount: 12, employees: 3, matches: "$175,000", lastUpdated: "10/20/24" },
  { id: "125", title: "Frontend Engineer", function: "Engineering", skillCount: 17, employees: 0, matches: "$170,000", lastUpdated: "10/20/24" },
  { id: "126", title: "Engineering Manager", function: "Engineering", skillCount: 11, employees: 2, matches: "$190,000", lastUpdated: "10/20/24" }
];

const SkillsProfile = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<string>("");
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const allSkills = [...technicalSkills, ...softSkills];

  // Convert jobTitles object to array of titles
  const jobTitleOptions = Object.values(jobTitles);

  // Filter projects based on selected job titles
  const filteredProjects = projects.filter(project => {
    if (selectedJobTitles.length === 0) return true;
    return selectedJobTitles.some(title => project.title.toLowerCase() === title.toLowerCase());
  });

  console.log('Available job titles:', jobTitleOptions);
  console.log('Selected job titles:', selectedJobTitles);
  console.log('Selected skills:', selectedSkills);
  console.log('Filtered projects:', filteredProjects);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Skill Profiles</h1>
            <div className="space-x-2">
              <Button variant="outline">Export Data</Button>
              <Button>Add Profile</Button>
            </div>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              <SearchFilter
                label=""
                placeholder="Search skills..."
                items={allSkills}
                selectedItems={selectedSkills}
                onItemsChange={setSelectedSkills}
              />
              
              <div className="flex flex-wrap gap-3">
                <SearchFilter
                  label=""
                  placeholder="Job Title"
                  items={jobTitleOptions}
                  selectedItems={selectedJobTitles}
                  onItemsChange={setSelectedJobTitles}
                  className="w-[180px]"
                />
                
                <SearchFilter
                  label=""
                  placeholder="Function"
                  items={companyFunctions}
                  selectedItems={selectedFunction ? [selectedFunction] : []}
                  onItemsChange={(items) => setSelectedFunction(items[0] || "")}
                  singleSelect={true}
                  className="w-[180px]"
                />

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedSkills([]);
                    setSelectedFunction("");
                    setSelectedJobTitles([]);
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total number of Profiles"
              value={filteredProjects.length.toString()}
              icon={<Users className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Open Roles"
              value={filteredProjects.filter(p => p.employees === 0).length.toString()}
              icon={<Briefcase className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Share of Female Employees"
              value="50%"
              icon={<Equal className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Average Tenure (Years)"
              value="1.09"
              icon={<Clock className="h-6 w-6 text-primary-icon" />}
            />
          </div>

          <Card className="p-6">
            <SkillProfileTable 
              selectedFunction={selectedFunction}
              selectedJobTitles={selectedJobTitles}
              selectedSkills={selectedSkills}
            />

            <Separator className="my-4" />
            
            <div className="flex justify-between items-center">
              <Select defaultValue="10">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="10 rows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 rows</SelectItem>
                  <SelectItem value="20">20 rows</SelectItem>
                  <SelectItem value="50">50 rows</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">1-5 of 5</span>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsProfile;