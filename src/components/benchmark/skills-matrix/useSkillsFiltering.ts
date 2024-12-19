import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillCategory } from "../../skills/data/skills/categories/skillCategories";
import { getCategoryForSkill } from "../../skills/utils/skillCountUtils";
import { normalizeSkillTitle } from "../../skills/utils/normalization";
import { getSkillWeight } from "../../skills/data/skills/categories/skillWeights";

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
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employeeId);

  const getWeightPriority = (skillTitle: string) => {
    const weight = getSkillWeight(skillTitle);
    switch (weight) {
      case 'critical': return 0;
      case 'technical': return 1;
      case 'necessary': return 2;
      default: return 3;
    }
  };

  const filterSkills = () => {
    let skills = [...employeeSkills];

    console.log('Initial employee skills:', {
      employeeId,
      totalSkills: skills.length,
      skills: skills.map(s => ({
        title: s.title,
        level: s.level,
        requirement: s.requirement
      }))
    });

    // Remove duplicates while preserving employee skill data
    const uniqueSkills = new Map();
    skills.forEach(skill => {
      if (!uniqueSkills.has(skill.title)) {
        uniqueSkills.set(skill.title, skill);
      }
    });
    skills = Array.from(uniqueSkills.values());

    // If this is role benchmark view, filter by role skills
    if (isRoleBenchmark && selectedRole) {
      const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
      if (currentRoleSkills) {
        const roleSkillTitles = new Set([
          ...(currentRoleSkills.specialized || []).map(s => s.title),
          ...(currentRoleSkills.common || []).map(s => s.title),
          ...(currentRoleSkills.certifications || []).map(s => s.title)
        ]);
        skills = skills.filter(skill => roleSkillTitles.has(skill.title));
      }
    }

    // Only apply filters if they are actually set
    if (selectedLevel !== 'all' || selectedInterest !== 'all' || 
        selectedSkillLevel !== 'all' || searchTerm) {
      skills = skills.filter(skill => {
        let matchesLevel = true;
        let matchesInterest = true;
        let matchesSearch = true;
        let matchesSkillLevel = true;

        const competencyState = isRoleBenchmark ? 
          getSkillCompetencyState(skill.title, comparisonLevel, selectedRole) :
          { level: skill.level, required: skill.requirement };

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

        if (searchTerm) {
          matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
        }

        return matchesLevel && matchesInterest && matchesSearch && matchesSkillLevel;
      });
    }

    // Transform and sort skills
    const transformedSkills = skills.map(skill => ({
      ...skill,
      isToggled: toggledSkills.has(skill.title),
      weight: getSkillWeight(skill.title)
    }));

    // Sort skills based on the new priority system
    const sortedSkills = transformedSkills.sort((a, b) => {
      // First Priority: Toggled Skills
      if (a.isToggled !== b.isToggled) {
        return a.isToggled ? -1 : 1;
      }

      // Second Priority: Weight/Criticality
      const weightPriorityA = getWeightPriority(a.title);
      const weightPriorityB = getWeightPriority(b.title);
      if (weightPriorityA !== weightPriorityB) {
        return weightPriorityA - weightPriorityB;
      }

      // Final Priority: Alphabetical
      return a.title.localeCompare(b.title);
    });

    console.log('Sorted skills (first 5):', sortedSkills.slice(0, 5).map(skill => ({
      title: skill.title,
      isToggled: skill.isToggled,
      weight: skill.weight
    })));

    return sortedSkills;
  };

  const filteredSkills = filterSkills();

  console.log('Skills filtering result:', {
    employeeId,
    totalSkills: employeeSkills.length,
    filteredSkills: filteredSkills.length,
    toggledSkills: Array.from(toggledSkills),
    filters: {
      selectedLevel,
      selectedInterest,
      selectedSkillLevel,
      searchTerm,
      isRoleBenchmark
    }
  });

  return { filteredSkills };
};