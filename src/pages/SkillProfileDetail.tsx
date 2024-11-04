import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillProfileHeader } from "@/components/skills/SkillProfileHeader";
import { SkillProfileEmployees } from "@/components/skills/SkillProfileEmployees";
import { SkillProfileMatrix } from "@/components/skills/SkillProfileMatrix";

const SkillProfileDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 space-y-6 p-6 ml-16 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white border-border hover:bg-background"
          onClick={() => navigate('/skills')}
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-2 bg-white rounded-lg border border-border px-3 py-1.5">
          <ChevronLeft className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" />
          <span className="text-sm text-foreground">2/7</span>
          <ChevronRight className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" />
        </div>
      </div>

      <Card className="p-8 bg-white">
        <SkillProfileHeader />
        <Separator className="my-8" />
        <SkillProfileEmployees />
      </Card>

      <Tabs defaultValue="skills" className="w-full space-y-6">
        <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
          <TabsTrigger 
            value="skills" 
            className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
          >
            Skills Intelligence
          </TabsTrigger>
          <TabsTrigger 
            value="matrix"
            className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
          >
            Competency Matrix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills">
          <SkillProfileMatrix />
        </TabsContent>

        <TabsContent value="matrix">
          <SkillProfileMatrix />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillProfileDetail;