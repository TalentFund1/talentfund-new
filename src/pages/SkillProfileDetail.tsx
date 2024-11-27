import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";
import { SkillProfileHeader } from "@/components/skills/SkillProfileHeader";
import { SkillProfileMatrix } from "@/components/skills/SkillProfileMatrix";
import { SkillProfileEmployees } from "@/components/skills/SkillProfileEmployees";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";

const SkillProfileDetail = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <ToggledSkillsProvider>
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="p-6">
              <SkillProfileHeader jobTitle="Engineering Manager" />
              <Separator className="my-6" />
              <SkillProfileMatrix />
            </Card>
            <SkillProfileEmployees />
          </div>
        </ToggledSkillsProvider>
      </div>
    </div>
  );
};

export default SkillProfileDetail;