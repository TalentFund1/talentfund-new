import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { filterSkillsByCategory } from "./skillCategories";
import { useEmployeeStore } from "../../employee/store/employeeStore";

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string
) => {
  const { currentStates } = useSkillsMatrixStore();

  const filterAndSortSkills = (employeeId: string) => {
    console.log('Filtering skills for employee:', employeeId);
    const employeeSkills = getEmployeeSkills(employeeId);
    let filteredSkills = [...employeeSkills];

    console.log('Initial filtering state:', {
      totalSkills: filteredSkills.length,
      selectedCategory,
      selectedLevel,
      selectedInterest
    });

    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        const matches = state?.level.toLowerCase() === selectedLevel.toLowerCase();
        console.log('Level filtering:', {
          skill: skill.title,
          currentLevel: state?.level,
          selectedLevel,
          matches
        });
        return matches;
      });
    }

    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        if (!state) {
          console.log('No state found for skill:', skill.title);
          return false;
        }

        const matches = state.requirement === selectedInterest;

        console.log('Interest filtering:', {
          skill: skill.title,
          requirement: state.requirement,
          selectedInterest,
          matches
        });

        return matches;
      });
    }

    console.log('Final filtered skills:', {
      totalFiltered: filteredSkills.length,
      skills: filteredSkills.map(s => ({
        title: s.title,
        requirement: currentStates[s.title]?.requirement
      }))
    });

    return filteredSkills.sort((a, b) => a.title.localeCompare(b.title));
  };

  return {
    filterAndSortSkills,
  };
};

export const getEmployeeSkills = (employeeId: string) => {
  console.log('Getting skills for employee:', employeeId);
  return useEmployeeStore.getState().getEmployeeSkills(employeeId);
};