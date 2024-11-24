export const getEmployeeSkills = (employeeId: string) => {
  const employeeSkills = {
    "123": [
      {
        title: "Machine Learning",
        subcategory: "Artificial Intelligence",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Deep Learning",
        subcategory: "Artificial Intelligence",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "TensorFlow",
        subcategory: "Machine Learning Frameworks",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "PyTorch",
        subcategory: "Machine Learning Frameworks",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "Computer Vision",
        subcategory: "AI Applications",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "Natural Language Processing",
        subcategory: "AI Applications",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "Python",
        subcategory: "Programming Languages",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Problem Solving",
        subcategory: "Soft Skills",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Technical Writing",
        subcategory: "Communication",
        level: "intermediate",
        requirement: "preferred"
      },
      {
        title: "AWS Certified Machine Learning - Specialty",
        subcategory: "Cloud Certification",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "TensorFlow Developer Certificate",
        subcategory: "AI Certification",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "Google Cloud Professional Machine Learning Engineer",
        subcategory: "Cloud Certification",
        level: "advanced",
        requirement: "preferred"
      }
    ],
    "124": [
      {
        title: "Node.js",
        subcategory: "Backend Development",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Database Design",
        subcategory: "Data Management",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "API Development",
        subcategory: "Backend Development",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "System Architecture",
        subcategory: "Software Architecture",
        level: "intermediate",
        requirement: "preferred"
      },
      {
        title: "Kubernetes",
        subcategory: "Container Orchestration",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Problem Solving",
        subcategory: "Soft Skills",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Code Review",
        subcategory: "Development Practices",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "Agile Methodologies",
        subcategory: "Project Management",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "AWS Certified Solutions Architect",
        subcategory: "Cloud Certification",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Kubernetes Administrator (CKA)",
        subcategory: "Container Certification",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "MongoDB Professional Developer",
        subcategory: "Database Certification",
        level: "advanced",
        requirement: "preferred"
      }
    ],
    "125": [
      {
        title: "React",
        subcategory: "Frontend Frameworks",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "TypeScript",
        subcategory: "Programming Languages",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "CSS/SASS",
        subcategory: "Styling",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Cross-browser Compatibility",
        subcategory: "Frontend Development",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "Responsive Design",
        subcategory: "Web Development",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "Problem Solving",
        subcategory: "Soft Skills",
        level: "advanced",
        requirement: "preferred"
      },
      {
        title: "AWS Certified Developer - Associate",
        subcategory: "Cloud Certification",
        level: "intermediate",
        requirement: "preferred"
      },
      {
        title: "Google Mobile Web Specialist",
        subcategory: "Web Development Certification",
        level: "advanced",
        requirement: "preferred"
      }
    ],
    "126": [
      {
        title: "System Design",
        subcategory: "Architecture",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Technical Architecture",
        subcategory: "Architecture",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Risk Management",
        subcategory: "Management",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Team Leadership",
        subcategory: "Leadership",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Project Management",
        subcategory: "Management",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Strategic Planning",
        subcategory: "Management",
        level: "advanced",
        requirement: "required"
      },
      {
        title: "Stakeholder Management",
        subcategory: "Leadership",
        level: "advanced",
        requirement: "required"
      }
    ]
  };

  return employeeSkills[employeeId as keyof typeof employeeSkills] || [];
};