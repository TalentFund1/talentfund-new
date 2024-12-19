import { Card } from "@/components/ui/card";
import { SkillProfileHeader } from "@/components/skills/SkillProfileHeader";
import { CompetencyGraph } from "@/components/CompetencyGraph";
import { SkillProfileEmployees } from "@/components/skills/SkillProfileEmployees";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import { roleSkills } from "@/components/skills/data/roleSkills";
import { useParams } from "react-router-dom";

const SkillProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const currentRole = roleSkills[id as keyof typeof roleSkills];
  
  console.log('SkillProfileDetail rendering:', {
    roleId: id,
    roleTitle: currentRole?.title
  });

  if (!currentRole) {
    return <div>Role not found</div>;
  }

  return (
    <ToggledSkillsProvider>
      <TrackProvider>
        <div className="p-6 space-y-6">
          <Card className="p-8 bg-white">
            <SkillProfileHeader jobTitle={currentRole.title} />
          </Card>

          <CompetencyGraph />
          
          <SkillProfileEmployees />
        </div>
      </TrackProvider>
    </ToggledSkillsProvider>
  );
};

export default SkillProfileDetail;