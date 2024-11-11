interface Role {
  id: string;
  title: string;
  track: "Professional" | "Managerial";
  level: string;
}

export const roles: Role[] = [
  // Professional Track
  { id: "fe-p1", title: "Frontend Engineer", track: "Professional", level: "P1" },
  { id: "fe-p2", title: "Senior Frontend Engineer", track: "Professional", level: "P2" },
  { id: "fe-p3", title: "Staff Frontend Engineer", track: "Professional", level: "P3" },
  { id: "fe-p4", title: "Senior Staff Frontend Engineer", track: "Professional", level: "P4" },
  { id: "fe-p5", title: "Principal Frontend Engineer", track: "Professional", level: "P5" },
  { id: "fe-p6", title: "Distinguished Frontend Engineer", track: "Professional", level: "P6" },
  
  { id: "be-p1", title: "Backend Engineer", track: "Professional", level: "P1" },
  { id: "be-p2", title: "Senior Backend Engineer", track: "Professional", level: "P2" },
  { id: "be-p3", title: "Staff Backend Engineer", track: "Professional", level: "P3" },
  { id: "be-p4", title: "Senior Staff Backend Engineer", track: "Professional", level: "P4" },
  { id: "be-p5", title: "Principal Backend Engineer", track: "Professional", level: "P5" },
  { id: "be-p6", title: "Distinguished Backend Engineer", track: "Professional", level: "P6" },
  
  { id: "ai-p1", title: "AI Engineer", track: "Professional", level: "P1" },
  { id: "ai-p2", title: "Senior AI Engineer", track: "Professional", level: "P2" },
  { id: "ai-p3", title: "Staff AI Engineer", track: "Professional", level: "P3" },
  { id: "ai-p4", title: "Senior Staff AI Engineer", track: "Professional", level: "P4" },
  { id: "ai-p5", title: "Principal AI Engineer", track: "Professional", level: "P5" },
  { id: "ai-p6", title: "Distinguished AI Engineer", track: "Professional", level: "P6" },
  
  // Managerial Track
  { id: "em-m3", title: "Engineering Manager", track: "Managerial", level: "M3" },
  { id: "em-m4", title: "Senior Engineering Manager", track: "Managerial", level: "M4" },
  { id: "em-m5", title: "Director of Engineering", track: "Managerial", level: "M5" },
  { id: "em-m6", title: "Senior Director of Engineering", track: "Managerial", level: "M6" }
];