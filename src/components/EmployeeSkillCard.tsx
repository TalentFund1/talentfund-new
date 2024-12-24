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
  
  const getLevelPercentage = (level: string | number): number => {
    // If level is already a number between 0-100, return it
    if (typeof level === 'number') {
      console.log('Level is already a percentage:', level);
      return Math.min(Math.max(level, 0), 100);
    }

    // Handle string levels
    const levels: { [key: string]: number } = {
      'advanced': 100,
      'intermediate': 66,
      'beginner': 33,
      'unspecified': 0
    };

    const normalizedLevel = level.toString().toLowerCase();
    const percentage = levels[normalizedLevel] ?? 0;

    console.log('Calculated level percentage:', {
      originalLevel: level,
      normalizedLevel,
      percentage
    });

    return percentage;
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-gray-500';
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
        {skills.map((skill) => {
          const percentage = getLevelPercentage(skill.level);
          console.log('Processing skill:', {
            name: skill.name,
            originalLevel: skill.level,
            calculatedPercentage: percentage
          });

          return (
            <div key={skill.name} className="space-y-1.5">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-secondary-foreground">
                  {percentage}%
                </span>
              </div>
              <Progress
                value={percentage}
                className={`h-2 transition-all duration-300 ${getProgressColor(percentage)}`}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};