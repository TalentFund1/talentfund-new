import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useSkillsMatrixSearch } from "../skills/context/SkillsMatrixSearchContext";
import { SkillsMatrixView } from "./skills-matrix/SkillsMatrixView";
import { useSkillsMatrixState } from "./skills-matrix/SkillsMatrixState";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { UnifiedSkill } from "../skills/types/SkillTypes";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { hasChanges: storeHasChanges } = useSkillsMatrixStore();
  const { getEmployeeSkills, getSkillState } = useEmployeeSkillsStore();

  const { filterAndSortSkills } = useSkillsMatrixState(
    "all",
    selectedLevel,
    selectedInterest
  );

  // Get employee skills and convert them to UnifiedSkill format
  const employeeSkills = id ? getEmployeeSkills(id).map(skill => {
    if (!skill || !skill.title) {
      console.warn('Invalid skill data:', skill);
      return null;
    }

    console.log('Processing skill:', { 
      employeeId: id, 
      skillTitle: skill.title 
    });

    const skillState = getSkillState(id, skill.title);
    
    return {
      id: `${id}-${skill.title}`,
      title: skill.title,
      subcategory: skill.subcategory || 'General',
      category: skill.category || 'specialized',
      businessCategory: skill.businessCategory || 'Technical Skills',
      weight: skill.weight || 'technical',
      level: skillState.level || 'unspecified',
      growth: skill.growth || '0%',
      salary: skill.salary || 'market',
      goalStatus: skillState.goalStatus || 'unknown',
      lastUpdated: skillState.lastUpdated || new Date().toISOString(),
      confidence: skillState.confidence || 'medium',
      benchmarks: skill.benchmarks || {
        B: false,
        R: false,
        M: false,
        O: false
      }
    } as UnifiedSkill;
  }).filter((skill): skill is UnifiedSkill => skill !== null) : [];

  console.log('SkillsMatrix - Loading employee skills:', {
    employeeId: id,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => ({ 
      title: s.title,
      level: s.level,
      goalStatus: s.goalStatus
    }))
  });

  // Apply filtering and sorting to employee skills
  const filteredSkills = filterAndSortSkills(employeeSkills);

  console.log('SkillsMatrix - Filtered skills:', {
    totalSkills: employeeSkills.length,
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
      <SkillsMatrixView
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        filteredSkills={filteredSkills}
        visibleItems={visibleItems}
        observerTarget={observerTarget}
        hasChanges={hasChanges}
        isRoleBenchmark={false}
      />
    </div>
  );
};