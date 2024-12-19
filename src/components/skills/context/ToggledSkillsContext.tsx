import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRoleStore } from '@/components/benchmark/RoleBenchmark';
import { roleSkills } from '../data/roleSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { selectedRole } = useRoleStore();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
    if (currentRoleSkills) {
      const allSkills = [
        ...currentRoleSkills.specialized.map(s => s.title),
        ...currentRoleSkills.common.map(s => s.title),
        ...currentRoleSkills.certifications.map(s => s.title)
      ];
      console.log('Initializing toggled skills for role:', {
        roleId: selectedRole,
        skillCount: allSkills.length
      });
      return new Set(allSkills);
    }
    return new Set<string>();
  });

  // Update toggled skills when role changes
  useEffect(() => {
    if (!selectedRole) return;

    const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
    if (currentRoleSkills) {
      const allSkills = [
        ...currentRoleSkills.specialized.map(s => s.title),
        ...currentRoleSkills.common.map(s => s.title),
        ...currentRoleSkills.certifications.map(s => s.title)
      ];
      console.log('Updating toggled skills for new role:', {
        roleId: selectedRole,
        skillCount: allSkills.length
      });
      setToggledSkills(new Set(allSkills));
    }
  }, [selectedRole]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    console.log('Setting toggled skills:', {
      roleId: selectedRole,
      skillCount: newSkills.size,
      skills: Array.from(newSkills)
    });
    
    setToggledSkills(newSkills);
    
    toast({
      title: "Skills Updated",
      description: `Updated skills for ${selectedRole}`,
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