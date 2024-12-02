import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { useRoleStore } from '@/components/benchmark/RoleBenchmark';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const getStorageKey = (roleId: string) => `roleToggledSkills-${roleId}`;

const loadToggledSkills = (roleId: string): string[] => {
  try {
    if (!roleId) {
      console.error('Cannot load toggled skills: No role ID provided');
      return [];
    }

    const savedState = localStorage.getItem(getStorageKey(roleId));
    if (savedState) {
      const parsedSkills = JSON.parse(savedState);
      if (Array.isArray(parsedSkills)) {
        console.log('Loaded saved toggle state:', {
          roleId,
          skillCount: parsedSkills.length,
          skills: parsedSkills
        });
        return parsedSkills;
      }
    }
  } catch (error) {
    console.error('Error loading toggled skills:', error);
  }
  return [];
};

const saveToggledSkills = (roleId: string, skills: string[]) => {
  try {
    if (!roleId) {
      console.error('Cannot save toggled skills: No role ID provided');
      return;
    }
    
    const storageKey = getStorageKey(roleId);
    localStorage.setItem(storageKey, JSON.stringify(skills));
    
    console.log('Saved toggled skills:', {
      roleId,
      skillCount: skills.length,
      skills,
      storageKey
    });
  } catch (error) {
    console.error('Error saving toggled skills:', error);
  }
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { id } = useParams();
  const { selectedRole } = useRoleStore();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const currentRoleId = selectedRole || id || "123";
    const savedSkills = loadToggledSkills(currentRoleId);
    
    if (savedSkills.length === 0) {
      // If no saved skills, initialize with all skills for the role
      const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
      if (currentRoleSkills) {
        const allSkills = [
          ...currentRoleSkills.specialized,
          ...currentRoleSkills.common,
          ...currentRoleSkills.certifications
        ].map(skill => skill.title);
        
        console.log('Initializing with all role skills:', {
          roleId: currentRoleId,
          skillCount: allSkills.length
        });
        
        saveToggledSkills(currentRoleId, allSkills);
        return new Set(allSkills);
      }
    }
    
    return new Set(savedSkills);
  });

  useEffect(() => {
    const currentRoleId = selectedRole || id || "123";
    const savedSkills = loadToggledSkills(currentRoleId);
    
    if (savedSkills.length === 0) {
      // If no saved skills, initialize with all skills for the role
      const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
      if (currentRoleSkills) {
        const allSkills = [
          ...currentRoleSkills.specialized,
          ...currentRoleSkills.common,
          ...currentRoleSkills.certifications
        ].map(skill => skill.title);
        
        console.log('Initializing with all role skills on role change:', {
          roleId: currentRoleId,
          skillCount: allSkills.length
        });
        
        setToggledSkills(new Set(allSkills));
        saveToggledSkills(currentRoleId, allSkills);
      }
    } else {
      setToggledSkills(new Set(savedSkills));
    }
  }, [selectedRole, id]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    const currentRoleId = selectedRole || id || "123";
    console.log('Setting toggled skills:', {
      roleId: currentRoleId,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    saveToggledSkills(currentRoleId, Array.from(newSkills));
  };

  return (
    <ToggledSkillsContext.Provider value={{ toggledSkills, setToggledSkills: handleSetToggledSkills }}>
      {children}
    </ToggledSkillsContext.Provider>
  );
};

export const useToggledSkills = () => {
  const context = useContext(ToggledSkillsContext);
  if (context === undefined) {
    throw new Error('useToggledSkills must be used within a ToggledSkillsProvider');
  }
  return context;
};