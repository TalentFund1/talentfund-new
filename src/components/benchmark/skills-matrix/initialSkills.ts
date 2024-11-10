export const initialSkills = {
  "123": [ // Victor Smith - AI Engineer
    {
      title: "Machine Learning",
      subcategory: "Artificial Intelligence",
      level: "advanced",
      growth: "30%",
      confidence: "high"
    },
    {
      title: "Deep Learning",
      subcategory: "Artificial Intelligence",
      level: "advanced",
      growth: "25%",
      confidence: "high"
    },
    {
      title: "Python",
      subcategory: "Programming Languages",
      level: "advanced",
      growth: "15%",
      confidence: "high"
    },
    {
      title: "TensorFlow",
      subcategory: "Machine Learning Frameworks",
      level: "advanced",
      growth: "20%",
      confidence: "high"
    },
    {
      title: "Natural Language Processing",
      subcategory: "AI Applications",
      level: "advanced",
      growth: "28%",
      confidence: "high"
    }
  ],
  "124": [ // Jennie Richards - Backend Engineer
    {
      title: "Node.js",
      subcategory: "Backend Development",
      level: "advanced",
      growth: "20%",
      confidence: "high"
    },
    {
      title: "Database Design",
      subcategory: "Data Management",
      level: "advanced",
      growth: "15%",
      confidence: "high"
    },
    {
      title: "API Development",
      subcategory: "Backend Development",
      level: "advanced",
      growth: "25%",
      confidence: "high"
    },
    {
      title: "System Architecture",
      subcategory: "Software Architecture",
      level: "intermediate",
      growth: "30%",
      confidence: "medium"
    },
    {
      title: "Cloud Computing",
      subcategory: "Infrastructure",
      level: "intermediate",
      growth: "35%",
      confidence: "medium"
    }
  ],
  "125": [ // Anna Vyselva - Frontend Developer
    {
      title: "React",
      subcategory: "Frontend Frameworks",
      level: "advanced",
      growth: "20%",
      confidence: "high"
    },
    {
      title: "TypeScript",
      subcategory: "Programming Languages",
      level: "advanced",
      growth: "25%",
      confidence: "high"
    },
    {
      title: "UI/UX Design",
      subcategory: "Design",
      level: "intermediate",
      growth: "30%",
      confidence: "medium"
    },
    {
      title: "CSS/SASS",
      subcategory: "Styling",
      level: "advanced",
      growth: "15%",
      confidence: "high"
    },
    {
      title: "Web Performance",
      subcategory: "Frontend Development",
      level: "intermediate",
      growth: "35%",
      confidence: "medium"
    }
  ],
  "126": [ // Suz Manu - Engineering Manager
    {
      title: "Team Leadership",
      subcategory: "Management",
      level: "advanced",
      growth: "20%",
      confidence: "high"
    },
    {
      title: "Project Management",
      subcategory: "Management",
      level: "advanced",
      growth: "25%",
      confidence: "high"
    },
    {
      title: "Technical Architecture",
      subcategory: "Software Architecture",
      level: "advanced",
      growth: "15%",
      confidence: "high"
    },
    {
      title: "Agile Methodologies",
      subcategory: "Process",
      level: "advanced",
      growth: "20%",
      confidence: "high"
    },
    {
      title: "Strategic Planning",
      subcategory: "Management",
      level: "intermediate",
      growth: "30%",
      confidence: "medium"
    }
  ]
};

// Helper function to get skills for a specific employee
export const getEmployeeSkills = (employeeId: string) => {
  return initialSkills[employeeId as keyof typeof initialSkills] || [];
};