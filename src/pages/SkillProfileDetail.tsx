import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Sidebar";
import { SkillProfileHeader } from "@/components/skills/SkillProfileHeader";
import { SkillProfileMatrix } from "@/components/skills/SkillProfileMatrix";
import { CompetencyGraph } from "@/components/skills/CompetencyGraph";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { TrackProvider } from "@/components/skills/context/TrackContext";

const SkillProfileDetail = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <ToggledSkillsProvider>
            <Card className="p-8 bg-white">
              <SkillProfileHeader jobTitle="AI Engineer" />
            </Card>

            <TrackProvider>
              <Tabs defaultValue="mapping" className="w-full space-y-6">
                <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
                  <TabsTrigger 
                    value="mapping" 
                    className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                  >
                    Skill Mapping
                  </TabsTrigger>
                  <TabsTrigger 
                    value="competency"
                    className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                  >
                    Competency Matrix
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="mapping" className="space-y-6">
                  <SkillProfileMatrix />
                </TabsContent>

                <TabsContent value="competency" className="space-y-6">
                  <CompetencyGraph />
                </TabsContent>
              </Tabs>
            </TrackProvider>
          </ToggledSkillsProvider>
        </div>
      </div>
    </div>
  );
};

export default SkillProfileDetail;