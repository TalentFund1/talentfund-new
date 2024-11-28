import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';
import { useToast } from '@/components/ui/use-toast';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const loadSavedSkills = () => {
  try {
    const savedSkills = localStorage.getItem('roleToggledSkills');
    if (savedSkills) {
      const parsed = JSON.parse(savedSkills);
      const result: Record<string, Set<string>> = {};
      Object.entries(parsed).forEach(([roleId, skills]) => {
        result[roleId] = new Set(skills as string[]);
      });
      console.log('Loaded role-specific toggled skills from localStorage:', result);
      return result;
    }
  } catch (error) {
    console.error('Error loading role-specific toggled skills from localStorage:', error);
  }
  return {};
};

const persistSkills = (skills: Record<string, Set<string>>) => {
  try {
    const serialized = Object.fromEntries(
      Object.entries(skills).map(([roleId, skillSet]) => [
        roleId,
        Array.from(skillSet)
      ])
    );
    console.log('Persisting role-specific toggled skills to localStorage:', serialized);
    localStorage.setItem('roleToggledSkills', JSON.stringify(serialized));
    return true;
  } catch (error) {
    console.error('Error saving role-specific toggled skills to localStorage:', error);
    return false;
  }
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { getRoleState, initializeState } = useCompetencyStore();
  const { toast } = useToast();
  
  const [roleToggledSkills, setRoleToggledSkills] = useState<Record<string, Set<string>>>(() => {
    return loadSavedSkills();
  });

  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    const roleId = matches?.[1] || "123";
    console.log('Initial role ID:', roleId);
    return roleId;
  });

  // Update currentRoleId when URL changes
  useEffect(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/skills\/(\d+)/);
    if (matches?.[1] && matches[1] !== currentRoleId) {
      console.log('Role ID changed:', matches[1]);
      setCurrentRoleId(matches[1]);
    }
  }, [window.location.pathname]);

  // Initialize role state and toggled skills
  useEffect(() => {
    if (currentRoleId) {
      console.log('Initializing state for role:', currentRoleId);
      initializeState(currentRoleId);
      
      const roleState = getRoleState(currentRoleId);
      console.log('Loading role state for:', currentRoleId, roleState);
      
      // Load saved toggles for this role or initialize empty if none exist
      if (!roleToggledSkills[currentRoleId]) {
        const savedSkills = loadSavedSkills();
        console.log('Loading saved toggles for role:', currentRoleId, savedSkills[currentRoleId]);
        
        setRoleToggledSkills(prev => {
          const newState = {
            ...prev,
            [currentRoleId]: savedSkills[currentRoleId] || new Set()
          };
          return newState;
        });
      }
    }
  }, [currentRoleId]);

  // Persist to localStorage whenever roleToggledSkills changes
  useEffect(() => {
    const success = persistSkills(roleToggledSkills);
    if (!success) {
      toast({
        title: "Error Saving Skills",
        description: "There was an error saving your skill changes.",
        variant: "destructive"
      });
    }
  }, [roleToggledSkills]);

  const toggledSkills = roleToggledSkills[currentRoleId] || new Set();

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', {
      roleId: currentRoleId,
      previousSkills: Array.from(toggledSkills),
      newSkills: Array.from(newSkills)
    });
    
    setRoleToggledSkills(prev => {
      const updated = {
        ...prev,
        [currentRoleId]: newSkills
      };
      
      // Show toast on successful toggle
      const skillsArray = Array.from(newSkills);
      const prevSkillsArray = Array.from(prev[currentRoleId] || new Set());
      
      if (skillsArray.length > prevSkillsArray.length) {
        const addedSkill = skillsArray.find(skill => !prevSkillsArray.includes(skill));
        if (addedSkill) {
          toast({
            title: "Skill Added",
            description: `${addedSkill} has been added to your skills.`
          });
        }
      } else {
        const removedSkill = prevSkillsArray.find(skill => !skillsArray.includes(skill));
        if (removedSkill) {
          toast({
            title: "Skill Removed",
            description: `${removedSkill} has been removed from your skills.`
          });
        }
      }
      
      return updated;
    });
  };

  return (
    <ToggledSkillsContext.Provider value={{ toggledSkills, setToggledSkills }}>
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