import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { roleSkills } from "../../skills/data/roleSkills";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

interface SkillsMatrixSectionsProps {
  selectedRole: string;
  selectedLevel: string;
  toggledSkills: Set<string>;
  employeeSkills: any[];
}

export const SkillsMatrixSections = ({ 
  selectedRole, 
  selectedLevel,
  toggledSkills,
  employeeSkills 
}: SkillsMatrixSectionsProps) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  // Get all skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  // Filter required skills
  const requiredSkills = allRoleSkills.filter(skill => {
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
    return competencyState?.required === 'required';
  });

  // Filter missing skills
  const missingSkills = allRoleSkills.filter(skill => {
    const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
    return !hasSkill;
  });

  const SkillSection = ({ title, skills, count }: { title: string, skills: any[], count: number }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
          {count}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge 
            key={skill.title}
            variant="outline" 
            className="rounded-md px-3 py-1 border border-border bg-white"
          >
            {skill.title}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="p-6 space-y-6">
      {requiredSkills.length > 0 && (
        <SkillSection 
          title="Required Skills" 
          skills={requiredSkills} 
          count={requiredSkills.length} 
        />
      )}
      
      {missingSkills.length > 0 && (
        <SkillSection 
          title="Missing Skills" 
          skills={missingSkills} 
          count={missingSkills.length} 
        />
      )}
    </Card>
  );
};