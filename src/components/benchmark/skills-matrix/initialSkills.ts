import { Employee } from "../../types/employeeTypes";

export const getEmployeeSkills = (id: string) => {
  const skillsMap: { [key: string]: Array<{ title: string; level?: string }> } = {
    "123": [
      { title: "Machine Learning", level: "advanced" },
      { title: "Deep Learning", level: "advanced" },
      { title: "TensorFlow", level: "advanced" },
      { title: "PyTorch", level: "advanced" },
      { title: "Natural Language Processing", level: "advanced" },
      { title: "Computer Vision", level: "advanced" },
    ],
    "124": [
      { title: "Node.js", level: "advanced" },
      { title: "Database Design", level: "advanced" },
      { title: "API Development", level: "advanced" },
      { title: "System Architecture", level: "advanced" },
      { title: "Kubernetes", level: "advanced" },
    ],
    "125": [
      { title: "React", level: "advanced" },
      { title: "TypeScript", level: "advanced" },
      { title: "Next.js", level: "advanced" },
      { title: "Vue.js", level: "advanced" },
      { title: "Webpack", level: "advanced" },
    ],
    "126": [
      { title: "System Design", level: "advanced" },
      { title: "Technical Architecture", level: "advanced" },
      { title: "Risk Management", level: "advanced" },
    ],
    "127": [
      { title: "Docker", level: "advanced" },
      { title: "Kubernetes", level: "advanced" },
      { title: "Jenkins", level: "advanced" },
      { title: "Terraform", level: "advanced" },
      { title: "AWS", level: "advanced" },
    ],
    "128": [
      // Specialized Skills
      { title: "AWS", level: "advanced" },
      { title: "Azure", level: "intermediate" },
      { title: "GCP", level: "intermediate" },
      { title: "Docker", level: "advanced" },
      { title: "Kubernetes", level: "advanced" },
      { title: "Terraform", level: "advanced" },
      { title: "Prometheus", level: "advanced" },
      { title: "Grafana", level: "advanced" },
      { title: "ELK Stack", level: "intermediate" },
      { title: "Jenkins", level: "advanced" },
      { title: "CircleCI", level: "intermediate" },
      { title: "Istio", level: "intermediate" },
      { title: "Consul", level: "intermediate" },
      { title: "Vault", level: "intermediate" },
      // Common Skills
      { title: "Git", level: "advanced" },
      { title: "Python", level: "advanced" },
      { title: "Bash", level: "advanced" },
      { title: "Ruby", level: "intermediate" },
      { title: "PostgreSQL", level: "intermediate" },
      { title: "MySQL", level: "intermediate" },
      { title: "MongoDB", level: "intermediate" },
      { title: "Redis", level: "intermediate" },
      { title: "Nginx", level: "advanced" },
      { title: "Apache", level: "advanced" },
      { title: "Linux", level: "advanced" },
      { title: "PowerShell", level: "intermediate" },
      { title: "Helm", level: "advanced" },
      { title: "Ansible", level: "advanced" },
      // Certifications
      { title: "AWS Certified DevOps Engineer Professional", level: "advanced" },
      { title: "Certified Kubernetes Administrator (CKA)", level: "advanced" },
      { title: "HashiCorp Certified Terraform Associate", level: "advanced" },
      { title: "Google Cloud Professional DevOps Engineer", level: "intermediate" },
      { title: "Microsoft Azure DevOps Engineer Expert", level: "intermediate" }
    ]
  };

  return skillsMap[id] || [];
};
