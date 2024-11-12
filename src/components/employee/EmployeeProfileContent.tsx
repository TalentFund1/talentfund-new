import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillsSummary } from "@/components/skills/SkillsSummary";
import { RoleBenchmark } from "@/components/benchmark/RoleBenchmark";
import { SkillsMatrix } from "@/components/benchmark/SkillsMatrix";
import { BenchmarkAnalysis } from "@/components/benchmark/BenchmarkAnalysis";

interface EmployeeProfileContentProps {
  employee: any;
  id: string;
}

export const EmployeeProfileContent = ({ employee, id }: EmployeeProfileContentProps) => {
  return (
    <Tabs defaultValue="experience" className="w-full space-y-6">
      <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
        <TabsTrigger 
          value="experience" 
          className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
        >
          Skills Summary
        </TabsTrigger>
        <TabsTrigger 
          value="benchmark"
          className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
        >
          Role Benchmark
        </TabsTrigger>
      </TabsList>

      <TabsContent value="experience" className="space-y-6">
        <Card className="p-8 bg-white">
          <SkillsSummary />
        </Card>
        <SkillsMatrix />
      </TabsContent>

      <TabsContent value="benchmark" className="space-y-6">
        <Card className="p-8 bg-white">
          <RoleBenchmark />
        </Card>
        <BenchmarkAnalysis />
        <SkillsMatrix />
      </TabsContent>
    </Tabs>
  );
};