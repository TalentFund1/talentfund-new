import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { useToast } from "@/hooks/use-toast";
import { benchmarkingService } from "../../services/benchmarking";

export const SkillsMatrix = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [employeeSkillsData, setEmployeeSkillsData] = useState<UnifiedSkill[]>([]);
  
  const { id } = useParams<{ id: string }>();
  const { hasChanges, saveChanges, cancelChanges } = useSkillsMatrixStore();
  const { getEmployeeSkills, getSkillState, initializeEmployeeSkills } = useEmployeeSkillsStore();
  const { toast } = useToast();

  // Initialize employee skills if needed
  useEffect(() => {
    if (id) {
      console.log('SkillsMatrix - Initializing skills for employee:', id);
      initializeEmployeeSkills(id);
      
      // Load employee skills after initialization
      const skills = getEmployeeSkills(id);
      console.log('SkillsMatrix - Loaded employee skills:', skills);
      
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
    console.log('Saving changes for employee:', id);
    saveChanges(id || "");
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    console.log('Canceling changes for employee:', id);
    cancelChanges(id || "");
    toast({
      title: "Changes cancelled",
      description: "Your changes have been discarded.",
    });
  };

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