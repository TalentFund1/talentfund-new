import { UnifiedSkill } from '@/types/skillTypes';

export interface RoleSkillData {
  title: string;
  roleTrack?: "Professional" | "Managerial";
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
  soc?: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
}

export const roleSkills: Record<string, RoleSkillData> = {
  "123": {
    title: "AI Engineer",
    specialized: [
      { 
        id: "ml",
        title: "Machine Learning",
        subcategory: "AI",
        category: "specialized",
        weight: "critical",
        level: "advanced",
        growth: "10%",
        confidence: "high",
        requirement: "required"
      },
      {
        id: "dl",
        title: "Deep Learning",
        subcategory: "AI",
        category: "specialized",
        weight: "technical",
        level: "intermediate",
        growth: "15%",
        confidence: "medium",
        requirement: "preferred"
      },
    ],
    common: [
      {
        id: "tc",
        title: "Team Collaboration",
        subcategory: "Soft Skills",
        category: "common",
        weight: "necessary",
        level: "advanced",
        growth: "5%",
        confidence: "high",
        requirement: "required"
      },
      {
        id: "ps",
        title: "Problem Solving",
        subcategory: "Soft Skills",
        category: "common",
        weight: "necessary",
        level: "intermediate",
        growth: "8%",
        confidence: "medium",
        requirement: "preferred"
      },
    ],
    certifications: [
      {
        id: "cap",
        title: "Certified AI Professional",
        subcategory: "Certification",
        category: "certification",
        weight: "technical",
        level: "advanced",
        growth: "20%",
        confidence: "high",
        requirement: "required"
      },
    ]
  },
  "124": {
    title: "Backend Engineer",
    specialized: [
      { title: "Node.js", subcategory: "Backend", level: "advanced", growth: "12%", confidence: "high", requirement: "required" },
      { title: "Database Management", subcategory: "Backend", level: "intermediate", growth: "10%", confidence: "medium", requirement: "preferred" },
    ],
    common: [
      { title: "API Development", subcategory: "Backend", level: "advanced", growth: "15%", confidence: "high", requirement: "required" },
      { title: "Version Control", subcategory: "Soft Skills", level: "intermediate", growth: "8%", confidence: "medium", requirement: "preferred" },
    ],
    certifications: [
      { title: "AWS Certified Developer", subcategory: "Certification", level: "advanced", growth: "18%", confidence: "high", requirement: "required" },
    ]
  },
  "125": {
    title: "Frontend Engineer",
    specialized: [
      { title: "React.js", subcategory: "Frontend", level: "advanced", growth: "10%", confidence: "high", requirement: "required" },
      { title: "CSS Frameworks", subcategory: "Frontend", level: "intermediate", growth: "12%", confidence: "medium", requirement: "preferred" },
    ],
    common: [
      { title: "Responsive Design", subcategory: "Frontend", level: "advanced", growth: "15%", confidence: "high", requirement: "required" },
      { title: "Cross-Browser Compatibility", subcategory: "Frontend", level: "intermediate", growth: "10%", confidence: "medium", requirement: "preferred" },
    ],
    certifications: [
      { title: "Certified Frontend Developer", subcategory: "Certification", level: "advanced", growth: "20%", confidence: "high", requirement: "required" },
    ]
  },
  "126": {
    title: "Engineering Manager",
    specialized: [
      { title: "Project Management", subcategory: "Management", level: "advanced", growth: "10%", confidence: "high", requirement: "required" },
      { title: "Team Leadership", subcategory: "Management", level: "intermediate", growth: "12%", confidence: "medium", requirement: "preferred" },
    ],
    common: [
      { title: "Strategic Planning", subcategory: "Management", level: "advanced", growth: "15%", confidence: "high", requirement: "required" },
      { title: "Conflict Resolution", subcategory: "Soft Skills", level: "intermediate", growth: "10%", confidence: "medium", requirement: "preferred" },
    ],
    certifications: [
      { title: "Certified Scrum Master", subcategory: "Certification", level: "advanced", growth: "18%", confidence: "high", requirement: "required" },
    ]
  }
};

export const saveRoleSkills = (roleId: string, roleData: RoleSkillData): void => {
  roleSkills[roleId] = roleData;
  try {
    localStorage.setItem(`role_skills_${roleId}`, JSON.stringify(roleData));
  } catch (error) {
    console.error('Error saving role skills:', error);
  }
};

export const loadRoleSkills = (roleId: string): RoleSkillData | undefined => {
  try {
    const savedData = localStorage.getItem(`role_skills_${roleId}`);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading role skills:', error);
  }
  return roleSkills[roleId];
};
