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
    // Frontend Engineer P2 specific logic
    if (selectedLevel.toLowerCase() === 'p2') {
      if (skillTitle === 'React') return "bg-[#008000]"; // Beginner (green)
      if (skillTitle === 'TypeScript') return "bg-gray-300"; // Unspecified (gray)
    }
    
    // Professional track (P1-P6)
    if (selectedLevel.toLowerCase().startsWith('p')) {
      const levelNum = parseInt(selectedLevel.substring(1));
      
      // React specific progression
      if (skillTitle === 'React') {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum === 3) return "bg-gray-300"; // Unspecified for P3
        if (levelNum === 4) return "bg-primary-accent"; // Advanced for P4
        if (levelNum === 5) return "bg-primary-accent"; // Advanced for P5
        return "bg-[#008000]"; // Beginner for P6
      }
      
      // TypeScript specific progression
      if (skillTitle === 'TypeScript') {
        if (levelNum <= 3) return "bg-gray-300"; // Unspecified for P1-P3
        if (levelNum === 4) return "bg-primary-icon"; // Intermediate for P4
        return "bg-gray-300"; // Unspecified for P5-P6
      }
    }
    
    // Managerial track (M3-M6)
    if (selectedLevel.toLowerCase().startsWith('m')) {
      const levelNum = parseInt(selectedLevel.substring(1));
      if (levelNum === 3) return "bg-primary-icon"; // Intermediate for M3
      return "bg-primary-accent"; // Advanced for M4-M6
    }

    return "bg-gray-300"; // Default
  };

  if (missingSkills.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Missing Skills 2 (Level-based)</span>
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