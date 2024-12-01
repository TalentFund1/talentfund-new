import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { SkillProfileHeader } from "@/components/skills/SkillProfileHeader";
import { BenchmarkSkillsMatrix } from "@/components/benchmark/BenchmarkSkillsMatrix";
import { EmployeeOverview } from "@/components/skills/EmployeeOverview";
import { useParams } from "react-router-dom";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";

const SkillProfileDetail = () => {
  const { id } = useParams();
  const jobTitle = id === "123" ? "AI Engineer" 
    : id === "124" ? "Backend Engineer"
    : id === "125" ? "Frontend Engineer"
    : id === "126" ? "Engineering Manager"
    : "AI Engineer";

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <TrackProvider>
        <ToggledSkillsProvider>
          <div className="flex-1 p-6 ml-16 transition-all duration-300">
            <div className="max-w-7xl mx-auto space-y-6">
              <Card className="p-6">
                <SkillProfileHeader jobTitle={jobTitle} />
              </Card>

              <BenchmarkSkillsMatrix />

              <EmployeeOverview />
            </div>
          </div>
        </ToggledSkillsProvider>
      </TrackProvider>
    </div>
  );
};

export default SkillProfileDetail;