import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { roleSkills } from "../skills/data/roleSkills";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useRoleStore } from "./RoleBenchmark";
import { useTrack } from "../skills/context/TrackContext";

interface CategorizedSkillsProps {
  roleId: string;
  employeeId: string;
}

export const CategorizedSkills = ({ roleId, employeeId }: CategorizedSkillsProps) => {
  const { toggledSkills } = useToggledSkills();
  const { selectedRole, selectedLevel } = useRoleStore();
  const { getTrackForRole } = useTrack();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  const track = getTrackForRole(selectedRole);

  // Get current role skills
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
  
  // Get all skills for this role that are toggled on
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  console.log('Processing skills for role:', {
    roleId: selectedRole,
    level: selectedLevel,
    track,
    totalSkills: allRoleSkills.length,
    toggledSkills: Array.from(toggledSkills)
  });

  // Categorize skills based on competency state
  const categorizedSkills = allRoleSkills.reduce((acc, skill) => {
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel, selectedRole);
    
    console.log('Skill competency state:', {
      skill: skill.title,
      state: competencyState,
      level: selectedLevel,
      roleId: selectedRole
    });

    if (competencyState.required === 'required') {
      acc.required.push({
        ...skill,
        level: competencyState.level
      });
    } else if (competencyState.required === 'preferred') {
      acc.preferred.push({
        ...skill,
        level: competencyState.level
      });
    } else {
      acc.missing.push({
        ...skill,
        level: competencyState.level
      });
    }
    return acc;
  }, {
    required: [] as any[],
    preferred: [] as any[],
    missing: [] as any[]
  });

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
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
            <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
          </Badge>
        ))}
      </div>
    </Card>
  );

  console.log('Categorized skills:', {
    required: categorizedSkills.required.length,
    preferred: categorizedSkills.preferred.length,
    missing: categorizedSkills.missing.length
  });

  return (
    <div className="space-y-6">
      <SkillSection 
        title="Required Skills" 
        count={categorizedSkills.required.length} 
        skills={categorizedSkills.required} 
      />
      
      <SkillSection 
        title="Preferred Skills" 
        count={categorizedSkills.preferred.length} 
        skills={categorizedSkills.preferred} 
      />
      
      <SkillSection 
        title="Missing Skills" 
        count={categorizedSkills.missing.length} 
        skills={categorizedSkills.missing} 
      />
    </div>
  );
};