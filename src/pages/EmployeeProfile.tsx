import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { BenchmarkSkillsMatrix } from "@/components/benchmark/BenchmarkSkillsMatrix";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
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
                <EmployeeHeader employeeId={id} />
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <EmployeeDetails employeeId={id} />
                </div>
                <div className="lg:col-span-2">
                  <Card className="p-6 bg-white">
                    <BenchmarkSkillsMatrix employeeId={id} />
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