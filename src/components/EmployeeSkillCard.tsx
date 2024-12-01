import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface Skill {
  name: string;
  level: number;
}

interface EmployeeSkillCardProps {
  name: string;
  role: string;
  avatar: string;
  skills: Skill[];
}

export const EmployeeSkillCard = ({ name, role, avatar, skills }: EmployeeSkillCardProps) => {
  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-12 w-12">
          <img src={avatar} alt={name} className="object-cover" />
        </Avatar>
        <div>
          <h3 className="font-semibold text-primary">{name}</h3>
          <p className="text-sm text-secondary-foreground">{role}</p>
        </div>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-secondary-foreground">85%</span>
            </div>
            <div className="skill-progress">
              <div className="skill-progress-bar" style={{ width: '85%' }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};