import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useSkillsMatrixState } from "./skills-matrix/SkillsMatrixState";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { useToast } from "@/hooks/use-toast";

export const SkillsMatrix = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [employeeSkillsData, setEmployeeSkillsData] = useState<UnifiedSkill[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSkillStates, setOriginalSkillStates] = useState<Record<string, any>>({});
  
  const { id } = useParams<{ id: string }>();
  const { getEmployeeSkills, getSkillState, initializeEmployeeSkills, batchUpdateSkills } = useEmployeeSkillsStore();
  const { toast } = useToast();

  // Initialize employee skills if needed
  useEffect(() => {
    if (id) {
      console.log('SkillsMatrix - Initializing skills for employee:', id);
      initializeEmployeeSkills(id);
      
      // Load employee skills after initialization
      const skills = getEmployeeSkills(id);
      console.log('SkillsMatrix - Loaded employee skills:', skills);
      
      // Store original skill states for cancel functionality
      const originalStates: Record<string, any> = {};
      skills.forEach(skill => {
        originalStates[skill.title] = getSkillState(id, skill.title);
      });
      setOriginalSkillStates(originalStates);
      
      // Transform skills to UnifiedSkill format with proper type checking
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
    console.log('Saving skill changes');
    if (id) {
      const currentSkills = getEmployeeSkills(id);
      const updatedStates: Record<string, any> = {};
      
      currentSkills.forEach(skill => {
        updatedStates[skill.title] = getSkillState(id, skill.title);
      });
      
      // Update original states to match current states
      setOriginalSkillStates(updatedStates);
      setHasChanges(false);
      
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleCancel = () => {
    console.log('Canceling skill changes');
    if (id && originalSkillStates) {
      // Restore original states
      batchUpdateSkills(id, originalSkillStates);
      
      // Refresh the skills data
      const skills = getEmployeeSkills(id);
      const transformedSkills = skills.map(skill => ({
        ...skill,
        ...getUnifiedSkillData(skill.title),
        level: originalSkillStates[skill.title]?.level || 'unspecified',
        goalStatus: originalSkillStates[skill.title]?.goalStatus || 'unknown'
      }));
      setEmployeeSkillsData(transformedSkills);
      
      setHasChanges(false);
      toast({
        title: "Changes cancelled",
        description: "Your changes have been discarded.",
      });
    }
  };

  // Listen for changes in skill states
  useEffect(() => {
    const checkForChanges = () => {
      if (!id || !originalSkillStates) return;
      
      const currentSkills = getEmployeeSkills(id);
      let hasAnyChanges = false;

      for (const skill of currentSkills) {
        const currentState = getSkillState(id, skill.title);
        const originalState = originalSkillStates[skill.title];

        if (originalState && (
          currentState.level !== originalState.level ||
          currentState.goalStatus !== originalState.goalStatus
        )) {
          hasAnyChanges = true;
          break;
        }
      }

      setHasChanges(hasAnyChanges);
    };

    checkForChanges();
  }, [id, originalSkillStates, getEmployeeSkills, getSkillState, employeeSkillsData]);

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