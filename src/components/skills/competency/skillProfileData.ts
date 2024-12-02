export const jobTitles: { [key: string]: string } = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager",
  "127": "DevOps Engineer"
};

export const specializedSkillsByProfile: { [key: string]: string[] } = {
  "123": [ // AI Engineer
    "Machine Learning", "Deep Learning", "TensorFlow",
    "PyTorch", "Natural Language Processing", "Computer Vision"
  ],
  "124": [ // Backend Engineer
    "Node.js", "Database Design", "API Development",
    "System Architecture", "Kubernetes"
  ],
  "125": [ // Frontend Engineer
    "React", "TypeScript", "Next.js", "Vue.js", "Webpack"
  ],
  "126": [ // Engineering Manager
    "System Design", "Technical Architecture", "Risk Management"
  ],
  "127": [ // DevOps Engineer
    "Docker", "Kubernetes", "Jenkins", "Terraform", "AWS"
  ]
};

export const commonSkillsByProfile: { [key: string]: string[] } = {
  "123": ["Python", "Problem Solving", "Technical Writing"],
  "124": ["Problem Solving", "Code Review", "Agile Methodologies"],
  "125": ["Cross-browser Compatibility", "Responsive Design", "Problem Solving"],
  "126": ["Team Leadership", "Project Management", "Strategic Planning", "Stakeholder Management"],
  "127": ["Linux Administration", "Shell Scripting", "Git", "Problem Solving"]
};

export const certificationSkillsByProfile: { [key: string]: string[] } = {
  "123": [
    "AWS Certified Machine Learning - Specialty",
    "TensorFlow Developer Certificate",
    "Google Cloud Professional Machine Learning Engineer"
  ],
  "124": [
    "AWS Certified Solutions Architect",
    "Kubernetes Administrator (CKA)",
    "MongoDB Professional Developer"
  ],
  "125": [
    "AWS Certified Developer - Associate",
    "Google Mobile Web Specialist",
    "Professional Scrum Developer"
  ],
  "126": [
    "Project Management Professional (PMP)",
    "Certified Scrum Master (CSM)",
    "ITIL Foundation"
  ],
  "127": [
    "AWS Certified DevOps Engineer",
    "Certified Kubernetes Administrator",
    "HashiCorp Certified Terraform Associate"
  ]
};
