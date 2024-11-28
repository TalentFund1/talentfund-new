import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useToast } from "@/components/ui/use-toast";
import { technicalSkills, softSkills } from '@/components/skillsData';
import { useSkillsMatrixSearch } from "../skills/context/SkillsMatrixSearchContext";
import { MatrixHeader } from "./skills-matrix/MatrixHeader";
import { MatrixFilters } from "./skills-matrix/MatrixFilters";
import { MatrixContent } from "./skills-matrix/MatrixContent";

const ITEMS_PER_PAGE = 10;

const getInterestPriority = (interest: string = 'unknown') => {
  const priorities: { [key: string]: number } = {
    'required': 0,
    'skill_goal': 1,
    'preferred': 2,
    'not_interested': 3,
    'unknown': 4
  };
  return priorities[interest.toLowerCase()] ?? 4;
};

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { saveChanges, cancelChanges, hasChanges: storeHasChanges, currentStates } = useSkillsMatrixStore();
  const { matrixSearchSkills, setMatrixSearchSkills } = useSkillsMatrixSearch();
  const allSkills = [...technicalSkills, ...softSkills];

  const employeeSkills = getEmployeeSkills(id || "");

  const getLevelPriority = (level: string) => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
  };

  const filteredSkills = filterSkillsByCategory(employeeSkills, selectedCategory)
    .filter(skill => {
      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;

      const currentSkillState = currentStates[skill.title];
      const skillLevel = (currentSkillState?.level || skill.level || '').toLowerCase();
      const requirement = (currentSkillState?.requirement || skill.requirement || '').toLowerCase();

      if (selectedLevel !== 'all') {
        matchesLevel = skillLevel === selectedLevel.toLowerCase();
      }

      if (selectedInterest !== 'all') {
        switch (selectedInterest.toLowerCase()) {
          case 'skill_goal':
            matchesInterest = requirement === 'required' || requirement === 'skill_goal';
            break;
          case 'not_interested':
            matchesInterest = requirement === 'not_interested';
            break;
          case 'unknown':
            matchesInterest = !requirement || requirement === 'unknown';
            break;
          default:
            matchesInterest = requirement === selectedInterest.toLowerCase();
        }
      }

      if (matrixSearchSkills.length > 0) {
        matchesSearch = matrixSearchSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      }

      return matchesLevel && matchesInterest && matchesSearch;
    })
    .sort((a, b) => {
      const aRoleLevel = (a.roleLevel || 'unspecified').toLowerCase();
      const bRoleLevel = (b.roleLevel || 'unspecified').toLowerCase();
      
      const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
      if (roleLevelDiff !== 0) return roleLevelDiff;

      const aState = currentStates[a.title];
      const bState = currentStates[b.title];
      
      const aLevel = (aState?.level || a.level || 'unspecified').toLowerCase();
      const bLevel = (bState?.level || b.level || 'unspecified').toLowerCase();
      
      const levelDiff = getLevelPriority(aLevel) - getLevelPriority(bLevel);
      if (levelDiff !== 0) return levelDiff;

      const aInterest = (aState?.requirement || a.requirement || 'unknown').toLowerCase();
      const bInterest = (bState?.requirement || b.requirement || 'unknown').toLowerCase();
      const interestDiff = getInterestPriority(aInterest) - getInterestPriority(bInterest);
      if (interestDiff !== 0) return interestDiff;

      return a.title.localeCompare(b.title);
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

  const handleSave = () => {
    saveChanges();
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    cancelChanges();
    toast({
      title: "Changes cancelled",
      description: "Your changes have been discarded.",
    });
  };

  const paginatedSkills = filteredSkills.slice(0, visibleItems);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <MatrixHeader 
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        
        <MatrixFilters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
        />

        <MatrixContent 
          filteredSkills={paginatedSkills}
          setHasChanges={setHasChanges}
          visibleItems={visibleItems}
          observerTarget={observerTarget}
        />
      </Card>
    </div>
  );
};
