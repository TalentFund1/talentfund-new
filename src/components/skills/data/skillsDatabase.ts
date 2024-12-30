import { 
  SkillId,
  UnifiedSkill,
  SkillWeight,
  SkillCategory 
} from '../types/SkillTypes';

export const getUnifiedSkillData = (skillTitle: string): UnifiedSkill => {
  // Mock data for demonstration purposes
  const skillsDatabase: Record<SkillId, UnifiedSkill> = {
    "1": {
      id: "1",
      title: "JavaScript",
      subcategory: "Programming",
      category: "specialized",
      businessCategory: "Development",
      weight: "critical",
      level: "advanced",
      growth: "10%",
      salary: "$100,000",
      skillScore: 85,
      minimumLevel: "beginner",
      requirementLevel: "required",
      metrics: {
        growth: "10%",
        salary: "$100,000",
        skillScore: 85
      },
      benchmarks: {
        B: true,
        R: false,
        M: true,
        O: false
      }
    },
    "2": {
      id: "2",
      title: "React",
      subcategory: "Framework",
      category: "specialized",
      businessCategory: "Development",
      weight: "critical",
      level: "intermediate",
      growth: "15%",
      salary: "$90,000",
      skillScore: 75,
      minimumLevel: "beginner",
      requirementLevel: "preferred",
      metrics: {
        growth: "15%",
        salary: "$90,000",
        skillScore: 75
      },
      benchmarks: {
        B: true,
        R: true,
        M: false,
        O: true
      }
    }
  };

  return skillsDatabase[skillTitle] || {
    id: skillTitle,
    title: skillTitle,
    subcategory: "General",
    category: "common",
    businessCategory: "General",
    weight: "necessary",
    level: "unspecified",
    growth: "0%",
    salary: "N/A",
    skillScore: 0,
    minimumLevel: "unspecified",
    requirementLevel: "optional",
    metrics: {
      growth: "0%",
      salary: "N/A",
      skillScore: 0
    },
    benchmarks: {
      B: false,
      R: false,
      M: false,
      O: false
    };
  };
};
