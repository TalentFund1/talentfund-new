import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Sidebar";
import { SkillsSummary } from "@/components/skills/SkillsSummary";
import { RoleBenchmark } from "@/components/benchmark/RoleBenchmark";
import { BenchmarkSkillsMatrix } from "@/components/benchmark/BenchmarkSkillsMatrix";
import { SkillsMatrix } from "@/components/benchmark/SkillsMatrix";
import { SelectedSkillsProvider } from "@/components/skills/context/SelectedSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import { BenchmarkSearchProvider } from "@/components/skills/context/BenchmarkSearchContext";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BenchmarkAnalysis } from "@/components/benchmark/BenchmarkAnalysis";

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

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees[id as keyof typeof employees];

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    const employeeIds = Object.keys(employees);
    const currentIndex = employeeIds.indexOf(id || "123");
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : employeeIds.length - 1;
    } else {
      newIndex = currentIndex < employeeIds.length - 1 ? currentIndex + 1 : 0;
    }
    
    navigate(`/employee/${employeeIds[newIndex]}`);
  };

  const currentIndex = Object.keys(employees).indexOf(id || "123") + 1;
  const totalEmployees = Object.keys(employees).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-white border-border hover:bg-background"
              onClick={() => navigate('/employees')}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <div className="flex items-center gap-2 bg-white rounded-lg border border-border px-3 py-1.5">
              <ChevronLeft 
                className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" 
                onClick={() => handleNavigation('prev')}
              />
              <span className="text-sm text-foreground">{currentIndex}/{totalEmployees}</span>
              <ChevronRight 
                className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" 
                onClick={() => handleNavigation('next')}
              />
            </div>
          </div>

          <Card className="p-8 bg-white">
            <EmployeeHeader id={id || ""} employee={employee} />
            <EmployeeDetails employee={employee} />
          </Card>

          <SelectedSkillsProvider>
            <TrackProvider>
              <BenchmarkSearchProvider>
                <Tabs defaultValue="experience" className="w-full space-y-6">
                  <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
                    <TabsTrigger 
                      value="experience" 
                      className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                    >
                      Skills Summary
                    </TabsTrigger>
                    <TabsTrigger 
                      value="benchmark"
                      className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                    >
                      Role Benchmark
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="experience" className="space-y-6">
                    <Card className="p-8 bg-white">
                      <SkillsSummary />
                    </Card>
                    <SkillsMatrix />
                  </TabsContent>

                  <TabsContent value="benchmark" className="space-y-6">
                    <Card className="p-8 bg-white">
                      <RoleBenchmark />
                    </Card>
                    <BenchmarkAnalysis selectedRole="125" selectedLevel="p4" />
                    <SkillsMatrix />
                  </TabsContent>
                </Tabs>
              </BenchmarkSearchProvider>
            </TrackProvider>
          </SelectedSkillsProvider>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
