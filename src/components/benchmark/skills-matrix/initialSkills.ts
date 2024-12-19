import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getSkillByTitle } from '../../skills/data/skills/allSkills';
import { useEmployeeStore } from '../../employee/store/employeeStore';

// Map of employee IDs to their skill titles (keeping this for initial data)
const employeeSkillMap: { [key: string]: string[] } = {
  "123": [
    "Machine Learning",
    "Deep Learning"
  ],
  "124": [
    "Node.js",
    "Database Design",
    "API Development"
  ],
  "125": [
    "React"
  ],
  "126": [
    "Team Leadership"
  ]
};

// Initialize employee skills in store if not already present
const initializeEmployeeSkills = (employeeId: string) => {
  const store = useEmployeeStore.getState();
  if (!store.employeeSkills[employeeId]) {
    const skillTitles = employeeSkillMap[employeeId] || [];
    const skills = skillTitles
      .map(title => getSkillByTitle(title))
      .filter((skill): skill is UnifiedSkill => skill !== undefined);
    
    store.setEmployeeSkills(employeeId, skills);
    
    // Initialize skill states
    skills.forEach(skill => {
      if (!store.skillStates[employeeId]?.[skill.title]) {
        store.setSkillState(employeeId, skill.title, 'unspecified', 'preferred');
      }
    });
  }
};

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  
  // Initialize if needed
  initializeEmployeeSkills(id);
  
  // Get skills from store
  const skills = useEmployeeStore.getState().getEmployeeSkills(id);

  console.log('Retrieved skills for employee:', {
    employeeId: id,
    skillCount: skills.length,
    skills: skills.map(s => s.title)
  });

  return skills;
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const state = useEmployeeStore.getState().getSkillState(employeeId, skillTitle);
  return state.level;
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  const state = useEmployeeStore.getState().getSkillState(employeeId, skillTitle);
  return state.requirement;
};
