export const getBusinessCategory = (skillTitle: string): string => {
  const categories: { [key: string]: string } = {
    // Technical Skills
    'React Native': 'Information Technology',
    'Flutter': 'Information Technology',
    'GraphQL': 'Information Technology',
    'Machine Learning': 'Information Technology',
    'Deep Learning': 'Information Technology',
    'Python': 'Information Technology',
    'Docker': 'Information Technology',
    'Kubernetes': 'Information Technology',
    'Jenkins': 'Information Technology',
    'Terraform': 'Information Technology',
    'Linux Administration': 'Information Technology',
    'Node.js': 'Information Technology',
    'React': 'Information Technology',
    'Next.js': 'Information Technology',
    'Git': 'Information Technology',
    'Git Version Control': 'Information Technology',
    'TensorFlow Developer Certificate': 'Information Technology',
    'TensorFlow Developer Certification': 'Information Technology',
    
    // Soft Skills
    'Communication': 'Media and Communications',
    'Technical Writing': 'Media and Communications',
    'Problem Solving': 'Physical and Inherent Abilities',
    'Team Leadership': 'Initiative and Leadership',
    'Project Management': 'Project Management',
    'Strategic Planning': 'Project Management',
    
    // Analysis Skills
    'Data Science': 'Analysis',
    'Computer Vision': 'Analysis',
    'Natural Language Processing': 'Analysis',
    
    // Management Skills
    'Risk Management': 'Risk and Compliance',
    'Stakeholder Management': 'Initiative and Leadership',
    
    // Architecture Skills
    'System Design': 'Information Technology',
    'Database Design': 'Information Technology',
    'Technical Architecture': 'Information Technology',
    
    // Certifications
    'AWS Certified Machine Learning - Specialty': 'Information Technology',
    'AWS Certified Solutions Architect': 'Information Technology',
    'AWS Certified Developer - Associate': 'Information Technology',
    'AWS Certified DevOps Engineer': 'Information Technology',
    'Certified Kubernetes Administrator': 'Information Technology',
    'HashiCorp Certified Terraform Associate': 'Information Technology',
    'MongoDB Professional Developer': 'Information Technology',
    'Google Mobile Web Specialist': 'Information Technology',
    'Professional Scrum Developer': 'Information Technology',
    'Project Management Professional (PMP)': 'Project Management',
    'Certified Scrum Master (CSM)': 'Project Management',
    'ITIL Foundation': 'Information Technology'
  };
  
  return categories[skillTitle] || 'Information Technology';
};