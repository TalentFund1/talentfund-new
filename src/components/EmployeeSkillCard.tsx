import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useEmployeeSkillsStore } from "./employee/store/employeeSkillsStore";
import { useMemo, useEffect, useCallback } from "react";
import { EmployeeSkillCardProps } from "./employee/types/employeeSkillProps";
import { benchmarkingService } from "../services/benchmarking";

export const EmployeeSkillCard = ({ 
  name, 
  role, 
  avatar, 
  skills, 
  employeeId 
}: Readonly<EmployeeSkillCardProps>) => {
  const { toast } = useToast();
  const { getSkillState, batchUpdateSkills, getEmployeeSkills, initializeEmployeeSkills } = useEmployeeSkillsStore();
  
  // Initialize skills when component mounts
  useEffect(() => {
    if (employeeId) {
      console.log('EmployeeSkillCard - Initializing skills for:', employeeId);
      const initialize = async () => {
        try {
          await initializeEmployeeSkills(employeeId);
        } catch (error) {
          console.error('Error initializing skills:', error);
        }
      };
      initialize();
    }
  }, [employeeId]); // Remove initializeEmployeeSkills from deps to prevent loop

  // Get all employee skills including newly added ones
  const employeeSkills = useMemo(() => {
    if (!employeeId) return [];
    console.log('Getting employee skills for:', employeeId);
    return getEmployeeSkills(employeeId);
  }, [employeeId, getEmployeeSkills]);

  // Memoize getLevelPercentage to prevent recreating on every render
  const getLevelPercentage = useCallback((skillName: string): number => {
    if (!employeeId) return 0;
    const skillState = getSkillState(employeeId, skillName);
    console.log('Getting level percentage for skill:', {
      employeeId,
      skillName,
      level: skillState.level
    });
    
    return benchmarkingService.compareSkillLevels(
      { title: skillName, level: skillState.level },
      { title: skillName, minimumLevel: 'beginner' }
    ).matchPercentage;
  }, [employeeId, getSkillState]);

  const handleSkillClick = useCallback((skillName: string) => {
    if (!employeeId) return;
    
    const percentage = getLevelPercentage(skillName);
    const skillState = getSkillState(employeeId, skillName);
    
    const updates = {
      [skillName]: benchmarkingService.createSkillState(
        skillState.level,
        skillState.goalStatus
      )
    };

    console.log('Preparing batch update for skill:', {
      employeeId,
      skillName,
      updates
    });

    batchUpdateSkills(employeeId, updates);
    
    toast({
      title: skillName,
      description: `Current level: ${percentage}% (${skillState.level})`,
    });
  }, [employeeId, getLevelPercentage, getSkillState, batchUpdateSkills, toast]);

  // Memoize the processed skills data using all employee skills
  const processedSkills = useMemo(() => {
    if (!employeeSkills.length) return [];
    return employeeSkills.map(skill => ({
      ...skill,
      name: skill.title,
      percentage: getLevelPercentage(skill.title)
    }));
  }, [employeeSkills, getLevelPercentage]);

  if (!employeeId) {
    console.log('No employeeId provided to EmployeeSkillCard');
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
            onClick={() => handleSkillClick(skill.name)}
          >
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-secondary-foreground">
                {skill.percentage}%
              </span>
            </div>
            <Progress
              value={skill.percentage}
              className={`h-2 transition-all duration-300 ${benchmarkingService.getProgressColor(skill.percentage)}`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};