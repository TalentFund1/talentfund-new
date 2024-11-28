import { Card } from "@/components/ui/card";
import { SkillProfileHeader } from "@/components/skills/SkillProfileHeader";
import { SkillProfileMatrix } from "@/components/skills/SkillProfileMatrix";
import { SkillProfileEmployees } from "@/components/skills/SkillProfileEmployees";
import { Sidebar } from "@/components/Sidebar";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";

const SkillsProfile = () => {
  return (
    <ToggledSkillsProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-6 ml-16">
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="p-8 bg-white">
              <SkillProfileHeader />
            </Card>
            <SkillProfileMatrix />
            <SkillProfileEmployees />
          </div>
        </div>
      </div>
    </ToggledSkillsProvider>
  );
};

export default SkillsProfile;