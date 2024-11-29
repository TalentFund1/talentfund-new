import { useState, useEffect } from 'react';
import { useSkillsMatrixStore } from './SkillsMatrixState';
import { useToggledSkills } from '../../skills/context/ToggledSkillsContext';
import { initializeRoleSkills, persistToggledSkills, loadPersistedSkills } from './skillStateUtils';

export const useSkillState = (roleId: string) => {
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const { initializeState } = useSkillsMatrixStore();
  const { setToggledSkills } = useToggledSkills();

  useEffect(() => {
    console.log('Role changed, initializing skill states for:', roleId);
    
    const allRoleSkills = initializeRoleSkills(roleId, initializeState);
    const toggledSkills = loadPersistedSkills(roleId, allRoleSkills);
    
    // Update toggled skills
    const newToggledSkills = new Set(toggledSkills);
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