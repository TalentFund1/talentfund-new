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
import { SkillsMatrixSearchProvider } from "@/components/skills/context/SkillsMatrixSearchContext";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";

const employeeImages = {
  "123": "photo-1488590528505-98d2b5aba04b",
  "124": "photo-1518770660439-4636190af475",
  "125": "photo-1461749280684-dccba630e2f6",
  "126": "photo-1486312338219-ce68d2c6f44d"
};

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);
  const [employee, setEmployee] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const foundEmployee = getEmployeeById(id || "");
    const employees = useEmployeeStore.getState().employees;
    
    if (!foundEmployee) {
      console.log('Employee not found, redirecting to employees page');
      toast({
        title: "Employee Not Found",
        description: "The requested employee profile does not exist.",
        variant: "destructive"
      });
      navigate('/employees');
      return;
    }

    setEmployee(foundEmployee);
    setEmployeeData({
      name: foundEmployee.name,
      role: foundEmployee.role,
      location: foundEmployee.location,
      department: foundEmployee.department,
      office: foundEmployee.office,
      category: foundEmployee.category,
      manager: foundEmployee.manager,
      startDate: foundEmployee.startDate,
      termDate: foundEmployee.termDate,
      tenure: "1.9",
      image: employeeImages[id as keyof typeof employeeImages]
    });

    setCurrentIndex(employees.findIndex(emp => emp.id === id) + 1);
    setTotalEmployees(employees.length);
  }, [id, getEmployeeById, navigate, toast]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    const employees = useEmployeeStore.getState().employees;
    const employeeIds = employees.map(emp => emp.id);
    const currentIndex = employeeIds.indexOf(id || "123");
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : employeeIds.length - 1;
    } else {
      newIndex = currentIndex < employeeIds.length - 1 ? currentIndex + 1 : 0;
    }
    
    navigate(`/employee/${employeeIds[newIndex]}`);
  };

  console.log('Employee Profile Data:', {
    id,
    employee: employeeData,
    startDate: employee?.startDate
  });

  // Render loading state or nothing while data is being fetched
  if (!employee || !employeeData) {
    return null;
  }

  return (
    <ToggledSkillsProvider>
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

            <TrackProvider>
              <Card className="p-8 bg-white">
                <EmployeeHeader id={id || ""} employee={employeeData} />
                <EmployeeDetails employee={employeeData} id={id || ""} />
              </Card>
            </TrackProvider>

            <TrackProvider>
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
                  <SelectedSkillsProvider>
                    <SkillsMatrixSearchProvider>
                      <Card className="p-8 bg-white">
                        <SkillsSummary />
                      </Card>
                      <SkillsMatrix />
                    </SkillsMatrixSearchProvider>
                  </SelectedSkillsProvider>
                </TabsContent>

                <TabsContent value="benchmark" className="space-y-6">
                  <BenchmarkSearchProvider>
                    <SelectedSkillsProvider>
                      <Card className="p-8 bg-white">
                        <RoleBenchmark />
                      </Card>
                      <BenchmarkSkillsMatrix />
                    </SelectedSkillsProvider>
                  </BenchmarkSearchProvider>
                </TabsContent>
              </Tabs>
            </TrackProvider>
          </div>
        </div>
      </div>
    </ToggledSkillsProvider>
  );
};

export default EmployeeProfile;