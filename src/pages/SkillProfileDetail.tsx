import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompetencyGraph } from "@/components/skills/CompetencyGraph";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";
import { useParams } from "react-router-dom";

const SkillProfileDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6">
      <TrackProvider>
        <ToggledSkillsProvider>
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="p-6 space-y-6">
              <CompetencyGraph roleId={id} />
              <Separator className="my-6" />
            </Card>
          </div>
        </ToggledSkillsProvider>
      </TrackProvider>
    </div>
  );
};

export default SkillProfileDetail;