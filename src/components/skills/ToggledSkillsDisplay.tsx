import { SkillBadge } from "./SkillBadge";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";

export const ToggledSkillsDisplay = () => {
  const { toggledSkills } = useToggledSkills();
  const skillsArray = Array.from(toggledSkills);

  if (skillsArray.length === 0) {
    return null;
  }

  return (
    <Card className="p-4 mb-6 bg-white border-border">
      <div className="flex flex-wrap gap-2">
        {skillsArray.map((skill) => (
          <SkillBadge
            key={skill}
            skill={{ name: skill }}
            showLevel={false}
          />
        ))}
      </div>
    </Card>
  );
};