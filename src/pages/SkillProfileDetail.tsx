import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/Sidebar";
import { CompetencyGraph } from "@/components/skills/CompetencyGraph";
import { BenchmarkSkillsMatrix } from "@/components/benchmark/BenchmarkSkillsMatrix";
import { SkillProfileHeader } from "@/components/skills/SkillProfileHeader";
import { SkillProfileMatrix } from "@/components/skills/SkillProfileMatrix";
import { ToggledSkillsProvider } from "@/components/skills/context/ToggledSkillsContext";
import { useParams } from "react-router-dom";
import { jobTitles } from "@/components/skills/competency/skillProfileData";

const SkillProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const jobTitle = jobTitles[id as keyof typeof jobTitles] || "AI Engineer";

  console.log('Rendering SkillProfileDetail for role:', { id, jobTitle });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <ToggledSkillsProvider>
            <Card className="p-8 bg-white">
              <SkillProfileHeader jobTitle={jobTitle} />
            </Card>

            <Tabs defaultValue="skills" className="w-full space-y-6">
              <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
                <TabsTrigger 
                  value="skills" 
                  className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger 
                  value="competency"
                  className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                >
                  Competency Matrix
                </TabsTrigger>
                <TabsTrigger 
                  value="benchmark"
                  className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
                >
                  Benchmark Matrix
                </TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="space-y-6">
                <SkillProfileMatrix />
              </TabsContent>

              <TabsContent value="competency" className="space-y-6">
                <CompetencyGraph />
              </TabsContent>

              <TabsContent value="benchmark" className="space-y-6">
                <BenchmarkSkillsMatrix />
              </TabsContent>
            </Tabs>
          </ToggledSkillsProvider>
        </div>
      </div>
    </div>
  );
};

export default SkillProfileDetail;