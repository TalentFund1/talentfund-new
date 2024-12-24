import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useSkillsMatrixSearch } from "../skills/context/SkillsMatrixSearchContext";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useSkillsMatrixState } from "./skills-matrix/SkillsMatrixState";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { benchmarkingService } from "../../services/benchmarking";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  const [employeeSkillsData, setEmployeeSkillsData] = useState<UnifiedSkill[]>([]);
  
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { hasChanges: storeHasChanges } = useSkillsMatrixStore();
  const { getEmployeeSkills, getSkillState, initializeEmployeeSkills } = useEmployeeSkillsStore();

  const { filterAndSortSkills } = useSkillsMatrixState(
    "all",
    selectedLevel,
    selectedInterest
  );

  // Initialize employee skills if needed
  useEffect(() => {
    if (id) {
      console.log('Initializing skills for employee in SkillsMatrix:', id);
      initializeEmployeeSkills(id);
      
      // Load employee skills after initialization
      const skills = getEmployeeSkills(id);
      console.log('Loaded employee skills in SkillsMatrix:', skills);
      
      // Transform skills to UnifiedSkill format with proper type checking
      const transformedSkills = skills
        .filter(skill => skill && skill.title)
        .map(skill => {
          const skillData = getUnifiedSkillData(skill.title);
          const skillState = getSkillState(id, skill.title);
          
          console.log('Processing skill in SkillsMatrix:', { 
            employeeId: id, 
            skillTitle: skill.title,
            level: skillState.level,
            goalStatus: skillState.goalStatus
          });

          return {
            id: `${id}-${skill.title}`,
            title: skill.title,
            subcategory: skillData.subcategory || 'General',
            level: skillState.level || 'unspecified',
            growth: skillData.growth || '0%',
            salary: skillData.salary || 'market',
            goalStatus: skillState.goalStatus || 'unknown',
            lastUpdated: skillState.lastUpdated || new Date().toISOString(),
            confidence: skillState.confidence || 'medium',
            category: skillData.category || 'specialized',
            businessCategory: skillData.businessCategory || 'Technical Skills',
            weight: skillData.weight || 'technical',
            benchmarks: skillData.benchmarks || {
              B: false,
              R: false,
              M: false,
              O: false
            }
          } as UnifiedSkill;
        });

      setEmployeeSkillsData(transformedSkills);
    }
  }, [id, initializeEmployeeSkills, getEmployeeSkills, getSkillState]);

  // Apply filtering and sorting to employee skills
  const filteredSkills = filterAndSortSkills(employeeSkillsData);

  console.log('SkillsMatrix - Filtered skills:', {
    totalSkills: employeeSkillsData.length,
    filteredSkills: filteredSkills.length,
    visibleItems,
    selectedLevel,
    selectedInterest
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleItems < filteredSkills.length) {
          setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredSkills.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [visibleItems, filteredSkills.length]);

  useEffect(() => {
    setHasChanges(storeHasChanges);
  }, [storeHasChanges]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h2 className="text-lg font-semibold mb-2">Skills Matrix</h2>
        <p className="text-sm text-muted-foreground">
          Update and manage your skill levels and interests in this section.
        </p>
      </div>

      <SkillsMatrixView
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        filteredSkills={filteredSkills.slice(0, visibleItems)}
        visibleItems={visibleItems}
        observerTarget={observerTarget}
        hasChanges={hasChanges}
        isRoleBenchmark={false}
      />
    </div>
  );
};