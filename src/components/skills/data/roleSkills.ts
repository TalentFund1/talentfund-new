interface RoleSkill {
  title: string;
}

interface RoleSkills {
  specialized: RoleSkill[];
  common: RoleSkill[];
  certifications: RoleSkill[];
}

export const roleSkills: { [key: string]: RoleSkills } = {
  "123": {
    specialized: [
      { title: "Machine Learning" },
      { title: "Deep Learning" },
      { title: "Natural Language Processing" },
      { title: "Computer Vision" },
      { title: "TensorFlow" }
    ],
    common: [
      { title: "Python" },
      { title: "Data Structures" },
      { title: "Algorithms" }
    ],
    certifications: [
      { title: "AWS Machine Learning Specialty" },
      { title: "Google Cloud Professional ML Engineer" }
    ]
  },
  "124": {
    specialized: [
      { title: "Node.js" },
      { title: "Database Design" },
      { title: "API Development" },
      { title: "System Architecture" },
      { title: "Kubernetes" }
    ],
    common: [
      { title: "Git" },
      { title: "CI/CD" },
      { title: "Testing" }
    ],
    certifications: [
      { title: "AWS Solutions Architect" },
      { title: "Kubernetes Administrator" }
    ]
  },
  "125": {
    specialized: [
      { title: "React" },
      { title: "TypeScript" },
      { title: "Next.js" },
      { title: "CSS/SASS" },
      { title: "Performance Optimization" }
    ],
    common: [
      { title: "HTML5" },
      { title: "JavaScript" },
      { title: "Web Security" }
    ],
    certifications: [
      { title: "AWS Developer Associate" },
      { title: "Frontend Performance" }
    ]
  },
  "126": {
    specialized: [
      { title: "System Design" },
      { title: "Technical Architecture" },
      { title: "Risk Management" },
      { title: "Team Leadership" },
      { title: "Project Management" }
    ],
    common: [
      { title: "Communication" },
      { title: "Strategic Planning" },
      { title: "Mentoring" }
    ],
    certifications: [
      { title: "PMP" },
      { title: "AWS Solutions Architect Professional" }
    ]
  }
};