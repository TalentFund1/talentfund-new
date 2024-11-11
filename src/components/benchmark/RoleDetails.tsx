import { Card } from "@/components/ui/card";
import { roleSkills } from "@/components/skills/data/roleSkills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleDescriptionCard } from "./role-details/RoleDescriptionCard";
import { SkillsTable } from "./role-details/SkillsTable";

interface RoleDetailsProps {
  role: {
    id: string;
    title: string;
    track: string;
    level: string;
  };
}

export const RoleDetails = ({ role }: RoleDetailsProps) => {
  const roleId = role.id.split('-')[1];
  const skills = roleSkills[roleId as keyof typeof roleSkills];

  const descriptions = {
    "AI Engineer": "An AI Engineer specializes in developing and implementing artificial intelligence and machine learning solutions. They work with various AI frameworks and tools to create intelligent systems.",
    "Backend Engineer": "A Backend Engineer focuses on server-side development, creating and maintaining the core computational logic and databases that power web applications.",
    "Frontend Engineer": "A Frontend Engineer specializes in creating user interfaces and implementing visual elements that users interact with in web applications.",
    "Engineering Manager": "An Engineering Manager leads technical teams, oversees project delivery, and ensures alignment between technical implementation and business objectives."
  };

  const levelDescriptions = {
    "P1": "Entry Level - Developing foundational skills and working under close supervision",
    "P2": "Junior Level - Growing independence and taking on small projects",
    "P3": "Mid Level - Working independently on medium-sized projects",
    "P4": "Senior Level - Leading complex projects and mentoring others",
    "P5": "Staff Level - Driving technical direction and architecture",
    "P6": "Principal Level - Setting technical vision and strategy",
    "M3": "Manager Level - Leading small teams and delivering team objectives",
    "M4": "Senior Manager - Managing multiple teams and driving organizational goals",
    "M5": "Director Level - Setting departmental strategy and objectives",
    "M6": "Senior Director - Driving organizational transformation and strategy"
  };

  const levels = ["P1", "P2", "P3", "P4", "P5", "P6"];

  return (
    <div className="space-y-6">
      <RoleDescriptionCard 
        role={role}
        descriptions={descriptions}
        levelDescriptions={levelDescriptions}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All Categories
            <span className="ml-2 bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {skills?.specialized.length + skills?.common.length + skills?.certifications.length || 0}
            </span>
          </TabsTrigger>
          <TabsTrigger value="specialized">
            Specialized Skills
            <span className="ml-2 bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {skills?.specialized.length || 0}
            </span>
          </TabsTrigger>
          <TabsTrigger value="common">
            Common Skills
            <span className="ml-2 bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {skills?.common.length || 0}
            </span>
          </TabsTrigger>
          <TabsTrigger value="certifications">
            Certifications
            <span className="ml-2 bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {skills?.certifications.length || 0}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <SkillsTable 
              skills={[...skills?.specialized || [], ...skills?.common || [], ...skills?.certifications || []]}
              roleLevel={role.level}
              levels={levels}
            />
          </Card>
        </TabsContent>

        <TabsContent value="specialized">
          <Card>
            <SkillsTable 
              skills={skills?.specialized || []}
              roleLevel={role.level}
              levels={levels}
            />
          </Card>
        </TabsContent>

        <TabsContent value="common">
          <Card>
            <SkillsTable 
              skills={skills?.common || []}
              roleLevel={role.level}
              levels={levels}
            />
          </Card>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <SkillsTable 
              skills={skills?.certifications || []}
              roleLevel={role.level}
              levels={levels}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};