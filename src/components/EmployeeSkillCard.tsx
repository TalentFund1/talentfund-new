import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useEmployeeSkillsStore } from "./employee/store/employeeSkillsStore";
import { useMemo, useEffect, useState } from "react";
import { EmployeeSkillCardProps } from "./employee/types/employeeSkillProps";
import { benchmarkingService } from "../services/benchmarking";
import { Button } from "./ui/button";

export const EmployeeSkillCard = ({ 
  name, 
  role, 
  avatar, 
  skills, 
  employeeId 
}: Readonly<EmployeeSkillCardProps>) => {
  const { toast } = useToast();
  const { getSkillState, batchUpdateSkills } = useEmployeeSkillsStore();
  const [hasChanges, setHasChanges] = useState(false);
  const [originalStates, setOriginalStates] = useState<Record<string, any>>({});
  
  // Store original states on mount
  useEffect(() => {
    const states: Record<string, any> = {};
    skills.forEach(skill => {
      const state = getSkillState(employeeId, skill.name);
      states[skill.name] = {
        level: state.level,
        goalStatus: state.goalStatus
      };
    });
    
    console.log('Stored original states:', states);
    setOriginalStates(states);
  }, [employeeId, skills, getSkillState]);

  // Track changes
  useEffect(() => {
    const hasUnsavedChanges = skills.some(skill => {
      const currentState = getSkillState(employeeId, skill.name);
      const originalState = originalStates[skill.name];

      const hasChanged = originalState && (
        currentState.level !== originalState.level ||
        currentState.goalStatus !== originalState.goalStatus
      );

      if (hasChanged) {
        console.log('Detected change in skill:', {
          skillTitle: skill.name,
          original: originalState,
          current: currentState
        });
      }

      return hasChanged;
    });

    console.log('Checking for changes:', {
      hasUnsavedChanges,
      originalStates,
      currentSkills: skills.map(s => ({
        title: s.name,
        state: getSkillState(employeeId, s.name)
      }))
    });

    setHasChanges(hasUnsavedChanges);
  }, [skills, employeeId, getSkillState, originalStates]);
  
  const getLevelPercentage = (skillName: string): number => {
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
  };

  const handleSkillClick = (skillName: string) => {
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
  };

  const handleSave = () => {
    // Store current states as original states
    const newStates: Record<string, any> = {};
    skills.forEach(skill => {
      const state = getSkillState(employeeId, skill.name);
      newStates[skill.name] = {
        level: state.level,
        goalStatus: state.goalStatus
      };
    });
    
    setOriginalStates(newStates);
    setHasChanges(false);
    
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    // Restore original states
    const updates: Record<string, any> = {};
    Object.entries(originalStates).forEach(([skillName, state]) => {
      updates[skillName] = benchmarkingService.createSkillState(
        state.level,
        state.goalStatus
      );
    });
    
    batchUpdateSkills(employeeId, updates);
    setHasChanges(false);
    
    toast({
      title: "Changes cancelled",
      description: "Your changes have been discarded.",
    });
  };

  // Memoize the processed skills data
  const processedSkills = useMemo(() => skills.map(skill => ({
    ...skill,
    percentage: getLevelPercentage(skill.name)
  })), [skills, employeeId]);

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <img src={avatar} alt={name} className="object-cover" />
          </Avatar>
          <div>
            <h3 className="font-semibold text-primary">{name}</h3>
            <p className="text-sm text-secondary-foreground">{role}</p>
          </div>
        </div>
        
        {hasChanges && (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="text-sm"
            >
              Save Changes
            </Button>
          </div>
        )}
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