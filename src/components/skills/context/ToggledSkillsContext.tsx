import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roleSkills } from '../data/roleSkills';
import { useCompetencyStore } from '../competency/CompetencyState';
import { useRoleStore } from '../../benchmark/RoleBenchmark';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

const getInitialSkillsForRole = (roleId: string): Set<string> => {
  console.log('Getting initial skills for role:', roleId);
  
  if (!roleId) {
    console.log('No role ID provided');
    return new Set();
  }
  
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.log('No role skills found for role:', roleId);
    return new Set();
  }

  // Get all skills for the role
  const specializedSkills = currentRoleSkills.specialized?.map(s => s.title) || [];
  const commonSkills = currentRoleSkills.common?.map(s => s.title) || [];
  const certificationSkills = currentRoleSkills.certifications?.map(s => s.title) || [];

  // Create a set of all skills
  const skills = new Set([
    ...specializedSkills,
    ...commonSkills,
    ...certificationSkills
  ]);

  console.log('Initial skills breakdown for role:', roleId, {
    specialized: specializedSkills,
    common: commonSkills,
    certifications: certificationSkills,
    total: skills.size
  });
  
  return skills;
};

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { selectedRole } = useRoleStore();
  const { initializeStates } = useCompetencyStore();
  const { id } = useParams<{ id: string }>();
  const currentRole = id || selectedRole;
  
  const [skillsByRole, setSkillsByRole] = useState<Record<string, Set<string>>>(() => {
    console.log('Initializing skills by role');
    
    try {
      const savedSkills = localStorage.getItem('toggledSkillsByRole');
      if (savedSkills) {
        const parsed = JSON.parse(savedSkills);
        const result: Record<string, Set<string>> = {};
        
        // Convert arrays back to Sets
        Object.entries(parsed).forEach(([roleId, skills]) => {
          if (Array.isArray(skills)) {
            result[roleId] = new Set(skills);
            console.log(`Restored ${skills.length} skills for role ${roleId}:`, skills);
          }
        });
        
        console.log('Loaded saved skills by role:', result);
        return result;
      }
    } catch (error) {
      console.error('Error loading saved skills:', error);
    }
    
    return {};
  });

  // Initialize competency states and skills for role changes
  useEffect(() => {
    if (currentRole) {
      console.log('Initializing states for role:', currentRole);
      initializeStates(currentRole);
      
      // Initialize skills for new role if not present
      setSkillsByRole(prev => {
        if (!prev[currentRole] || prev[currentRole].size === 0) {
          const initialSkills = getInitialSkillsForRole(currentRole);
          console.log('Initializing new skills for role:', currentRole, Array.from(initialSkills));
          return {
            ...prev,
            [currentRole]: initialSkills
          };
        }
        return prev;
      });
    }
  }, [currentRole, initializeStates]);

  // Save skills to localStorage whenever they change
  useEffect(() => {
    try {
      const serializable = Object.fromEntries(
        Object.entries(skillsByRole).map(([roleId, skills]) => [
          roleId,
          Array.from(skills)
        ])
      );
      localStorage.setItem('toggledSkillsByRole', JSON.stringify(serializable));
      console.log('Saved skills to localStorage:', serializable);
    } catch (error) {
      console.error('Error saving skills:', error);
    }
  }, [skillsByRole]);

  const toggledSkills = currentRole ? (skillsByRole[currentRole] || new Set<string>()) : new Set<string>();

  const setToggledSkills = (newSkills: Set<string>) => {
    if (currentRole) {
      console.log('Setting toggled skills for role:', currentRole, Array.from(newSkills));
      setSkillsByRole(prev => ({
        ...prev,
        [currentRole]: newSkills
      }));
    }
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