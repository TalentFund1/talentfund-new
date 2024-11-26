import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { BenchmarkSkillsMatrix } from "@/components/benchmark/BenchmarkSkillsMatrix";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import { useEmployeeStore } from "@/components/employee/store/employeeStore";
import { EMPLOYEE_IMAGES } from "@/components/employee/EmployeeData";

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmployeeById } = useEmployeeStore();

  if (!id) {
    return <div>Employee not found</div>;
  }

  const employee = getEmployeeById(id);
  const imageIndex = parseInt(id) % EMPLOYEE_IMAGES.length;
  const employeeWithImage = employee ? {
    ...employee,
    image: EMPLOYEE_IMAGES[imageIndex]
  } : undefined;

  if (!employeeWithImage) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <TrackProvider>
            <ToggledSkillsProvider>
              <Card className="p-6 bg-white">
                <EmployeeHeader employee={employeeWithImage} id={id} />
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <EmployeeDetails employee={employeeWithImage} id={id} />
                </div>
                <div className="lg:col-span-2">
                  <Card className="p-6 bg-white">
                    <BenchmarkSkillsMatrix id={id} />
                  </Card>
                </div>
              </div>
            </ToggledSkillsProvider>
          </TrackProvider>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;