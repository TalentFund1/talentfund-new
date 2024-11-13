import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "../skills/competency/CompetencyState";

interface MissingSkills2Props {
  roleId: string;
  employeeId: string;
  selectedLevel: string;
}

export const MissingSkills2 = ({ roleId, employeeId, selectedLevel }: MissingSkills2Props) => {
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useCompetencyStore();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  // Get all required and preferred skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Find missing skills by comparing with employee skills, but only for toggled skills
  const missingSkills = allRoleSkills.filter(roleSkill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === roleSkill.title);
    return !hasSkill && toggledSkills.has(roleSkill.title);
  });

  const getLevelColor = (skillTitle: string) => {
    const levelNum = selectedLevel.toLowerCase().startsWith('p') 
      ? parseInt(selectedLevel.substring(1))
      : parseInt(selectedLevel.substring(1));
    
    // Backend Engineer specific logic
    if (roleId === "124") {
      // Kubernetes and Code Review should be advanced (purple) for Backend Engineer
      if (skillTitle === "Kubernetes" || skillTitle === "Code Review") {
        return "bg-primary-accent";
      }
      
      // Other Backend specific skills progression
      if (skillTitle === "Node.js") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 4) return "bg-primary-icon"; // Intermediate for P3-P4
        return "bg-primary-accent"; // Advanced for P5-P6
      }
      
      if (skillTitle === "Database Design" || skillTitle === "API Development") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 3) return "bg-primary-icon"; // Intermediate for P3
        return "bg-primary-accent"; // Advanced for P4-P6
      }
    }
    
    // Frontend Engineer specific logic
    if (roleId === "125") {
      if (skillTitle === "React") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 3) return "bg-gray-300"; // Unspecified for P3
        return "bg-primary-accent"; // Advanced for P4-P6
      }
      
      if (skillTitle === "TypeScript") {
        if (levelNum <= 3) return "bg-gray-300"; // Unspecified for P1-P3
        if (levelNum === 4) return "bg-primary-icon"; // Intermediate for P4
        return "bg-primary-accent"; // Advanced for P5-P6
      }
    }
    
    // Engineering Manager specific logic
    if (roleId === "126") {
      return "bg-primary-accent"; // Most skills are advanced for Engineering Manager
    }
    
    // AI Engineer specific logic
    if (roleId === "123") {
      if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
      if (levelNum <= 4) return "bg-primary-icon"; // Intermediate for P3-P4
      return "bg-primary-accent"; // Advanced for P5-P6
    }

    // Default progression for other skills
    if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
    if (levelNum <= 4) return "bg-primary-icon"; // Intermediate for P3-P4
    return "bg-primary-accent"; // Advanced for P5-P6
  };

  if (missingSkills.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Missing Skills</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {missingSkills.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {missingSkills.map((skill) => (
          <Badge 
            key={skill.title}
            variant="outline" 
            className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
          >
            {skill.title}
            <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.title)}`} />
          </Badge>
        ))}
      </div>
    </Card>
  );
};
