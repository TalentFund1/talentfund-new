import { useToggledSkills } from "./context/ToggledSkillsContext";
import { SkillBadge } from "./SkillBadge";

export const ToggledSkillsDisplay = () => {
  const { toggledSkills } = useToggledSkills();
  const toggledSkillsList = Array.from(toggledSkills);

  if (toggledSkillsList.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-[#CCDBFF]">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Selected Skills</h3>
      <div className="flex flex-wrap gap-2">
        {toggledSkillsList.map((skill) => (
          <SkillBadge
            key={skill}
            skill={{ name: skill }}
            showLevel={false}
          />
        ))}
      </div>
    </div>
  );
};