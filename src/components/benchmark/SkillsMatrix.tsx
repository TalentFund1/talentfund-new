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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWeight, setSelectedWeight] = useState("all");
  const [hasChanges, setHasChanges] = useState(false);
  const [employeeSkillsData, setEmployeeSkillsData] = useState<UnifiedSkill[]>([]);
  const [originalSkillStates, setOriginalSkillStates] = useState<Record<string, any>>({});
  
  const { id } = useParams<{ id: string }>();
  const { hasChanges: storeHasChanges } = useSkillsMatrixStore();
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
      
      // Store original skill states
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
      if (selectedInterest === "not_interested" && skillState.goalStatus !== "not_interested") return false;
      if (selectedInterest === "unknown" && skillState.goalStatus !== "unknown") return false;
    }
    if (selectedCategory !== "all" && skill.category !== selectedCategory) return false;
    if (selectedWeight !== "all" && skill.weight !== selectedWeight) return false;
    return true;
  });

  const handleSave = () => {
    console.log('Saving skill changes');
    setHasChanges(false);
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    console.log('Canceling skill changes');
    if (id && originalSkillStates) {
      // Restore original states
      batchUpdateSkills(id, originalSkillStates);
      setHasChanges(false);
      toast({
        title: "Changes cancelled",
        description: "Your changes have been discarded.",
      });
    }
  };

  useEffect(() => {
    setHasChanges(storeHasChanges);
  }, [storeHasChanges]);

  return (
    <div className="space-y-6">
      <SkillsMatrixView
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedWeight={selectedWeight}
        setSelectedWeight={setSelectedWeight}
        filteredSkills={filteredSkills}
        hasChanges={hasChanges}
        onSave={handleSave}
        onCancel={handleCancel}
        isRoleBenchmark={false}
      />
    </div>
  );
};