import { Sidebar } from "@/components/Sidebar";
import { EmployeeDetails } from "@/components/employee/EmployeeDetails";
import { useParams } from "react-router-dom";
import { RoleBenchmark } from "@/components/benchmark/RoleBenchmark";
import { SkillsOverview } from "@/components/SkillsOverview";
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
          <EmployeeDetails id={id} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkillsOverview id={id} />
            <ToggledSkillsProvider>
              <TrackProvider>
                <RoleBenchmark />
              </TrackProvider>
            </ToggledSkillsProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;