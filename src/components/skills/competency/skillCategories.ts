export const isSpecializedSkill = (skill: string, profileId: string): boolean => {
  const specializedSkillsByProfile: { [key: string]: string[] } = {
    "123": [ // AI Engineer
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "Natural Language Processing",
      "Computer Vision",
      "Git"  // Added Git as specialized skill for AI Engineers
    ],
    "124": [ // Backend Engineer
      "Node.js",
      "Database Design",
      "API Development",
      "System Architecture",
      "Kubernetes",
      "Git"  // Added Git as specialized skill for Backend Engineers
    ],
    "125": [ // Frontend Engineer
      "React",
      "TypeScript",
      "Next.js",
      "Vue.js",
      "Webpack",
      "Git"  // Added Git as specialized skill for Frontend Engineers
    ],
    "126": [ // Engineering Manager
      "System Design",
      "Technical Architecture",
      "Risk Management",
      "Git"  // Added Git as specialized skill for Engineering Managers
    ]
  };
  
  return specializedSkillsByProfile[profileId]?.some(spec => 
    skill.toLowerCase() === spec.toLowerCase()
  ) || false;
};

export const isCommonSkill = (skill: string, profileId: string): boolean => {
  const commonSkillsByProfile: { [key: string]: string[] } = {
    "123": [ // AI Engineer
      "Python",
      "Problem Solving",
      "Technical Writing",
      "Shell Scripting"  // Added Shell Scripting as common skill
    ],
    "124": [ // Backend Engineer
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Shell Scripting"  // Added Shell Scripting as common skill
    ],
    "125": [ // Frontend Engineer
      "Cross-browser Compatibility",
      "Responsive Design",
      "Problem Solving",
      "Shell Scripting"  // Added Shell Scripting as common skill
    ],
    "126": [ // Engineering Manager
      "Team Leadership",
      "Project Management",
      "Strategic Planning",
      "Stakeholder Management",
      "Shell Scripting"  // Added Shell Scripting as common skill
    ]
  };
  
  return commonSkillsByProfile[profileId]?.some(common => 
    skill.toLowerCase() === common.toLowerCase()
  ) || false;
};

export const isCertificationSkill = (skill: string, profileId: string): boolean => {
  const certificationSkillsByProfile: { [key: string]: string[] } = {
    "123": [ // AI Engineer
      "AWS Certified Machine Learning - Specialty",
      "TensorFlow Developer Certificate",
      "Google Cloud Professional Machine Learning Engineer",
      "AWS Certified DevOps Engineer",
      "Certified Kubernetes Administrator",
      "HashiCorp Certified Terraform Associate"
    ],
    "124": [ // Backend Engineer
      "AWS Certified Solutions Architect",
      "Kubernetes Administrator (CKA)",
      "MongoDB Professional Developer",
      "AWS Certified DevOps Engineer",
      "Certified Kubernetes Administrator",
      "HashiCorp Certified Terraform Associate"
    ],
    "125": [ // Frontend Engineer
      "AWS Certified Developer - Associate",
      "Google Mobile Web Specialist",
      "Professional Scrum Developer",
      "AWS Certified DevOps Engineer"
    ],
    "126": [ // Engineering Manager
      "Project Management Professional (PMP)",
      "Certified Scrum Master (CSM)",
      "ITIL Foundation",
      "AWS Certified DevOps Engineer",
      "Certified Kubernetes Administrator"
    ]
  };
  
  return certificationSkillsByProfile[profileId]?.some(cert => 
    skill.toLowerCase() === cert.toLowerCase()
  ) || false;
};

export const categorizeSkills = (skills: string[], profileId: string) => {
  const specialized = skills.filter(skill => isSpecializedSkill(skill, profileId));
  const certifications = skills.filter(skill => isCertificationSkill(skill, profileId));
  const common = skills.filter(skill => 
    !isSpecializedSkill(skill, profileId) && 
    !isCertificationSkill(skill, profileId) && 
    isCommonSkill(skill, profileId)
  );
  
  return {
    all: skills.length,
    specialized: specialized.length,
    common: common.length,
    certification: certifications.length
  };
};

// Add new export for single skill categorization
export const categorizeSkill = (skill: string, profileId: string): 'specialized' | 'common' | 'certification' => {
  console.log('Categorizing skill:', skill, 'for profile:', profileId);
  
  if (isSpecializedSkill(skill, profileId)) {
    console.log(`${skill} categorized as specialized`);
    return 'specialized';
  }
  if (isCertificationSkill(skill, profileId)) {
    console.log(`${skill} categorized as certification`);
    return 'certification';
  }
  if (isCommonSkill(skill, profileId)) {
    console.log(`${skill} categorized as common`);
    return 'common';
  }
  
  // Default to common if no specific category is found
  console.log(`${skill} defaulting to common category`);
  return 'common';
};