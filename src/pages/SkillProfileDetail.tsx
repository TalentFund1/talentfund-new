import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillProfileHeader } from "@/components/skills/SkillProfileHeader";
import { SkillProfileMatrix } from "@/components/skills/SkillProfileMatrix";
import { EmployeeOverview } from "@/components/skills/EmployeeOverview";
import { SelectBenchmark } from "@/components/benchmark/SelectBenchmark";
import { CompetencyGraph } from "@/components/skills/CompetencyGraph";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "@/components/ui/toast";
import { Sidebar } from "@/components/Sidebar";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { Separator } from "@/components/ui/separator";
import { roleSkills } from "../components/skills/data/roleSkills";

const SkillProfileDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [track, setTrack] = useState<"Professional" | "Managerial">("Professional");

  const currentRole = roleSkills[id as keyof typeof roleSkills];
  const jobTitle = currentRole ? currentRole.occupation : "AI Engineer";

  const handleTrackChange = (newTrack: "Professional" | "Managerial") => {
    setTrack(newTrack);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    const profileIds = Object.keys(roleSkills);
    const currentIndex = profileIds.indexOf(id || "123");
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : profileIds.length - 1;
    } else {
      newIndex = currentIndex < profileIds.length - 1 ? currentIndex + 1 : 0;
    }
    
    navigate(`/skills/${profileIds[newIndex]}`);
  };

  const currentIndex = Object.keys(roleSkills).indexOf(id || "123") + 1;
  const totalProfiles = Object.keys(roleSkills).length;

  return (
    <ToastProvider>
      <TooltipProvider>
        <TrackProvider>
          <ToggledSkillsProvider>
            <div className="flex min-h-screen bg-background">
              <Sidebar />
              <div className="flex-1 p-6 ml-16 transition-all duration-300">
                <div className="max-w-7xl mx-auto space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 bg-white border-border hover:bg-background"
                      onClick={() => navigate('/skills')}
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-border px-3 py-1.5">
                      <ChevronLeft 
                        className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" 
                        onClick={() => handleNavigation('prev')}
                      />
                      <span className="text-sm text-foreground">{currentIndex}/{totalProfiles}</span>
                      <ChevronRight 
                        className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" 
                        onClick={() => handleNavigation('next')}
                      />
                    </div>
                  </div>

                  <Card className="p-8 bg-white">
                    <SkillProfileHeader jobTitle={jobTitle} />
                  </Card>

                  <EmployeeOverview />

                  <Tabs defaultValue="skills" className="w-full space-y-6">
                    <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
                      <TabsTrigger 
                        value="skills" 
                        className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                      >
                        Skills Intelligence
                      </TabsTrigger>
                      <TabsTrigger 
                        value="graph"
                        className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                      >
                        Competency Matrix
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="skills">
                      <SelectBenchmark />
                      <SkillProfileMatrix />
                    </TabsContent>

                    <TabsContent value="graph">
                      <Card className="p-6 bg-white">
                        <CompetencyGraph track={track} />
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </ToggledSkillsProvider>
        </TrackProvider>
      </TooltipProvider>
    </ToastProvider>
  );
};

export default SkillProfileDetail;
