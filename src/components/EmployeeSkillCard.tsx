import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface Skill {
  name: string;
  level: string;
}

interface EmployeeSkillCardProps {
  name: string;
  role: string;
  avatar: string;
  skills: Skill[];
}

export const EmployeeSkillCard = ({ name, role, avatar, skills }: EmployeeSkillCardProps) => {
  const getProgressPercentage = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return '100%';
      case 'intermediate':
        return '66%';
      case 'beginner':
        return '33%';
      default:
        return '0%';
    }
  };

  const getProgressColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'bg-primary-accent';
      case 'intermediate':
        return 'bg-primary-icon';
      case 'beginner':
        return 'bg-[#008000]';
      default:
        return 'bg-gray-300';
    }
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
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-secondary-foreground">
                {getProgressPercentage(skill.level)}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${getProgressColor(skill.level)}`}
                style={{ width: getProgressPercentage(skill.level) }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};