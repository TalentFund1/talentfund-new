import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { Sidebar } from "@/components/Sidebar";
import { BenchmarkSkillsMatrix } from "@/components/benchmark/skills-matrix/BenchmarkSkillsMatrix";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import { useSearchParams } from "react-router-dom";

const EmployeeProfile = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card className="p-6 bg-white">
            <EmployeeHeader />
          </Card>

          <Tabs defaultValue={activeTab} className="w-full space-y-6">
            <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
              <TabsTrigger 
                value="profile" 
                className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="benchmark"
                className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
              >
                Role Benchmark
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <EmployeeDetails />
            </TabsContent>

            <TabsContent value="benchmark">
              <TrackProvider>
                <ToggledSkillsProvider>
                  <BenchmarkSkillsMatrix />
                </ToggledSkillsProvider>
              </TrackProvider>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;