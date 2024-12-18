export const getBusinessCategory = (skillTitle: string): string => {
  const categories: { [key: string]: string } = {
    // Technical Skills
    'React Native': 'Information Technology',
    'Flutter': 'Information Technology',
    'GraphQL': 'Information Technology',
    'Machine Learning': 'Information Technology',
    'Deep Learning': 'Information Technology',
    'Natural Language Processing': 'Information Technology',
    'Computer Vision': 'Information Technology',
    'TensorFlow': 'Information Technology',
    'PyTorch': 'Information Technology',
    'MLflow': 'Information Technology',
    'Python': 'Information Technology',
    'Docker': 'Information Technology',
    'Kubernetes': 'Information Technology',
    'Jenkins': 'Information Technology',
    'Terraform': 'Information Technology',
    'Linux Administration': 'Information Technology',
    'Node.js': 'Information Technology',
    'React': 'Information Technology',
    'Next.js': 'Information Technology',
    'Vue.js': 'Information Technology',
    'Git': 'Information Technology',
    'Git Version Control': 'Information Technology',
    'Amazon Web Services': 'Information Technology',
    'AWS': 'Information Technology',
    'DevOps': 'Information Technology',
    'Microservices': 'Information Technology',
    'Performance Optimization': 'Information Technology',
    'CSS/SASS': 'Information Technology',
    'TypeScript': 'Information Technology',
    'Blockchain': 'Information Technology',
    'Data Engineering': 'Information Technology',
    
    // Soft Skills
    'Communication': 'Media and Communications',
    'Technical Writing': 'Media and Communications',
    'Problem Solving': 'Physical and Inherent Abilities',
    'Team Leadership': 'Initiative and Leadership',
    'Project Management': 'Project Management',
    'Strategic Planning': 'Project Management',
    'Stakeholder Management': 'Initiative and Leadership',
    'Risk Management': 'Risk and Compliance',
    'Agile Methodologies': 'Project Management',
    
    // Analysis & Design
    'Data Science': 'Analysis',
    'UI/UX Design': 'Design',
    'System Design': 'Architecture',
    'Technical Architecture': 'Architecture',
    'Database Design': 'Information Technology',
    'API Development': 'Information Technology',
    'System Architecture': 'Architecture',
    
    // Security
    'Cybersecurity': 'Security',
    
    // Development Practices
    'Code Review': 'Development Practices',
    'Shell Scripting': 'Development Tools',
    'Cross-browser Compatibility': 'Development Practices',
    'Responsive Design': 'Development Practices',
    
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
    'TensorFlow Developer Certificate': 'Information Technology',
    'TensorFlow Developer Certification': 'Information Technology',
    'Project Management Professional (PMP)': 'Project Management',
    'Certified Scrum Master (CSM)': 'Project Management',
    'ITIL Foundation': 'Information Technology',
    'Google Cloud Professional Machine Learning Engineer': 'Information Technology'
  };
  
  // If not found in mapping, determine category based on keywords
  const lowerTitle = skillTitle.toLowerCase();
  if (!categories[skillTitle]) {
    if (lowerTitle.includes('aws') || 
        lowerTitle.includes('cloud') || 
        lowerTitle.includes('development') ||
        lowerTitle.includes('engineering') ||
        lowerTitle.includes('programming') ||
        lowerTitle.includes('software') ||
        lowerTitle.includes('database') ||
        lowerTitle.includes('api') ||
        lowerTitle.includes('devops')) {
      console.log(`Auto-categorizing ${skillTitle} as Information Technology based on keywords`);
      return 'Information Technology';
    }
    
    if (lowerTitle.includes('management') || 
        lowerTitle.includes('planning') ||
        lowerTitle.includes('agile') ||
        lowerTitle.includes('scrum')) {
      console.log(`Auto-categorizing ${skillTitle} as Project Management based on keywords`);
      return 'Project Management';
    }
  }
  
  return categories[skillTitle] || 'Information Technology';
};