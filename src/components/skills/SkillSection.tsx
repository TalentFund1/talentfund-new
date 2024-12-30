import { SkillBubble } from "./SkillBubble";
import { EmployeeSkillData } from "../employee/types/employeeSkillTypes";

interface SkillSectionProps {
  title: string;
  count: number;
  skills: EmployeeSkillData[];
}

export const SkillSection = ({ title, count, skills }: SkillSectionProps) => {
  // Filter skills based on section
  const filteredSkills = title === "Current" 
    ? skills // Show all skills in Current section
    : title === "Developing"
    ? skills.filter(skill => 
        skill.goalStatus === 'skill_goal' || // Include skills marked as developing
        skill.level === 'unspecified' // Include all unspecified level skills
      )
    : skills;

  // Update count to reflect filtered skills
  const displayCount = filteredSkills.length;

  console.log('SkillSection rendering:', {
    title,
    originalCount: count,
    filteredCount: displayCount,
    skillLevels: filteredSkills.map(s => ({
      title: s.title,
      level: s.level,
      goalStatus: s.goalStatus
    }))
  });

  return (
    <div className="rounded-2xl border border-border bg-white p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {displayCount}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {filteredSkills.map((skill) => (
          <SkillBubble
            key={skill.title}
            skillName={skill.title}
            level={skill.level}
          />
        ))}
      </div>
    </div>
  );
};