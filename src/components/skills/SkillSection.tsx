import { SkillBubble } from "./SkillBubble";
import { EmployeeSkillData } from "../employee/types/employeeSkillTypes";

interface SkillSectionProps {
  title: string;
  count: number;
  skills: EmployeeSkillData[];
}

export const SkillSection = ({ title, count, skills }: SkillSectionProps) => {
  // If this is the Developing section, filter skills with checked skill growth
  if (title === "Developing") {
    console.log('Filtering Developing section based on skill growth');
    
    // Filter skills that have skill growth checked
    const developingSkills = skills.filter(skill => skill.metrics?.skillScore > 0);
    
    console.log('Developing skills:', {
      totalSkills: skills.length,
      developingSkillsCount: developingSkills.length,
      developingSkills: developingSkills.map(s => ({
        title: s.title,
        level: s.level,
        hasSkillGrowth: s.metrics?.skillScore > 0
      }))
    });

    return (
      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Developing</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {developingSkills.length}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {developingSkills.map((skill) => (
            <SkillBubble
              key={skill.title}
              skillName={skill.title}
              level={skill.level}
            />
          ))}
        </div>
      </div>
    );
  }

  // For other sections, keep existing functionality
  console.log('SkillSection rendering:', {
    title,
    skillCount: skills.length,
    skillLevels: skills.map(s => ({
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
            {count}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
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