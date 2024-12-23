import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { getEmployeeSkills } from "./benchmark/skills-matrix/initialSkills";
import { useEffect, useState } from "react";

interface Skill {
  title: string;
  level: string;
}

interface EmployeeSkillCardProps {
  name: string;
  role: string;
  avatar: string;
  employeeId: string;
}

export const EmployeeSkillCard = ({ name, role, avatar, employeeId }: EmployeeSkillCardProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  
  useEffect(() => {
    const employeeSkills = getEmployeeSkills(employeeId);
    console.log('Loading skills for employee card:', {
      employeeId,
      skillCount: employeeSkills.length,
      skills: employeeSkills
    });
    setSkills(employeeSkills);
  }, [employeeId]);

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
          <div key={skill.title} className="space-y-1.5">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.title}</span>
              <span className="text-sm text-secondary-foreground">
                {getLevelPercentage(skill.level)}%
              </span>
            </div>
            <Progress
              value={getLevelPercentage(skill.level)}
              className="h-2"
            />
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No skills added yet
          </p>
        )}
      </div>
    </Card>
  );
};