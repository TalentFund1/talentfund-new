export const getBusinessCategory = (skillTitle: string): string => {
  const categories: { [key: string]: string } = {
    'React Native': 'Information Technology',
    'Flutter': 'Information Technology',
    'GraphQL': 'Information Technology',
    
    // Technical Skills
    'Amazon Web Services': 'Information Technology',
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
    
    // Version Control
    'Git Version Control': 'Development Tools'
  };
  
  return categories[skillTitle] || 'Information Technology';
};
