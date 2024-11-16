import { useCompetencyStore } from "./competency/CompetencyState";
import { backendSkills } from "./data/skills/backendSkills";
import { Card } from "@/components/ui/card";

export const CurrentSkillsDisplay = () => {
  const { currentStates } = useCompetencyStore();
  
  const p3Skills = backendSkills.map(skill => ({
    title: skill.title,
    category: skill.category,
    currentLevel: currentStates[skill.title]?.p3?.level || skill.professionalTrack?.P3?.level || 'unspecified',
    currentRequirement: currentStates[skill.title]?.p3?.required || skill.professionalTrack?.P3?.requirement || 'preferred'
  }));

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Current Backend Engineer P3 Skills</h2>
      <div className="space-y-4">
        {p3Skills.map(skill => (
          <div key={skill.title} className="p-4 border rounded-lg bg-background/50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{skill.title}</h3>
                <p className="text-sm text-muted-foreground">Category: {skill.category}</p>
              </div>
              <div className="text-right">
                <p className="font-medium capitalize">{skill.currentLevel}</p>
                <p className="text-sm text-muted-foreground capitalize">{skill.currentRequirement}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};