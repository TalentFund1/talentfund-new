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

const getStorageKey = (roleId: string) => `roleToggledSkills-${roleId}-v2`;

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

const initializeSkillsForRole = (roleId: string): string[] => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (currentRoleSkills) {
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ].map(skill => skill.title);
    
    console.log('Initializing skills for role:', {
      roleId,
      skillCount: allSkills.length,
      skills: allSkills
    });
    
    return allSkills;
  }
  return [];
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { id } = useParams();
  const { selectedRole } = useRoleStore();
  const [initialized, setInitialized] = useState(false);
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const currentRoleId = selectedRole || id || "123";
    const savedSkills = loadToggledSkills(currentRoleId);
    
    if (savedSkills.length === 0) {
      const initialSkills = initializeSkillsForRole(currentRoleId);
      if (initialSkills.length > 0) {
        saveToggledSkills(currentRoleId, initialSkills);
        return new Set(initialSkills);
      }
    }
    
    return new Set(savedSkills);
  });

  useEffect(() => {
    const currentRoleId = selectedRole || id || "123";
    
    if (!initialized) {
      setInitialized(true);
      return;
    }

    const savedSkills = loadToggledSkills(currentRoleId);
    if (savedSkills.length === 0) {
      const initialSkills = initializeSkillsForRole(currentRoleId);
      if (initialSkills.length > 0) {
        console.log('Initializing skills on role change:', {
          roleId: currentRoleId,
          skillCount: initialSkills.length
        });
        
        setToggledSkills(new Set(initialSkills));
        saveToggledSkills(currentRoleId, initialSkills);
      }
    } else {
      console.log('Loading saved skills on role change:', {
        roleId: currentRoleId,
        skillCount: savedSkills.length
      });
      
      setToggledSkills(new Set(savedSkills));
    }
  }, [selectedRole, id, initialized]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    const currentRoleId = selectedRole || id || "123";
    const skillsArray = Array.from(newSkills);
    
    console.log('Setting toggled skills:', {
      roleId: currentRoleId,
      skillCount: skillsArray.length,
      skills: skillsArray
    });
    
    setToggledSkills(newSkills);
    saveToggledSkills(currentRoleId, skillsArray);

    toast({
      title: "Skills Updated",
      description: `${skillsArray.length} skills are now active for matching.`,
    });
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