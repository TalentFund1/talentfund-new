import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { useRoleStore } from '@/components/benchmark/RoleBenchmark';
import { loadToggledSkills, saveToggledSkills } from './utils/storageUtils';
import { getEmployeeSkills } from '../../benchmark/skills-matrix/initialSkills';

interface ToggledSkillsContextType {
  toggledSkills: Set<string>;
  setToggledSkills: (skills: Set<string>) => void;
}

const ToggledSkillsContext = createContext<ToggledSkillsContextType | undefined>(undefined);

export const ToggledSkillsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { id } = useParams();
  const { selectedRole } = useRoleStore();
  
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => {
    const currentRoleId = selectedRole || id || "";
    const savedSkills = loadToggledSkills(currentRoleId);
    console.log('Initial load of toggled skills:', {
      roleId: currentRoleId,
      savedSkills,
      source: 'useState initializer'
    });

    // Always initialize with employee's assigned skills
    const employeeSkills = getEmployeeSkills(id || "");
    const employeeSkillTitles = employeeSkills.map(skill => skill.title);
    console.log('Initializing with employee skills:', employeeSkillTitles);
    return new Set(employeeSkillTitles);
  });

  // Effect to reload toggled skills when role or employee ID changes
  useEffect(() => {
    const currentRoleId = selectedRole || id || "";
    if (!currentRoleId) {
      console.warn('No role ID available for loading toggled skills');
      return;
    }

    console.log('Role/ID changed, reloading toggled skills for:', {
      roleId: currentRoleId,
      employeeId: id,
      selectedRole
    });

    // Always use employee's assigned skills
    const employeeSkills = getEmployeeSkills(id || "");
    const employeeSkillTitles = employeeSkills.map(skill => skill.title);
    console.log('Setting employee skills:', employeeSkillTitles);
    setToggledSkills(new Set(employeeSkillTitles));
    
  }, [selectedRole, id]);

  const handleSetToggledSkills = (newSkills: Set<string>) => {
    const currentRoleId = selectedRole || id || "";
    if (!currentRoleId) {
      console.error('No role ID available for saving toggled skills');
      return;
    }

    // Ensure we only keep skills that are assigned to the employee
    const employeeSkills = getEmployeeSkills(id || "");
    const employeeSkillTitles = new Set(employeeSkills.map(skill => skill.title));
    const filteredSkills = new Set(
      Array.from(newSkills).filter(skill => employeeSkillTitles.has(skill))
    );

    console.log('Setting toggled skills:', {
      roleId: currentRoleId,
      skillCount: filteredSkills.size,
      skills: Array.from(filteredSkills),
      employeeId: id
    });
    
    setToggledSkills(filteredSkills);
    
    // Save to localStorage immediately
    try {
      const skillsArray = Array.from(filteredSkills);
      saveToggledSkills(currentRoleId, skillsArray);
      
      // Broadcast the change
      window.dispatchEvent(new CustomEvent('toggledSkillsChanged', {
        detail: { role: currentRoleId, skills: skillsArray }
      }));

      console.log('Successfully saved toggled skills:', {
        roleId: currentRoleId,
        skillCount: skillsArray.length,
        skills: skillsArray
      });
    } catch (error) {
      console.error('Error saving toggled skills:', error);
      toast({
        title: "Error Saving Skills",
        description: "There was an error saving your skill selection.",
        variant: "destructive",
      });
    }
  };

  // Listen for changes from other components
  useEffect(() => {
    const currentRoleId = selectedRole || id || "";
    
    const handleSkillsChanged = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail.role === currentRoleId) {
        console.log('Received toggled skills update:', customEvent.detail);
        
        // Filter incoming skills to only include employee's assigned skills
        const employeeSkills = getEmployeeSkills(id || "");
        const employeeSkillTitles = new Set(employeeSkills.map(skill => skill.title));
        const filteredSkills = new Set(
          customEvent.detail.skills.filter((skill: string) => employeeSkillTitles.has(skill))
        );
        
        setToggledSkills(filteredSkills);
      }
    };

    window.addEventListener('toggledSkillsChanged', handleSkillsChanged);
    return () => window.removeEventListener('toggledSkillsChanged', handleSkillsChanged);
  }, [selectedRole, id]);

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
