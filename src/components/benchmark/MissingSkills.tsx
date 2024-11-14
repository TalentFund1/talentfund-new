import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { Star, Shield, Target, CircleDashed } from "lucide-react";
import { getSkillRequirements } from "../skills/data/skillsDatabase";
import { useTrack } from "../skills/context/TrackContext";

interface MissingSkillsProps {
  roleId: string;
  employeeId: string;
  selectedLevel: string;
}

export const MissingSkills = ({ roleId, employeeId, selectedLevel }: MissingSkillsProps) => {
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useCompetencyStore();
  const { getTrackForRole } = useTrack();
  const track = getTrackForRole(roleId);
  const currentTrack = track?.toLowerCase() as 'professional' | 'managerial';
  
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
  }).map(skill => {
    const requirements = getSkillRequirements(
      skill.title,
      currentTrack,
      selectedLevel.toUpperCase()
    );
    return {
      ...skill,
      level: requirements?.level || 'unspecified',
      requirement: requirements?.requirement || 'preferred'
    };
  });

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "advanced":
        return <Star className="w-3 h-3 text-primary-accent" />;
      case "intermediate":
        return <Shield className="w-3 h-3 text-primary-icon" />;
      case "beginner":
        return <Target className="w-3 h-3 text-[#008000]" />;
      default:
        return <CircleDashed className="w-3 h-3 text-gray-400" />;
    }
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
            className={`rounded-md px-4 py-2 border ${
              skill.requirement === 'required' 
                ? 'border-primary-accent/50 hover:border-primary-accent' 
                : 'border-border hover:bg-background/80'
            } bg-white transition-colors flex items-center gap-2`}
          >
            {skill.title}
            <div className="flex items-center gap-1.5">
              {getLevelIcon(skill.level)}
            </div>
          </Badge>
        ))}
      </div>
    </Card>
  );
};