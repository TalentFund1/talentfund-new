export const getSkillGrowth = (skillTitle: string): string => {
  const growthRates: { [key: string]: string } = {
    'Machine Learning': '35%',
    'Deep Learning': '32%',
    'React Native': '28%',
    'Flutter': '25%',
    'GraphQL': '24%'
  };

  return growthRates[skillTitle] || '20%';
};

export const getSkillSalary = (skillTitle: string): string => {
  const salaries: { [key: string]: string } = {
    'Machine Learning': '$185,000',
    'Deep Learning': '$180,000',
    'React Native': '$160,000',
    'Flutter': '$150,000',
    'GraphQL': '$155,000'
  };

  return salaries[skillTitle] || '$150,000';
};