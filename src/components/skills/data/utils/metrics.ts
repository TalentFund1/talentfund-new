export const getSkillGrowth = (skillTitle: string): string => {
  const growthRates: { [key: string]: string } = {
    // AI & ML Skills
    'Machine Learning': '35%',
    'Deep Learning': '32%',
    'Natural Language Processing': '30%',
    'Computer Vision': '28%',
    'TensorFlow': '25%',
    'PyTorch': '28%',
    
    // Backend Skills
    'Node.js': '30%',
    'Database Design': '28%',
    'API Development': '27%',
    'System Architecture': '26%',
    'GraphQL': '25%',
    
    // DevOps Skills
    'Kubernetes': '30%',
    'Docker': '28%',
    'Jenkins': '25%',
    'Terraform': '27%',
    
    // Common/Soft Skills
    'Problem Solving': '15%',
    'Code Review': '14%',
    'Agile Methodologies': '13%',
    'Communication': '12%',
    'Team Leadership': '11%',
    'Git Version Control': '10%',
    'Technical Writing': '9%',
    'Project Management': '18%',
    'Risk Management': '16%',
    'Strategic Planning': '17%',
    'System Design': '15%',
    'Technical Architecture': '16%',
    'Linux Administration': '14%',
    'Shell Scripting': '12%',
    'Stakeholder Management': '15%'
  };

  if (!growthRates[skillTitle]) {
    console.warn(`No specific growth rate found for skill: ${skillTitle}, using default growth rate`);
    return '10%';
  }

  return growthRates[skillTitle];
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
    'Linux Administration': '$145,000',
    'Shell Scripting': '$140,000',
    'Stakeholder Management': '$160,000',
    
    // Certifications
    'AWS Certified DevOps Engineer': '$175,000',
    'AWS Certified Solutions Architect': '$180,000',
    'AWS Certified Developer - Associate': '$165,000',
    'Certified Kubernetes Administrator': '$170,000',
    'HashiCorp Certified Terraform Associate': '$165,000',
    'AWS Certified Machine Learning - Specialty': '$185,000',
    'TensorFlow Developer Certificate': '$170,000',
    'Google Cloud Professional': '$175,000',
    'Azure Solutions Architect': '$170,000'
  };

  if (!salaries[skillTitle]) {
    console.warn(`No specific salary found for skill: ${skillTitle}, using default salary`);
    
    if (skillTitle.toLowerCase().includes('senior') || skillTitle.toLowerCase().includes('lead')) {
      return '$160,000';
    } else if (skillTitle.toLowerCase().includes('certified') || skillTitle.toLowerCase().includes('certification')) {
      return '$150,000';
    } else if (skillTitle.toLowerCase().includes('development') || skillTitle.toLowerCase().includes('engineering')) {
      return '$140,000';
    } else {
      return '$130,000';
    }
  }

  return salaries[skillTitle];
};

console.log('Metrics utility initialized with:', {
  growthRatesCount: Object.keys(getSkillGrowth).length,
  salariesCount: Object.keys(getSkillSalary).length
});