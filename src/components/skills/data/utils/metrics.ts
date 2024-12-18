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
    'Machine Learning': '$185,000',
    'Deep Learning': '$180,000',
    'Natural Language Processing': '$175,000',
    'Computer Vision': '$170,000',
    'TensorFlow': '$165,000',
    'PyTorch': '$170,000',
    'Node.js': '$160,000',
    'Database Design': '$155,000',
    'API Development': '$150,000',
    'System Architecture': '$165,000',
    'GraphQL': '$140,000',
    'Kubernetes': '$160,000',
    'Docker': '$155,000',
    'Jenkins': '$150,000',
    'Terraform': '$155,000',
    'Problem Solving': '$160,000',
    'Code Review': '$155,000',
    'Agile Methodologies': '$150,000',
    'Communication': '$145,000',
    'Team Leadership': '$140,000',
    'Git Version Control': '$135,000',
    'Technical Writing': '$130,000',
    'AWS Certified DevOps Engineer': '$175,000',
    'AWS Certified Solutions Architect': '$180,000',
    'AWS Certified Developer - Associate': '$165,000',
    'Certified Kubernetes Administrator': '$170,000',
    'HashiCorp Certified Terraform Associate': '$165,000'
  };

  return salaries[skillTitle] || '$150,000';
};