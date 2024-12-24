import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

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
  console.log('Rendering EmployeeSkillCard:', { 
    name, 
    role, 
    skillCount: skills.length,
    skills: skills.map(s => ({ name: s.name, level: s.level }))
  });
  
  const getLevelPercentage = (level: string) => {
    const levels: { [key: string]: number } = {
      'advanced': 100,
      'intermediate': 66,
      'beginner': 33,
      'unspecified': 0
    };
    return levels[level.toLowerCase()] || 0;
  };

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
          <div key={skill.name} className="space-y-1.5">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-secondary-foreground">
                {getLevelPercentage(String(skill.level))}%
              </span>
            </div>
            <Progress
              value={getLevelPercentage(String(skill.level))}
              className="h-2"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};