import { useToggledSkills } from "./context/ToggledSkillsContext";
import { SkillBadge } from "./SkillBadge";

export const ToggledSkillsDisplay = () => {
  const { toggledSkills } = useToggledSkills();
  const toggledSkillsArray = Array.from(toggledSkills);

  if (toggledSkillsArray.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-4 border border-border rounded-lg bg-white">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Selected Skills ({toggledSkillsArray.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {toggledSkillsArray.map((skill) => (
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