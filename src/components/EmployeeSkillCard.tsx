import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useEmployeeSkillsStore } from "./employee/store/employeeSkillsStore";
import { useMemo, useEffect } from "react";
import { SkillLevel, SkillGoalStatus } from "./employee/types/employeeSkillTypes";

interface Skill {
  name: string;
  level: string;
}

interface EmployeeSkillCardProps {
  name: string;
  role: string;
  avatar: string;
  skills: Skill[];
  employeeId: string;
}

export const EmployeeSkillCard = ({ name, role, avatar, skills, employeeId }: EmployeeSkillCardProps) => {
  const { toast } = useToast();
  const { getSkillState, batchUpdateSkills, initializeEmployeeSkills } = useEmployeeSkillsStore();
  
  // Initialize skills when component mounts
  useEffect(() => {
    console.log('EmployeeSkillCard - Initializing skills for:', employeeId);
    initializeEmployeeSkills(employeeId);
    
    // Batch update all skills
    const updates = skills.reduce((acc, skill) => ({
      ...acc,
      [skill.name]: {
        level: skill.level as SkillLevel,
        goalStatus: 'unknown' as SkillGoalStatus,
        lastUpdated: new Date().toISOString()
      }
    }), {});

    console.log('EmployeeSkillCard - Batch updating skills:', {
      employeeId,
      skillCount: skills.length,
      updates
    });

    batchUpdateSkills(employeeId, updates);
  }, [employeeId, skills, initializeEmployeeSkills, batchUpdateSkills]);

  console.log('Rendering EmployeeSkillCard:', { 
    name, 
    role, 
    skillCount: skills.length,
    employeeId,
    skills: skills.map(s => ({ name: s.name, level: s.level }))
  });

  // Memoize the level mapping to prevent recreating on every render
  const levelPercentages = useMemo(() => ({
    'advanced': 100,
    'intermediate': 66,
    'beginner': 33,
    'unspecified': 0
  }), []);

  const getLevelPercentage = (level: string): number => {
    if (typeof level === 'number') {
      console.log('Level is already a percentage:', level);
      return Math.min(Math.max(level, 0), 100);
    }

    const normalizedLevel = level.toString().toLowerCase();
    const percentage = levelPercentages[normalizedLevel as keyof typeof levelPercentages] ?? 0;

    console.log('Calculated level percentage:', {
      level,
      normalizedLevel,
      percentage
    });

    return percentage;
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-primary-accent';
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  const handleSkillClick = (skill: Skill) => {
    const percentage = getLevelPercentage(skill.level);
    
    const updates = {
      [skill.name]: {
        level: skill.level as SkillLevel,
        goalStatus: 'unknown' as SkillGoalStatus,
        lastUpdated: new Date().toISOString()
      }
    };

    console.log('Preparing batch update for skill:', {
      employeeId,
      skill,
      updates
    });

    batchUpdateSkills(employeeId, updates);
    
    toast({
      title: skill.name,
      description: `Current level: ${percentage}% (${skill.level})`,
    });
  };

  // Memoize the processed skills data
  const processedSkills = useMemo(() => skills.map(skill => ({
    ...skill,
    percentage: getLevelPercentage(skill.level)
  })), [skills, getLevelPercentage]);

  if (!skills.length) {
    console.log('No skills available for employee:', employeeId);
    return null;
  }

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
        {processedSkills.map((skill) => (
          <div 
            key={skill.name} 
            className="space-y-1.5 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
            onClick={() => handleSkillClick(skill)}
          >
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-secondary-foreground">
                {skill.percentage}%
              </span>
            </div>
            <Progress
              value={skill.percentage}
              className={`h-2 transition-all duration-300 ${getProgressColor(skill.percentage)}`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};