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

  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const missingSkills = allRoleSkills.filter(roleSkill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === roleSkill.title);
    return !hasSkill && toggledSkills.has(roleSkill.title);
  });

  const getLevelColor = (skillTitle: string) => {
    const level = selectedLevel.toLowerCase();
    const levelNum = parseInt(level.substring(1));

    // Frontend Engineer (125)
    if (roleId === "125") {
      if (skillTitle === "React") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 3) return "bg-primary-icon"; // Intermediate for P3
        return "bg-primary-accent"; // Advanced for P4+
      }
      if (skillTitle === "TypeScript") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 4) return "bg-primary-icon"; // Intermediate for P3-P4
        return "bg-primary-accent"; // Advanced for P5+
      }
      if (skillTitle === "UI/UX Design") {
        if (levelNum <= 3) return "bg-[#008000]"; // Beginner for P1-P3
        if (levelNum <= 5) return "bg-primary-icon"; // Intermediate for P4-P5
        return "bg-primary-accent"; // Advanced for P6
      }
      if (skillTitle === "CSS/SASS" || skillTitle === "Next.js") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 3) return "bg-primary-icon"; // Intermediate for P3
        return "bg-primary-accent"; // Advanced for P4+
      }
    }

    // Backend Engineer (124)
    if (roleId === "124") {
      if (skillTitle === "Node.js" || skillTitle === "Database Design") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 3) return "bg-primary-icon"; // Intermediate for P3
        return "bg-primary-accent"; // Advanced for P4+
      }
      if (skillTitle === "API Development" || skillTitle === "System Architecture") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 4) return "bg-primary-icon"; // Intermediate for P3-P4
        return "bg-primary-accent"; // Advanced for P5+
      }
      if (skillTitle === "Kubernetes") {
        if (levelNum <= 3) return "bg-[#008000]"; // Beginner for P1-P3
        if (levelNum <= 4) return "bg-primary-icon"; // Intermediate for P4
        return "bg-primary-accent"; // Advanced for P5+
      }
    }

    // AI Engineer (123)
    if (roleId === "123") {
      if (skillTitle === "Machine Learning" || skillTitle === "Deep Learning") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 3) return "bg-primary-icon"; // Intermediate for P3
        return "bg-primary-accent"; // Advanced for P4+
      }
      if (skillTitle === "TensorFlow" || skillTitle === "PyTorch") {
        if (levelNum <= 3) return "bg-[#008000]"; // Beginner for P1-P3
        if (levelNum <= 4) return "bg-primary-icon"; // Intermediate for P4
        return "bg-primary-accent"; // Advanced for P5+
      }
      if (skillTitle === "Natural Language Processing" || skillTitle === "Computer Vision") {
        if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
        if (levelNum <= 4) return "bg-primary-icon"; // Intermediate for P3-P4
        return "bg-primary-accent"; // Advanced for P5+
      }
    }

    // Engineering Manager (126)
    if (roleId === "126") {
      // Engineering Manager uses M3-M6 levels
      if (level.startsWith('m')) {
        if (skillTitle === "System Design" || skillTitle === "Technical Architecture") {
          if (levelNum === 3) return "bg-primary-icon"; // Intermediate for M3
          return "bg-primary-accent"; // Advanced for M4+
        }
        if (skillTitle === "Team Leadership" || skillTitle === "Project Management") {
          if (levelNum === 3) return "bg-[#008000]"; // Beginner for M3
          if (levelNum === 4) return "bg-primary-icon"; // Intermediate for M4
          return "bg-primary-accent"; // Advanced for M5+
        }
      }
    }

    // Common skills progression
    if (skillTitle === "Problem Solving" || skillTitle === "Cross-browser Compatibility") {
      if (levelNum <= 2) return "bg-[#008000]"; // Beginner for P1-P2
      if (levelNum <= 3) return "bg-primary-icon"; // Intermediate for P3
      return "bg-primary-accent"; // Advanced for P4+
    }

    return "bg-gray-300"; // Default/Unspecified
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