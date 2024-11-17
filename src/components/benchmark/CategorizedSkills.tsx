import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";

interface CategorizedSkillsProps {
  roleId: string;
  employeeId: string;
  selectedLevel: string;
}

export const CategorizedSkills = ({ roleId, employeeId, selectedLevel }: CategorizedSkillsProps) => {
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  const getLevelPriority = (level: string = 'unspecified') => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
  };

  // Get all skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Filter and sort skills based on requirement and employee possession
  const requiredSkills = allRoleSkills
    .filter(skill => {
      const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
      const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
      return competencyState?.required === 'required' && toggledSkills.has(skill.title) && hasSkill;
    })
    .sort((a, b) => {
      const aState = getSkillCompetencyState(a.title, selectedLevel.toLowerCase());
      const bState = getSkillCompetencyState(b.title, selectedLevel.toLowerCase());
      return getLevelPriority(aState?.level) - getLevelPriority(bState?.level);
    });

  const preferredSkills = allRoleSkills
    .filter(skill => {
      const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
      const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
      return competencyState?.required === 'preferred' && toggledSkills.has(skill.title) && hasSkill;
    })
    .sort((a, b) => {
      const aState = getSkillCompetencyState(a.title, selectedLevel.toLowerCase());
      const bState = getSkillCompetencyState(b.title, selectedLevel.toLowerCase());
      return getLevelPriority(aState?.level) - getLevelPriority(bState?.level);
    });

  const missingSkills = allRoleSkills
    .filter(skill => {
      const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
      return !hasSkill && toggledSkills.has(skill.title);
    })
    .sort((a, b) => {
      const aState = getSkillCompetencyState(a.title, selectedLevel.toLowerCase());
      const bState = getSkillCompetencyState(b.title, selectedLevel.toLowerCase());
      return getLevelPriority(aState?.level) - getLevelPriority(bState?.level);
    });

  const getLevelColor = (skillTitle: string) => {
    const competencyState = getSkillCompetencyState(skillTitle, selectedLevel.toLowerCase());
    if (!competencyState?.level) return "bg-gray-300";

    const level = String(competencyState.level).toLowerCase();
    
    switch (level) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  const SkillSection = ({ title, skills, count }: { title: string, skills: any[], count: number }) => (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {count}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
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

  return (
    <div className="space-y-4">
      {requiredSkills.length > 0 && (
        <SkillSection 
          title="Required Skills" 
          skills={requiredSkills} 
          count={requiredSkills.length} 
        />
      )}
      
      {preferredSkills.length > 0 && (
        <SkillSection 
          title="Preferred Skills" 
          skills={preferredSkills} 
          count={preferredSkills.length} 
        />
      )}
      
      {missingSkills.length > 0 && (
        <SkillSection 
          title="Missing Skills" 
          skills={missingSkills} 
          count={missingSkills.length} 
        />
      )}
    </div>
  );
};