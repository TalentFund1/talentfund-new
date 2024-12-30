import { SkillBubble } from "./SkillBubble";
import { EmployeeSkillData } from "../employee/types/employeeSkillTypes";

interface SkillSectionProps {
  title: string;
  count: number;
  skills: EmployeeSkillData[];
}

export const SkillSection = ({ title, count, skills }: SkillSectionProps) => {
  console.log(`${title} section - Processing skills:`, {
    skillCount: skills.length,
    skills: skills.map(s => ({
      title: s.title,
      inDevelopmentPlan: s.inDevelopmentPlan,
      level: s.level
    }))
  });

  // Filter skills based on section
  const filteredSkills = title === "Current" 
    ? skills // Show all skills in Current section
    : title === "Developing 2"
    ? skills // Already filtered by inDevelopmentPlan in SkillSectionList
    : skills;

  // Update count to reflect filtered skills
  const displayCount = filteredSkills.length;

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