import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { SkillsSummary } from "@/components/skills/SkillsSummary";
import { RoleBenchmark } from "@/components/benchmark/RoleBenchmark";
import { BenchmarkAnalysis } from "@/components/benchmark/BenchmarkAnalysis";
import { SkillsMatrix } from "@/components/benchmark/SkillsMatrix";
import { Sidebar } from "@/components/Sidebar";
import { SelectedSkillsProvider } from "@/components/skills/context/SelectedSkillsContext";
import { ToastProvider } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TrackProvider } from "@/components/skills/context/TrackContext";

const employees = {
  "123": {
    name: "Victor Smith",
    role: "AI Engineer: P4",
    location: "Toronto, ON",
    department: "Engineering",
    office: "Toronto",
    category: "Full-time",
    manager: "Sarah Chen",
    startDate: "2024-01-01",
    termDate: "-",
    tenure: "1.9",
    image: "photo-1488590528505-98d2b5aba04b"
  },
  "124": {
    name: "Jennie Richards",
    role: "Backend Engineer: P4",
    location: "Toronto, ON",
    department: "Engineering",
    office: "Toronto",
    category: "Full-time",
    manager: "Sarah Chen",
    startDate: "2024-01-01",
    termDate: "-",
    tenure: "1.9",
    image: "photo-1518770660439-4636190af475"
  },
  "125": {
    name: "Anna Vyselva",
    role: "Frontend Developer: P4",
    location: "Toronto, ON",
    department: "Engineering",
    office: "Toronto",
    category: "Full-time",
    manager: "Sarah Chen",
    startDate: "2024-01-01",
    termDate: "-",
    tenure: "1.9",
    image: "photo-1461749280684-dccba630e2f6"
  },
  "126": {
    name: "Suz Manu",
    role: "Engineering Manager: M3",
    location: "Toronto, ON",
    department: "Engineering",
    office: "Toronto",
    category: "Full-time",
    manager: "Sarah Chen",
    startDate: "2024-01-01",
    termDate: "-",
    tenure: "1.9",
    image: "photo-1486312338219-ce68d2c6f44d"
  }
};

const SkillProfileDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const employee = employees[id as keyof typeof employees];

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <ToastProvider>
      <TooltipProvider>
        <TrackProvider>
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
                    <ChevronLeft className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" />
                    <span className="text-sm text-foreground">2/7</span>
                    <ChevronRight className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" />
                  </div>
                </div>

                <Card className="p-8 bg-white">
                  <SkillProfileHeader id={id} jobTitle={jobTitle} />
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
                    <RoleBenchmarkWrapper />
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
        </TrackProvider>
      </TooltipProvider>
    </ToastProvider>
  );
};

export default SkillProfileDetail;
