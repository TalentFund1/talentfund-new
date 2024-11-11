export interface Skill {
  name: string;
  level: "advanced" | "intermediate" | "beginner" | "unspecified";
}

export interface Certification {
  name: string;
}

export interface RoleSkills {
  required: Skill[];
  preferred: Skill[];
  certifications: Certification[];
}