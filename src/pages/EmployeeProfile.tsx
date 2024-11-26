import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useSearchParams } from "react-router-dom";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { Sidebar } from "@/components/Sidebar";
import { SkillsMatrix } from "@/components/benchmark/SkillsMatrix";
import { BenchmarkSkillsMatrix } from "@/components/benchmark/BenchmarkSkillsMatrix";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";
import { EMPLOYEE_IMAGES } from "@/components/employee/EmployeeData";

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);
  
  console.log('Rendering EmployeeProfile with ID:', id);
  
  if (!id) {
    return <div>Employee ID not found</div>;
  }

  const employee = getEmployeeById(id);
  
  if (!employee) {
    return <div>Employee not found</div>;
  }

  // Find image for employee based on index
  const employeeIndex = parseInt(id) % EMPLOYEE_IMAGES.length;
  const employeeImage = EMPLOYEE_IMAGES[employeeIndex];

  const headerEmployee = {
    name: employee.name,
    role: employee.role,
    location: employee.location,
    image: employeeImage
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <ToggledSkillsProvider>
        <TrackProvider>
          <div className="flex-1 p-6 ml-16 transition-all duration-300">
            <div className="max-w-7xl mx-auto space-y-6">
              <EmployeeHeader 
                id={id} 
                employee={headerEmployee}
              />

              <Tabs defaultValue={defaultTab} className="w-full space-y-6">
                <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
                  <TabsTrigger 
                    value="profile" 
                    className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="skills" 
                    className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                  >
                    Skills Matrix
                  </TabsTrigger>
                  <TabsTrigger 
                    value="benchmark"
                    className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                  >
                    Role Benchmark
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card className="p-6">
                    <EmployeeDetails 
                      employee={employee}
                      id={id}
                    />
                  </Card>
                </TabsContent>

                <TabsContent value="skills">
                  <Card className="p-6">
                    <SkillsMatrix id={id} />
                  </Card>
                </TabsContent>

                <TabsContent value="benchmark">
                  <BenchmarkSkillsMatrix id={id} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </TrackProvider>
      </ToggledSkillsProvider>
    </div>
  );
};

export default EmployeeProfile;