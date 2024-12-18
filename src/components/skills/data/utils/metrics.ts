export const getSkillGrowth = (skillTitle: string): string => {
  const growthRates: { [key: string]: string } = {
    'Machine Learning': '35%',
    'Deep Learning': '32%',
    'Natural Language Processing': '30%',
    'Computer Vision': '28%',
    'TensorFlow': '25%',
    'PyTorch': '28%',
    'Node.js': '30%',
    'Database Design': '28%',
    'API Development': '27%',
    'System Architecture': '26%',
    'GraphQL': '25%',
    'Kubernetes': '30%',
    'Docker': '28%',
    'Jenkins': '25%',
    'Terraform': '27%',
    'Problem Solving': '15%',
    'Code Review': '14%',
    'Agile Methodologies': '13%',
    'Communication': '12%',
    'Team Leadership': '11%',
    'Git Version Control': '10%',
    'Technical Writing': '9%'
  };

  return growthRates[skillTitle] || '20%';
};

export const getSkillSalary = (skillTitle: string): string => {
  const salaries: { [key: string]: string } = {
    // AI & ML Skills
    'Machine Learning': '$185,000',
    'Deep Learning': '$180,000',
    'Natural Language Processing': '$175,000',
    'Computer Vision': '$170,000',
    'TensorFlow': '$165,000',
    'PyTorch': '$170,000',
    
    // Backend Skills
    'Node.js': '$160,000',
    'Database Design': '$155,000',
    'API Development': '$150,000',
    'System Architecture': '$165,000',
    'GraphQL': '$140,000',
    
    // DevOps Skills
    'Kubernetes': '$160,000',
    'Docker': '$155,000',
    'Jenkins': '$150,000',
    'Terraform': '$155,000',
    
    // Common/Soft Skills
    'Problem Solving': '$160,000',
    'Code Review': '$155,000',
    'Agile Methodologies': '$150,000',
    'Communication': '$145,000',
    'Team Leadership': '$140,000',
    'Git Version Control': '$135,000',
    'Technical Writing': '$130,000',
    'Project Management': '$170,000',
    'Risk Management': '$165,000',
    'Strategic Planning': '$175,000',
    'System Design': '$165,000',
    'Technical Architecture': '$175,000',
    
    // Certifications
    'AWS Certified DevOps Engineer': '$175,000',
    'AWS Certified Solutions Architect': '$180,000',
    'AWS Certified Developer - Associate': '$165,000',
    'Certified Kubernetes Administrator': '$170,000',
    'HashiCorp Certified Terraform Associate': '$165,000',
    'AWS Certified Machine Learning - Specialty': '$185,000',
    'TensorFlow Developer Certificate': '$170,000',
    'Google Cloud Professional': '$175,000',
    'Azure Solutions Architect': '$170,000',
    
    // Additional Technical Skills
    'Python': '$145,000',
    'React': '$140,000',
    'React Native': '$145,000',
    'UI/UX Design': '$130,000',
    'DevOps Practices': '$150,000',
    'Google Analytics': '$125,000',
    'Data Visualization': '$135,000',
    'SEO Optimization': '$120,000',
  };

  // If no specific salary is found, return a default based on the skill title's characteristics
  if (!salaries[skillTitle]) {
    console.warn(`No specific salary found for skill: ${skillTitle}, using default salary`);
    
    // Default salaries based on keywords in the skill title
    if (skillTitle.toLowerCase().includes('senior') || skillTitle.toLowerCase().includes('lead')) {
      return '$160,000';
    } else if (skillTitle.toLowerCase().includes('certified') || skillTitle.toLowerCase().includes('certification')) {
      return '$150,000';
    } else if (skillTitle.toLowerCase().includes('development') || skillTitle.toLowerCase().includes('engineering')) {
      return '$140,000';
    } else {
      return '$130,000'; // Base default salary
    }
  }

  return salaries[skillTitle];
};