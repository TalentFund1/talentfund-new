import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Users, Briefcase, Equal, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";
import { SkillProfileTable } from "@/components/skills/SkillProfileTable";
import { SearchFilter } from '@/components/market/SearchFilter';
import { technicalSkills, softSkills } from '@/components/skillsData';
import { useToggledSkills } from "@/components/skills/context/ToggledSkillsContext";
import { roleSkills } from '@/components/skills/data/roleSkills';

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

const SkillsProfile = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<string>("");
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");
  const { toggledSkills } = useToggledSkills();
  const allSkills = [...technicalSkills, ...softSkills];

  // Filter skills to only show toggled ones
  const toggledSkillsList = Array.from(toggledSkills);

  // Filter profiles based on selected skills and other filters
  const filterProfiles = (profiles: any[]) => {
    return profiles.filter(profile => {
      const matchesFunction = !selectedFunction || profile.function.toLowerCase() === selectedFunction.toLowerCase();
      const matchesJobTitle = !selectedJobTitle || profile.name.toLowerCase() === selectedJobTitle.toLowerCase();
      
      // Check if profile has any of the selected skills
      const profileSkillsData = roleSkills[profile.id as keyof typeof roleSkills];
      if (!profileSkillsData || Array.isArray(profileSkillsData)) {
        return false;
      }

      const allProfileSkills = [
        ...(profileSkillsData.specialized || []),
        ...(profileSkillsData.common || []),
        ...(profileSkillsData.certifications || [])
      ];

      const hasSelectedSkills = selectedSkills.length === 0 || selectedSkills.some(skill => 
        allProfileSkills.some(profileSkill => 
          profileSkill.title.toLowerCase().includes(skill.toLowerCase())
        )
      );

      return matchesFunction && matchesJobTitle && hasSelectedSkills;
    });
  };

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
            <div className="space-y-4">
              <SearchFilter
                label=""
                placeholder="Search skills..."
                items={toggledSkillsList}
                selectedItems={selectedSkills}
                onItemsChange={setSelectedSkills}
              />
              
              <div className="flex flex-wrap gap-3">
                <Select value={selectedJobTitle} onValueChange={setSelectedJobTitle}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Job Title" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(roleSkills).map((_, index) => (
                      <SelectItem key={index} value={`Role ${index + 1}`}>
                        Role {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Function" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyFunctions.map((func) => (
                      <SelectItem key={func} value={func.toLowerCase()}>
                        {func}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedSkills([]);
                    setSelectedFunction("");
                    setSelectedJobTitle("");
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
              value="56"
              icon={<Users className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Open Roles"
              value="5"
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
              selectedSkills={selectedSkills}
              selectedJobTitle={selectedJobTitle}
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
                <span className="text-sm text-gray-600">1-5 of 5</span>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="w-8 h-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-8 h-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsProfile;