import { useParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import SkillProfileHeader from "@/components/skills/SkillProfileHeader";
import { SkillProfileMatrix } from "@/components/skills/SkillProfileMatrix";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { jobTitles } from "@/components/skills/competency/skillProfileData";

const SkillProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const jobTitle = id ? jobTitles[id] : "AI Engineer";

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <ToggledSkillsProvider>
            <SkillProfileHeader jobTitle={jobTitle} />
            <SkillProfileMatrix />
          </ToggledSkillsProvider>
        </div>
      </div>
    </div>
  );
};

export default SkillProfileDetail;