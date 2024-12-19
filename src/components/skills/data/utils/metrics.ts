export const getSkillGrowth = (skillTitle: string): string => {
  const growthRates: { [key: string]: string } = {
    // AI & ML Skills
    'Machine Learning': '35%',
    'Deep Learning': '32%',
    'Natural Language Processing': '30%',
    'Computer Vision': '28%',
    'TensorFlow': '25%',
    'PyTorch': '28%',
    
    // Programming & Development
    'Node.js': '30%',
    'Python': '28%',
    'TypeScript': '27%',
    'JavaScript': '25%',
    'React': '26%',
    'React Native': '24%',
    'Next.js': '28%',
    'Vue.js': '22%',
    'Angular': '20%',
    'Flutter': '25%',
    
    // Data & Analytics
    'Data Visualization': '22%',
    'Data Analysis': '24%',
    'Business Intelligence': '20%',
    'Google Analytics': '18%',
    'SEO Optimization': '16%',
    
    // DevOps & Infrastructure
    'Kubernetes': '30%',
    'Docker': '28%',
    'Jenkins': '25%',
    'Terraform': '27%',
    'AWS': '29%',
    'Azure': '26%',
    'Google Cloud': '25%',
    'DevOps Practices': '26%',
    'Linux Administration': '20%',
    'Shell Scripting': '18%',
    
    // Design & UI/UX
    'UI/UX Design': '24%',
    'User Research': '22%',
    'Wireframing': '20%',
    'Prototyping': '21%',
    'CSS/SASS': '19%',
    
    // Soft Skills & Management
    'Problem Solving': '15%',
    'Communication': '14%',
    'Team Leadership': '16%',
    'Project Management': '18%',
    'Agile Methodologies': '17%',
    'Risk Management': '16%',
    'Strategic Planning': '19%',
    'Stakeholder Management': '15%',
    'Technical Writing': '12%',
    'Code Review': '14%',
    'Git Version Control': '15%'
  };

  // If no specific growth rate is found, determine based on category
  if (!growthRates[skillTitle]) {
    console.warn(`No specific growth rate found for skill: ${skillTitle}, calculating based on characteristics`);
    
    const lowerTitle = skillTitle.toLowerCase();
    
    if (lowerTitle.includes('certified') || lowerTitle.includes('certification')) {
      return '25%'; // Certifications typically have high growth
    } else if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning')) {
      return '30%'; // AI/ML skills have very high growth
    } else if (lowerTitle.includes('cloud') || lowerTitle.includes('devops')) {
      return '28%'; // Cloud/DevOps skills have high growth
    } else if (lowerTitle.includes('development') || lowerTitle.includes('programming')) {
      return '24%'; // Development skills have good growth
    } else {
      return '20%'; // Default growth rate for other skills
    }
  }

  console.log(`Found growth rate for ${skillTitle}: ${growthRates[skillTitle]}`);
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
    
    // Programming & Development
    'Node.js': '$160,000',
    'Python': '$165,000',
    'TypeScript': '$155,000',
    'JavaScript': '$150,000',
    'React': '$160,000',
    'React Native': '$165,000',
    'Next.js': '$160,000',
    'Vue.js': '$150,000',
    'Angular': '$155,000',
    'Flutter': '$160,000',
    
    // Data & Analytics
    'Data Visualization': '$145,000',
    'Data Analysis': '$150,000',
    'Business Intelligence': '$145,000',
    'Google Analytics': '$140,000',
    'SEO Optimization': '$135,000',
    
    // DevOps & Infrastructure
    'Kubernetes': '$170,000',
    'Docker': '$165,000',
    'Jenkins': '$160,000',
    'Terraform': '$165,000',
    'AWS': '$175,000',
    'Azure': '$170,000',
    'Google Cloud': '$170,000',
    'DevOps Practices': '$165,000',
    'Linux Administration': '$155,000',
    'Shell Scripting': '$145,000',
    
    // Design & UI/UX
    'UI/UX Design': '$145,000',
    'User Research': '$140,000',
    'Wireframing': '$135,000',
    'Prototyping': '$140,000',
    'CSS/SASS': '$140,000',
    
    // Soft Skills & Management
    'Problem Solving': '$160,000',
    'Communication': '$145,000',
    'Team Leadership': '$170,000',
    'Project Management': '$170,000',
    'Agile Methodologies': '$150,000',
    'Risk Management': '$165,000',
    'Strategic Planning': '$175,000',
    'Stakeholder Management': '$165,000',
    'Technical Writing': '$140,000',
    'Code Review': '$155,000',
    'Git Version Control': '$145,000',
    
    // Certifications
    'AWS Certified Machine Learning - Specialty': '$185,000',
    'AWS Certified Solutions Architect': '$180,000',
    'AWS Certified Developer - Associate': '$165,000',
    'AWS Certified DevOps Engineer': '$175,000',
    'Certified Kubernetes Administrator': '$170,000',
    'HashiCorp Certified Terraform Associate': '$165,000',
    'TensorFlow Developer Certificate': '$170,000',
    'Google Cloud Professional': '$175,000',
    'Azure Solutions Architect': '$170,000',
    'Project Management Professional (PMP)': '$170,000',
    'Certified Scrum Master (CSM)': '$160,000'
  };

  // If no specific salary is found, calculate based on skill characteristics
  if (!salaries[skillTitle]) {
    console.warn(`No specific salary found for skill: ${skillTitle}, calculating based on characteristics`);
    
    const lowerTitle = skillTitle.toLowerCase();
    
    if (lowerTitle.includes('certified') || lowerTitle.includes('certification')) {
      return '$165,000'; // Certifications command high salaries
    } else if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning')) {
      return '$175,000'; // AI/ML skills are highly paid
    } else if (lowerTitle.includes('senior') || lowerTitle.includes('lead')) {
      return '$170,000'; // Senior/Lead positions
    } else if (lowerTitle.includes('cloud') || lowerTitle.includes('devops')) {
      return '$160,000'; // Cloud/DevOps skills
    } else if (lowerTitle.includes('development') || lowerTitle.includes('programming')) {
      return '$150,000'; // Development skills
    } else {
      return '$145,000'; // Default salary for other skills
    }
  }

  console.log(`Found salary for ${skillTitle}: ${salaries[skillTitle]}`);
  return salaries[skillTitle];
};