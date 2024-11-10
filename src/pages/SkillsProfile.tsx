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
import { SkillProfileItem } from "@/components/skills/types";

const SkillsProfile = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const allSkills = [...technicalSkills, ...softSkills];

  // Sample skills data for the table
  const skillsData: SkillProfileItem[] = [
    {
      title: "Software Development",
      subcategory: "Engineering",
      level: "advanced",
      growth: "23%",
      salary: "$180,000",
      benchmarks: { J: true, B: true, O: true }
    },
    {
      title: "Python",
      subcategory: "Programming",
      level: "intermediate",
      growth: "25%",
      salary: "$150,000",
      benchmarks: { J: true, B: true, O: false }
    }
  ];

  const handleSkillToggle = (skillTitle: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillTitle) 
        ? prev.filter(title => title !== skillTitle)
        : [...prev, skillTitle]
    );
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
                items={allSkills}
                selectedItems={selectedSkills}
                onItemsChange={setSelectedSkills}
              />
              
              <div className="flex flex-wrap gap-3">
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Job Title" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Function" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
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
              skills={skillsData}
              selectedSkills={selectedSkills}
              onSkillToggle={handleSkillToggle}
            />

            <Separator className="my-4" />
            
            <div className="flex justify-between items-center">
              <Select>
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