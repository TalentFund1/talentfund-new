import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { loadToggledSkills, saveToggledSkills } from './utils/storageUtils';
import { useCurrentRole } from './hooks/useCurrentRole';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { id } = useParams();
  const currentRole = useCurrentRole(); // This tracks the current role/profile ID
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    try {
      // Load skills for the current profile/role ID
      const savedSkills = loadToggledSkills(id || currentRole);
      console.log('Initial load of toggled skills for role:', id || currentRole, savedSkills);
      return new Set(savedSkills);
    } catch (error) {
      console.error('Error loading initial toggled skills:', error);
      return new Set();
    }
  });

  // Effect to reload toggled skills when profile/role changes
  useEffect(() => {
    const roleId = id || currentRole;
    try {
      const savedSkills = loadToggledSkills(roleId);
      console.log('Reloading toggled skills for role change:', roleId, savedSkills);
      setToggledSkills(new Set(savedSkills));
    } catch (error) {
      console.error('Error reloading toggled skills:', error);
      setToggledSkills(new Set());
    }
  }, [id, currentRole]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    const roleId = id || currentRole;
    console.log('Setting toggled skills for role:', {
      roleId,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    
    // Save to localStorage and broadcast change
    try {
      const skillsArray = Array.from(newSkills);
      saveToggledSkills(roleId, skillsArray);
      
      // Broadcast the change to other components
      window.dispatchEvent(new CustomEvent('toggledSkillsChanged', {
        detail: { role: roleId, skills: skillsArray }
      }));

      // Only show toast if skills actually changed
      const currentSkills = loadToggledSkills(roleId);
      if (JSON.stringify(currentSkills) !== JSON.stringify(skillsArray)) {
        toast({
          title: "Skills Updated",
          description: `${newSkills.size} skills are now active for ${roleId}.`,
        });
      }
    } catch (error) {
      console.error('Error saving toggled skills:', error);
    }
  };

  // Listen for changes from other components
  useEffect(() => {
    const handleSkillsChanged = (event: Event) => {
      const customEvent = event as CustomEvent;
      const roleId = id || currentRole;
      if (customEvent.detail.role === roleId) {
        console.log('Received toggled skills update:', customEvent.detail);
        setToggledSkills(new Set(customEvent.detail.skills));
      }
    };

    window.addEventListener('toggledSkillsChanged', handleSkillsChanged);
    return () => window.removeEventListener('toggledSkillsChanged', handleSkillsChanged);
  }, [id, currentRole]);

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