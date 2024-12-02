import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";
import { SkillProfileTable } from "@/components/skills/SkillProfileTable";
import { useToggledSkills } from "@/components/skills/context/ToggledSkillsContext";
import { roleSkills } from '@/components/skills/data/roleSkills';
import { jobTitles } from '@/components/skills/competency/skillProfileData';
import { SkillProfileStats } from "@/components/skills/stats/SkillProfileStats";
import { SkillProfileFilters } from "@/components/skills/search/SkillProfileFilters";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { AddSkillProfileForm } from "@/components/skills/form/AddSkillProfileForm";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Define available occupations
const occupations = [
  "Software Developer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "DevOps Engineer",
  "System Architect",
  "Business Analyst",
  "Project Manager",
  "Quality Assurance Engineer"
];

const SkillsProfileContent = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<string>("");
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");
  const [selectedOccupation, setSelectedOccupation] = useState<string>("");
  const { toggledSkills } = useToggledSkills();

  const availableJobTitles = Object.keys(jobTitles).map(id => jobTitles[id]);
  const toggledSkillsList = Array.from(toggledSkills);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Skill Profiles</h1>
            <div className="space-x-2">
              <Button variant="outline">Export Data</Button>
              <TrackProvider>
                <AddSkillProfileForm />
              </TrackProvider>
            </div>
          </div>

          <SkillProfileFilters
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            selectedFunction={selectedFunction}
            setSelectedFunction={setSelectedFunction}
            selectedJobTitle={selectedJobTitle}
            setSelectedJobTitle={setSelectedJobTitle}
            selectedOccupation={selectedOccupation}
            setSelectedOccupation={setSelectedOccupation}
            toggledSkillsList={toggledSkillsList}
            availableJobTitles={availableJobTitles}
            companyFunctions={companyFunctions}
            occupations={occupations}
          />

          <SkillProfileStats />

          <Card className="p-6">
            <SkillProfileTable 
              selectedFunction={selectedFunction} 
              selectedSkills={selectedSkills}
              selectedJobTitle={selectedJobTitle}
              selectedOccupation={selectedOccupation}
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

const SkillsProfile = () => {
  return (
    <ToggledSkillsProvider>
      <SkillsProfileContent />
    </ToggledSkillsProvider>
  );
};

export default SkillsProfile;