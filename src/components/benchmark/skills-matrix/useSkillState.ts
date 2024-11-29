import { useState, useEffect } from 'react';
import { useSkillsMatrixStore } from './SkillsMatrixState';
import { useToggledSkills } from '../../skills/context/ToggledSkillsContext';
import { initializeRoleSkills, persistToggledSkills } from './skillStateUtils';

export const useSkillState = (roleId: string) => {
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const { initializeState } = useSkillsMatrixStore();
  const { setToggledSkills } = useToggledSkills();

  useEffect(() => {
    console.log('Role changed, initializing skill states for:', roleId);
    
    const allRoleSkills = initializeRoleSkills(roleId, initializeState);
    
    // Load persisted toggled skills
    const persistedSkills = localStorage.getItem(`roleToggledSkills-${roleId}`);
    let newToggledSkills: Set<string>;
    
    if (persistedSkills) {
      try {
        const parsedSkills = JSON.parse(persistedSkills);
        newToggledSkills = new Set(parsedSkills);
        console.log('Loaded persisted toggled skills:', Array.from(newToggledSkills));
      } catch (error) {
        console.error('Error loading persisted skills:', error);
        newToggledSkills = new Set(allRoleSkills.map(skill => skill.title));
      }
    } else {
      newToggledSkills = new Set(allRoleSkills.map(skill => skill.title));
    }
    
    // Update toggled skills
    console.log('Setting toggled skills:', Array.from(newToggledSkills));
    setToggledSkills(newToggledSkills);
    
    // Update search skills
    const toggledRoleSkills = allRoleSkills
      .filter(skill => newToggledSkills.has(skill.title))
      .map(skill => skill.title);
    
    setSelectedSearchSkills(toggledRoleSkills);
  }, [roleId, initializeState, setToggledSkills]);

  return {
    selectedSearchSkills,
    setSelectedSearchSkills
  };
};