import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { loadToggledSkills, saveToggledSkills } from './utils/storageUtils';
import { useCurrentRole } from './hooks/useCurrentRole';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const currentRoleId = useCurrentRole();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const savedSkills = loadToggledSkills(currentRoleId);
    console.log('Initial load of toggled skills for role:', currentRoleId, savedSkills);
    return new Set(savedSkills);
  });

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', {
      roleId: currentRoleId,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    saveToggledSkills(currentRoleId, Array.from(newSkills));
    
    toast({
      title: "Skills Updated",
      description: `${newSkills.size} skills are now active for this role.`,
    });
  };

  return (
    <ToggledSkillsContext.Provider value={{ 
      toggledSkills, 
      setToggledSkills: handleSetToggledSkills 
    }}>
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