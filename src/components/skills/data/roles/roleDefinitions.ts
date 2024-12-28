export const getRoleTitle = (id: string): string => {
  const roleTitles: { [key: string]: string } = {
    "123": "AI Engineer",
    "124": "Backend Engineer", 
    "125": "Frontend Engineer",
    "126": "Engineering Manager",
    "127": "DevOps Engineer",
    "128": "Product Leader"
  };
  return roleTitles[id] || "Unknown Role";
};

export const getRoleSoc = (id: string): string => {
  const socCodes: { [key: string]: string } = {
    "123": "15-2051",
    "124": "15-1252",
    "125": "15-1252",
    "126": "11-9041",
    "127": "15-1244",
    "128": "11-2021"
  };
  return socCodes[id] || "";
};

export const getRoleDefaultTrack = (roleId: string): "Professional" | "Managerial" => {
  console.log('Determining default track for role:', roleId);
  // Only Engineering Manager (126) is a managerial role
  return roleId === "126" ? "Managerial" : "Professional";
};