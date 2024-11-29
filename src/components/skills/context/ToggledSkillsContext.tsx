import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCompetencyStore } from '../competency/CompetencyState';
import { roleSkills } from '../data/roleSkills';
import { useToast } from '@/components/ui/use-toast';
import { loadToggledSkills, saveToggledSkills } from './utils/storageUtils';
import { useCurrentRole } from './hooks/useCurrentRole';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { getRoleState } = useCompetencyStore();
  const { toast } = useToast();
  const currentRoleId = useCurrentRole();
  
  const [roleToggledSkills, setRoleToggledSkills] = useState<Record<string, Set<string>>>(() => {
    const result: Record<string, Set<string>> = {};
    const savedSkills = loadToggledSkills(currentRoleId);
    if (savedSkills.length > 0) {
      result[currentRoleId] = new Set(savedSkills);
    }
    return result;
  });

  // Initialize toggle states for new roles
  useEffect(() => {
    if (currentRoleId && !roleToggledSkills[currentRoleId]) {
      const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
      if (currentRoleSkills) {
        const savedSkills = loadToggledSkills(currentRoleId);
        
        if (savedSkills.length > 0) {
          console.log('Using saved skills for role:', currentRoleId);
          setRoleToggledSkills(prev => ({
            ...prev,
            [currentRoleId]: new Set(savedSkills)
          }));
        } else {
          console.log('Initializing new skills for role:', currentRoleId);
          const allSkills = [
            ...currentRoleSkills.specialized,
            ...currentRoleSkills.common,
            ...currentRoleSkills.certifications
          ];
          setRoleToggledSkills(prev => ({
            ...prev,
            [currentRoleId]: new Set(allSkills.map(skill => skill.title))
          }));
        }
      }
    }
  }, [currentRoleId]);

  // Persist toggle states to localStorage with debounced toast
  useEffect(() => {
    if (currentRoleId && roleToggledSkills[currentRoleId]) {
      const previousSkills = loadToggledSkills(currentRoleId);
      const currentSkills = Array.from(roleToggledSkills[currentRoleId]);
      
      if (JSON.stringify(previousSkills) !== JSON.stringify(currentSkills)) {
        saveToggledSkills(currentRoleId, currentSkills);
        
        toast({
          title: "Skills Updated",
          description: `${currentSkills.length} skills are now active for this role.`,
        });
      }
    }
  }, [currentRoleId, roleToggledSkills, toast]);

  const toggledSkills = roleToggledSkills[currentRoleId] || new Set();

  const setToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills for role:', {
      roleId: currentRoleId,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    setRoleToggledSkills(prev => ({
      ...prev,
      [currentRoleId]: newSkills
    }));
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