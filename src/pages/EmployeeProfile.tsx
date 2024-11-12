import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Sidebar";
import { SkillsSummary } from "@/components/skills/SkillsSummary";
import { RoleBenchmark } from "@/components/benchmark/RoleBenchmark";
import { BenchmarkAnalysis } from "@/components/benchmark/BenchmarkAnalysis";
import { SkillsMatrix } from "@/components/benchmark/SkillsMatrix";
import { SelectedSkillsProvider } from "@/components/skills/context/SelectedSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import { BenchmarkSearchProvider } from "@/components/skills/context/BenchmarkSearchContext";
import { useParams } from "react-router-dom";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";

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
  const employee = employees[id as keyof typeof employees];

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <SelectedSkillsProvider>
            <TrackProvider>
              <BenchmarkSearchProvider>
                <Card className="p-8 bg-white">
                  <EmployeeHeader id={id || ""} employee={employee} />
                  <EmployeeDetails employee={employee} />
                </Card>

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
                    <BenchmarkAnalysis />
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
