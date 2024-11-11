import { Card } from "@/components/ui/card";
import { roleSkills } from "@/components/skills/data/roleSkills";

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

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{role.title}: {role.level}</h3>
        <p className="text-muted-foreground mb-4">
          {descriptions[role.title as keyof typeof descriptions]}
        </p>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Level Description</h4>
            <p className="text-muted-foreground">
              {levelDescriptions[role.level as keyof typeof levelDescriptions]}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Required Skills</h4>
            <p className="text-muted-foreground">
              {skills?.specialized.length || 0} specialized skills required
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Common Skills</h4>
            <p className="text-muted-foreground">
              {skills?.common.length || 0} common skills required
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Certifications</h4>
            <p className="text-muted-foreground">
              {skills?.certifications.length || 0} certifications recommended
            </p>
          </div>
        </div>
      </Card>

      <RoleSkillsContainer selectedRole={role} />
    </div>
  );
};