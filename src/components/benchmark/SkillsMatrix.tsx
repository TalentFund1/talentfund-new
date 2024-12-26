import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useSkillsMatrixState } from "./skills-matrix/SkillsMatrixState";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { benchmarkingService } from "../../services/benchmarking";
import { useToast } from "@/hooks/use-toast";

export const SkillsMatrix = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [hasChanges, setHasChanges] = useState(false);
  const [employeeSkillsData, setEmployeeSkillsData] = useState<UnifiedSkill[]>([]);
  const [originalSkillStates, setOriginalSkillStates] = useState<Record<string, any>>({});
  
  const { id } = useParams<{ id: string }>();
  const { hasChanges: storeHasChanges } = useSkillsMatrixStore();
  const { 
    getEmployeeSkills, 
    getSkillState, 
    initializeEmployeeSkills, 
    batchUpdateSkills,
    setSkillLevel,
    setSkillGoalStatus 
  } = useEmployeeSkillsStore();
  const { toast } = useToast();

  // Initialize employee skills if needed
  useEffect(() => {
    if (id) {
      console.log('SkillsMatrix - Initializing skills for employee:', id);
      initializeEmployeeSkills(id);
      
      // Load employee skills after initialization
      const skills = getEmployeeSkills(id);
      console.log('SkillsMatrix - Loaded employee skills:', skills);
      
      // Store original skill states
      const originalStates: Record<string, any> = {};
      skills.forEach(skill => {
        const state = getSkillState(id, skill.title);
        originalStates[skill.title] = {
          level: state.level,
          goalStatus: state.goalStatus
        };
      });
      
      console.log('Stored original states:', originalStates);
      setOriginalSkillStates(originalStates);
      
      // Transform skills to UnifiedSkill format
      const transformedSkills = skills
        .filter(skill => skill && skill.title)
        .map(skill => {
          const skillData = getUnifiedSkillData(skill.title);
          const skillState = getSkillState(id, skill.title);
          
          console.log('SkillsMatrix - Processing skill:', { 
            employeeId: id, 
            skillTitle: skill.title,
            level: skillState.level,
            originalLevel: skill.level 
          });

          return {
            ...skill,
            id: skillData.id || `${id}-${skill.title}`,
            title: skill.title,
            subcategory: skillData.subcategory || 'General',
            level: skillState.level || skill.level || 'unspecified',
            growth: skillData.growth || '0%',
            salary: skillData.salary || 'market',
            goalStatus: skillState.goalStatus || 'unknown',
            lastUpdated: skillState.lastUpdated || new Date().toISOString(),
            confidence: skillState.confidence || 'medium',
            category: skillData.category || 'specialized',
            businessCategory: skillData.businessCategory || 'Technical Skills',
            weight: skillData.weight || 'technical'
          } as UnifiedSkill;
        });

      console.log('SkillsMatrix - Transformed skills:', transformedSkills);
      setEmployeeSkillsData(transformedSkills);
    }
  }, [id, initializeEmployeeSkills, getEmployeeSkills, getSkillState]);

  // Apply basic filtering to employee skills
  const filteredSkills = employeeSkillsData.filter(skill => {
    if (selectedLevel !== "all" && skill.level !== selectedLevel) return false;
    if (selectedInterest !== "all") {
      const skillState = getSkillState(id || "", skill.title);
      if (selectedInterest === "skill_goal" && skillState.goalStatus !== "skill_goal") return false;
    }
    return true;
  });

  const handleSave = () => {
    if (!id) return;

    console.log('Saving skill changes for employee:', id);
    
    // Get current states to persist
    const currentStates: Record<string, any> = {};
    employeeSkillsData.forEach(skill => {
      const state = getSkillState(id, skill.title);
      currentStates[skill.title] = {
        level: state.level,
        goalStatus: state.goalStatus
      };
    });

    // Update original states with current states
    setOriginalSkillStates(currentStates);
    setHasChanges(false);

    console.log('Saved new states:', currentStates);

    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    if (!id) return;

    console.log('Canceling skill changes for employee:', id);
    console.log('Restoring original states:', originalSkillStates);

    // Restore original states
    Object.entries(originalSkillStates).forEach(([skillTitle, state]) => {
      setSkillLevel(id, skillTitle, state.level);
      setSkillGoalStatus(id, skillTitle, state.goalStatus);
    });

    setHasChanges(false);
    
    toast({
      title: "Changes cancelled",
      description: "Your changes have been discarded.",
    });
  };

  // Track changes
  useEffect(() => {
    if (!id || !originalSkillStates) return;

    const hasUnsavedChanges = employeeSkillsData.some(skill => {
      const currentState = getSkillState(id, skill.title);
      const originalState = originalSkillStates[skill.title];

      return originalState && (
        currentState.level !== originalState.level ||
        currentState.goalStatus !== originalState.goalStatus
      );
    });

    console.log('Checking for changes:', {
      hasUnsavedChanges,
      originalStates: originalSkillStates,
      currentSkills: employeeSkillsData
    });

    setHasChanges(hasUnsavedChanges);
  }, [id, employeeSkillsData, originalSkillStates, getSkillState]);

  return (
    <div className="space-y-6">
      <SkillsMatrixView
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        filteredSkills={filteredSkills}
        hasChanges={hasChanges}
        onSave={handleSave}
        onCancel={handleCancel}
        isRoleBenchmark={false}
      />
    </div>
  );
};