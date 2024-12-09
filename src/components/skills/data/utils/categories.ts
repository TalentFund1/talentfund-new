export const getSubcategory = (skillTitle: string): string => {
  const subcategories: { [key: string]: string } = {
    // Mobile & Frontend Development
    'React Native': 'Mobile Development',
    'Flutter': 'Mobile Development',
    'GraphQL': 'API Development',
    
    // AI & ML Skills
    'Machine Learning': 'AI & ML',
    'Deep Learning': 'AI & ML',
    'Natural Language Processing': 'AI Applications',
    'Computer Vision': 'AI Applications',
    'TensorFlow': 'ML Frameworks',
    'PyTorch': 'ML Frameworks',
    
    // Backend Skills
    'Node.js': 'Backend Development',
    'API Development': 'Backend Development',
    'Database Design': 'Data Management',
    
    // Architecture Skills
    'System Design': 'Software Architecture',
    'Technical Architecture': 'Architecture',
    
    // DevOps Skills
    'Docker': 'Container Technology',
    'Kubernetes': 'Container Orchestration',
    
    // Frontend Skills
    'React': 'Frontend Frameworks',
    'Next.js': 'Frontend Frameworks',
    
    // Development Tools & Practices
    'Git Version Control': 'Development Tools',
    'Problem Solving': 'Development Practices',
    'Code Review': 'Development Practices',
    'Agile Methodologies': 'Development Practices',
    
    // Soft Skills
    'Team Leadership': 'Leadership',
    'Project Management': 'Project Management',
    'Risk Management': 'Management',
    'Technical Writing': 'Communication',
    'Communication': 'Communication',
    'Strategic Planning': 'Management',
    'Stakeholder Management': 'Management',
    
    // Certifications
    'AWS Certified Machine Learning Specialty': 'AI Certification',
    'TensorFlow Developer Certification': 'AI Certification',
    'AWS Certified Solutions Architect': 'Cloud Certification',
    'AWS Certified Developer - Associate': 'Cloud Certification',
    'AWS Certified DevOps Engineer': 'Cloud Certification',
    'Certified Kubernetes Administrator': 'Container Certification',
    'HashiCorp Certified Terraform Associate': 'Infrastructure Certification',
    'Project Management Professional (PMP)': 'Management Certification',
    'Certified Scrum Master (CSM)': 'Agile Certification'
  };
  
  return subcategories[skillTitle] || 'Development Tools';
};

export const getBusinessCategory = (skillTitle: string): string => {
  const categories: { [key: string]: string } = {
    // Technical Skills
    'Machine Learning': 'Information Technology',
    'Deep Learning': 'Information Technology',
    'Natural Language Processing': 'Science and Research',
    'Computer Vision': 'Science and Research',
    'TensorFlow': 'Information Technology',
    'Python': 'Information Technology',
    'Docker': 'Information Technology',
    'Kubernetes': 'Information Technology',
    'Jenkins': 'Information Technology',
    'Terraform': 'Information Technology',
    'Linux Administration': 'Information Technology',
    'Node.js': 'Information Technology',
    'React': 'Information Technology',
    'Next.js': 'Information Technology',
    'GraphQL': 'Information Technology',
    'API Development': 'Information Technology',
    
    // Soft Skills
    'Communication': 'Media and Communications',
    'Technical Writing': 'Media and Communications',
    'Problem Solving': 'Physical and Inherent Abilities',
    'Team Leadership': 'Administration',
    'Project Management': 'Administration',
    'Strategic Planning': 'Administration',
    'Stakeholder Management': 'Business',
    
    // Analysis Skills
    'Data Science': 'Analysis',
    'Data Analysis': 'Analysis',
    'Business Analysis': 'Analysis',
    
    // Management Skills
    'Risk Management': 'Law, Regulation, and Compliance',
    'System Design': 'Engineering',
    'Database Design': 'Information Technology',
    'Technical Architecture': 'Architecture and Construction'
  };
  
  // Default mapping for unknown skills
  const defaultCategories = [
    'Administration',
    'Agriculture, Horticulture, and Landscaping',
    'Analysis',
    'Architecture and Construction',
    'Business',
    'Customer and Client Support',
    'Design',
    'Economics, Policy, and Social Studies',
    'Education and Training',
    'Energy and Utilities',
    'Engineering',
    'Environment',
    'Finance',
    'Health Care',
    'Hospitality and Food Services',
    'Human Resources',
    'Information Technology',
    'Law, Regulation, and Compliance',
    'Maintenance, Repair, and Facility Services',
    'Manufacturing and Production',
    'Marketing and Public Relations',
    'Media and Communications',
    'Performing Arts, Sports, and Recreation',
    'Personal Care and Services',
    'Physical and Inherent Abilities',
    'Property and Real Estate',
    'Public Safety and National Security',
    'Sales',
    'Science and Research',
    'Social and Human Services',
    'Transportation, Supply Chain, and Logistics'
  ];

  console.log('Categorizing skill:', skillTitle);
  const category = categories[skillTitle];
  if (!category) {
    console.log(`No explicit mapping found for ${skillTitle}, using Information Technology as default`);
  }
  return category || 'Information Technology';
};

export const getSkillWeight = (skillTitle: string): 'critical' | 'technical' | 'necessary' => {
  const criticalSkills = [
    'Machine Learning',
    'Deep Learning',
    'AWS Certified Solutions Architect',
    'Team Leadership',
    'Project Management',
    'React Native',  // Added as critical due to high growth
    'GraphQL'        // Added as critical due to importance in modern development
  ];

  return criticalSkills.includes(skillTitle) ? 'critical' : 'technical';
};
