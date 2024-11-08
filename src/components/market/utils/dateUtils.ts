export const getCurrentMonthYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${month} ${year}`;
};

export const getPastFiveYears = () => {
  const dates = [];
  const endDate = new Date(2024, 11); // December 2024
  const startDate = new Date(endDate);
  startDate.setMonth(endDate.getMonth() - 59); // 5 years * 12 months

  for (let date = new Date(startDate); date <= endDate; date.setMonth(date.getMonth() + 1)) {
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    dates.push(`${month} ${year}`);
  }
  return dates;
};

export const getGraduationYears = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 1970; year <= currentYear + 5; year++) {
    years.push(year.toString());
  }
  return years;
};