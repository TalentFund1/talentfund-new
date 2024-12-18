import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";

const getSkillCategory = (skillTitle: string, subcategory: string): string => {
  // First check by subcategory
  const specializedSubcategories = [
    "AI & ML",
    "ML Frameworks",
    "AI Applications",
    "Artificial Intelligence and Machine Learning",
    "Backend Development",
    "Data Management",
    "Software Architecture",
    "Cloud Computing",
    "DevOps",
    "System Design",
    "Data Engineering",
    "API Development",
    "Database Design"
  ];

  const commonSubcategories = [
    "General",
    "Soft Skills",
    "Communication",
    "Development Practices",
    "Programming Languages",
    "Web Development",
    "Development Tools",
    "Leadership",
    "Management",
    "Problem Solving",
    "Team Collaboration",
    "Testing",
    "Documentation"
  ];

  // Check subcategory first
  if (specializedSubcategories.includes(subcategory)) {
    return 'specialized';
  }
  if (commonSubcategories.includes(subcategory)) {
    return 'common';
  }

  // Then check title patterns
  const title = skillTitle.toLowerCase();
  
  if (title.includes('certification') || 
      title.includes('certified') || 
      title.includes('certificate')) {
    return 'certification';
  }

  const specializedPatterns = [
    'machine learning',
    'deep learning',
    'tensorflow',
    'pytorch',
    'aws',
    'cloud',
    'docker',
    'kubernetes',
    'architecture',
    'devops',
    'ai',
    'artificial intelligence'
  ];

  if (specializedPatterns.some(pattern => title.includes(pattern))) {
    return 'specialized';
  }

  return 'common';
};

export const useSkillsFiltering = (
  employeeId: string,
  selectedRole: string,
  comparisonLevel: string,
  selectedLevel: string,
  selectedInterest: string,
  selectedSkillLevel: string,
  searchTerm: string,
  toggledSkills: Set<string>
) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

  if (!currentRoleSkills) {
    console.warn('No role skills found for role:', selectedRole);
    return { filteredSkills: [] };
  }

  const getLevelPriority = (level: string = 'unspecified') => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
  };

  const filterSkills = () => {
    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    const matchingSkills = employeeSkills.filter(empSkill => {
      const isInRoleSkills = allRoleSkills.some(roleSkill => roleSkill.title === empSkill.title);
      const isToggled = toggledSkills.has(empSkill.title);
      return isInRoleSkills && isToggled;
    });

    return matchingSkills
      .filter(skill => {
        let matchesLevel = true;
        let matchesInterest = true;
        let matchesSearch = true;
        let matchesSkillLevel = true;

        const competencyState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
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
      })
      .map(skill => ({
        ...skill,
        category: getSkillCategory(skill.title, skill.subcategory),
        employeeLevel: currentStates[skill.title]?.level || skill.level || 'unspecified',
        roleLevel: getSkillCompetencyState(skill.title, comparisonLevel, selectedRole)?.level || 'unspecified',
        requirement: currentStates[skill.title]?.requirement || skill.requirement || 'unknown'
      }))
      .sort((a, b) => {
        const aRoleLevel = a.roleLevel;
        const bRoleLevel = b.roleLevel;
        
        const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
        if (roleLevelDiff !== 0) return roleLevelDiff;

        const employeeLevelDiff = getLevelPriority(a.employeeLevel) - getLevelPriority(b.employeeLevel);
        if (employeeLevelDiff !== 0) return employeeLevelDiff;

        return a.title.localeCompare(b.title);
      });
  };

  return { filteredSkills: filterSkills() };
};