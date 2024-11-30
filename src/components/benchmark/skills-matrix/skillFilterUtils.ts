import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { filterSkillsByCategory } from "./skillCategories";

export const useFilteredSkills = (
  employeeSkills: any[],
  selectedLevel: string,
  selectedInterest: string,
  selectedSkillLevel: string,
  searchTerm: string,
  selectedSearchSkills: string[],
  currentStates: any,
  getSkillCompetencyState: any,
  roleLevel: string
) => {
  const { toggledSkills } = useToggledSkills();
  
  // First get all toggled skills as an array, similar to CompetencyMatrix
  const toggledSkillsArray = Array.from(toggledSkills);
  
  // Then filter skills that are both in employeeSkills and toggledSkills
  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      if (!toggledSkillsArray.includes(skill.title)) return false;

      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;
      let matchesSkillLevel = true;

      const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
      const roleSkillLevel = competencyState?.level || 'unspecified';

      if (selectedLevel !== 'all') {
        matchesLevel = roleSkillLevel.toLowerCase() === selectedLevel.toLowerCase();
      }

      const currentSkillState = currentStates[skill.title];
      const skillLevel = (currentSkillState?.level || skill.level || 'unspecified').toLowerCase();
      
      if (selectedSkillLevel !== 'all') {
        matchesSkillLevel = skillLevel === selectedSkillLevel.toLowerCase();
      }

      const requirement = (currentSkillState?.requirement || skill.requirement || 'unknown').toLowerCase();

      if (selectedInterest !== 'all') {
        switch (selectedInterest.toLowerCase()) {
          case 'skill_goal':
            matchesInterest = requirement === 'required' || requirement === 'skill_goal';
            break;
          case 'not_interested':
            matchesInterest = requirement === 'not_interested';
            break;
          case 'unknown':
            matchesInterest = !requirement || requirement === 'unknown';
            break;
          default:
            matchesInterest = requirement === selectedInterest.toLowerCase();
        }
      }

      if (selectedSearchSkills.length > 0) {
        matchesSearch = selectedSearchSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      } else if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesLevel && matchesInterest && matchesSearch && matchesSkillLevel;
    });

  return filteredSkills;
};