export type SkillWeight = 'critical' | 'technical' | 'necessary';

export const skillWeightClassifications: { [key: string]: SkillWeight } = {
  // Critical Skills
  "Machine Learning": "critical",
  "Deep Learning": "critical",
  "System Design": "critical",
  "Technical Architecture": "critical",
  "AWS Certified Solutions Architect": "critical",
  "AWS Certified Machine Learning - Specialty": "critical",
  "Cloud Architecture": "critical",
  "Git": "critical",
  "Git Version Control": "critical",
  "Team Leadership": "critical",
  "AWS": "critical",
  "Kubernetes": "critical",
  "Docker": "critical",
  "Jenkins": "critical",
  "Terraform": "critical",
};

export const getSkillWeight = (skillTitle: string): SkillWeight => {
  console.log(`Getting weight for skill: ${skillTitle}`);
  return skillWeightClassifications[skillTitle] || "necessary";
};