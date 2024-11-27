import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useSearchParams } from "react-router-dom";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { BenchmarkSkillsMatrix } from "@/components/benchmark/BenchmarkSkillsMatrix";
import { RoleBenchmark } from "@/components/benchmark/RoleBenchmark";
import { Sidebar } from "@/components/Sidebar";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';

  if (!id) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <ToggledSkillsProvider>
        <div className="flex-1 p-6 ml-16 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="p-6 bg-white">
              <EmployeeHeader employeeId={id} />
            </Card>

            <Tabs defaultValue={defaultTab} className="w-full space-y-6">
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
                  Benchmark
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="p-6 bg-white">
                  <EmployeeDetails employeeId={id} />
                </Card>
              </TabsContent>

              <TabsContent value="benchmark">
                <RoleBenchmark />
                <BenchmarkSkillsMatrix />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ToggledSkillsProvider>
    </div>
  );
};

export default EmployeeProfile;