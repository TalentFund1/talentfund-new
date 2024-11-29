import { useState, useEffect } from 'react';
import { useSkillsMatrixStore } from './SkillsMatrixState';
import { useToggledSkills } from '../../skills/context/ToggledSkillsContext';
import { initializeRoleSkills, persistToggledSkills, loadPersistedSkills, getSkillsByRole } from './skillStateUtils';

export const useSkillState = (roleId: string) => {
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const { initializeState } = useSkillsMatrixStore();
  const { setToggledSkills } = useToggledSkills();

  useEffect(() => {
    console.log('Role changed, initializing skill states for:', roleId);
    
    // Get all skills for the current role
    const allRoleSkills = getSkillsByRole(roleId);
    console.log('Retrieved role skills:', {
      roleId,
      skillCount: allRoleSkills.length,
      skills: allRoleSkills.map(s => s.title)
    });

    // Initialize states for all skills
    initializeRoleSkills(roleId, initializeState);
    
    // Load persisted toggled skills for this role
    const toggledSkills = loadPersistedSkills(roleId, allRoleSkills);
    
    // Update toggled skills
    const newToggledSkills = new Set(toggledSkills);
    console.log('Setting toggled skills:', Array.from(newToggledSkills));
    setToggledSkills(newToggledSkills);
    
    // Persist the toggled skills
    persistToggledSkills(roleId, newToggledSkills);
    
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