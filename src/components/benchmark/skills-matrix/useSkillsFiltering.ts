import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { getEmployeeSkills } from "./initialSkills";
import { filterSkillsByCategory } from "./skillCategories";
import { normalizeSkillTitle } from "../../skills/utils/normalization";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { getSkillCategory } from "../../skills/data/skills/categories/skillCategories";

export const useSkillsFiltering = (
  employeeId: string,
  selectedRole: string,
  comparisonLevel: string,
  selectedLevel: string,
  selectedInterest: string,
  selectedSkillLevel: string,
  searchTerm: string,
  toggledSkills: Set<string>,
  isRoleBenchmark: boolean = false
) => {
  // Start with only the employee's assigned skills
  const employeeSkills = getEmployeeSkills(employeeId);

  console.log('Initial employee skills for filtering:', {
    employeeId,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => s.title)
  });

  let filteredSkills = [...employeeSkills];

  // Apply category filtering if needed
  if (selectedLevel !== "all") {
    filteredSkills = filterSkillsByCategory(filteredSkills, selectedLevel);
    console.log('After category filtering:', {
      level: selectedLevel,
      remainingSkills: filteredSkills.length
    });
  }

  // Filter by interest/requirement
  if (selectedInterest !== "all") {
    filteredSkills = filteredSkills.filter(skill => {
      const requirement = skill.requirement?.toLowerCase() || 'unknown';
      if (selectedInterest === 'skill_goal') {
        return requirement === 'required' || requirement === 'skill_goal';
      }
      return requirement === selectedInterest.toLowerCase();
    });
    console.log('After interest filtering:', {
      interest: selectedInterest,
      remainingSkills: filteredSkills.length
    });
  }

  // Filter by skill level
  if (selectedSkillLevel !== "all") {
    filteredSkills = filteredSkills.filter(skill => 
      (skill.level || 'unspecified').toLowerCase() === selectedSkillLevel.toLowerCase()
    );
    console.log('After skill level filtering:', {
      skillLevel: selectedSkillLevel,
      remainingSkills: filteredSkills.length
    });
  }

  // Apply search term filter
  if (searchTerm) {
    filteredSkills = filteredSkills.filter(skill =>
      skill.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('After search term filtering:', {
      searchTerm,
      remainingSkills: filteredSkills.length
    });
  }

  // Only include toggled skills
  filteredSkills = filteredSkills.filter(skill => toggledSkills.has(skill.title));
  
  console.log('Final filtered skills:', {
    total: filteredSkills.length,
    skills: filteredSkills.map(s => s.title)
  });

  return { filteredSkills };
};