import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { roleSkills } from '../data/roleSkills';
import { useCompetencyStore } from '../competency/CompetencyState';

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

  const skills = new Set([
    ...(currentRoleSkills.specialized?.map(s => s.title) || []),
    ...(currentRoleSkills.common?.map(s => s.title) || []),
    ...(currentRoleSkills.certifications?.map(s => s.title) || [])
  ]);

  console.log('Initial skills for role:', roleId, Array.from(skills));
  return skills;
};

const getStorageKey = (employeeId: string) => `toggled-skills-${employeeId}`;

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { id: employeeId } = useParams<{ id: string }>();
  const location = useLocation();
  const { initializeStates } = useCompetencyStore();
  
  const [skillsByEmployee, setSkillsByEmployee] = useState<Record<string, Set<string>>>(() => {
    if (!employeeId) return {};
    
    console.log('Initializing skills for employee:', employeeId);
    
    try {
      const savedSkills = localStorage.getItem(getStorageKey(employeeId));
      if (savedSkills) {
        const parsed = JSON.parse(savedSkills);
        if (Array.isArray(parsed)) {
          return {
            [employeeId]: new Set(parsed.filter(skill => 
              typeof skill === 'string' && skill.length > 0
            ))
          };
        }
      }
    } catch (error) {
      console.error('Error loading saved skills:', error);
    }
    
    // If no saved skills or error, initialize with role skills
    const roleId = employeeId; // In this case, employee ID is same as role ID
    return { [employeeId]: getInitialSkillsForRole(roleId) };
  });

  // Initialize competency states when employee changes
  useEffect(() => {
    if (employeeId) {
      console.log('Initializing competency states for employee:', employeeId);
      initializeStates(employeeId);
    }
  }, [employeeId, initializeStates]);

  // Initialize skills for new employees
  useEffect(() => {
    if (employeeId) {
      setSkillsByEmployee(prev => {
        if (!prev[employeeId]) {
          console.log('Initializing skills for employee:', employeeId);
          const roleId = employeeId; // In this case, employee ID is same as role ID
          return {
            ...prev,
            [employeeId]: getInitialSkillsForRole(roleId)
          };
        }
        return prev;
      });
    }
  }, [employeeId]);

  const toggledSkills = employeeId ? skillsByEmployee[employeeId] || new Set<string>() : new Set<string>();

  const setToggledSkills = (newSkills: Set<string>) => {
    if (!employeeId) return;
    
    console.log('Setting toggled skills for employee:', employeeId, Array.from(newSkills));
    setSkillsByEmployee(prev => ({
      ...prev,
      [employeeId]: newSkills
    }));

    // Save to localStorage
    try {
      localStorage.setItem(getStorageKey(employeeId), JSON.stringify(Array.from(newSkills)));
      console.log('Saved toggled skills for employee:', employeeId);
    } catch (error) {
      console.error('Error saving skills:', error);
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