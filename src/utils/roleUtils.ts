export const getRoleTitle = (id: string) => {
  const roleTitles: { [key: string]: string } = {
    "123": "AI Engineer",
    "124": "Backend Engineer",
    "125": "Frontend Engineer",
    "126": "Engineering Manager"
  };
  return roleTitles[id] || "AI Engineer";
};