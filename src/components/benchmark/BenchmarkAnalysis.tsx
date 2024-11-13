import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { RoleSkill } from "../skills/types";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface Skill {
  name: string;
  status: "present" | "missing";
}

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  
  const currentRoleSkills = roleSkills["125"]; // Frontend Engineer role
  const employeeSkills = getEmployeeSkills(id || "");
  
  // Get all required skills from the role
  const allRequiredSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter((skill: RoleSkill) => skill.requirement === 'required');

  // Calculate skill matches
  const skillMatches = allRequiredSkills.filter(requiredSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === requiredSkill.title);
    if (!employeeSkill) return false;

    const currentState = currentStates[requiredSkill.title];
    const employeeLevel = currentState?.level || employeeSkill.level;
    const requiredLevel = requiredSkill.level;

    const levelValues = { beginner: 1, intermediate: 2, advanced: 3 };
    return levelValues[employeeLevel.toLowerCase() as keyof typeof levelValues] >= 
           levelValues[requiredLevel.toLowerCase() as keyof typeof levelValues];
  });

  // Calculate competency matches (skills at or above required level)
  const competencyMatches = allRequiredSkills.filter(requiredSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === requiredSkill.title);
    if (!employeeSkill) return false;

    const currentState = currentStates[requiredSkill.title];
    const employeeLevel = currentState?.level || employeeSkill.level;
    const requiredLevel = requiredSkill.level;

    const levelValues = { beginner: 1, intermediate: 2, advanced: 3 };
    return levelValues[employeeLevel.toLowerCase() as keyof typeof levelValues] === 
           levelValues[requiredLevel.toLowerCase() as keyof typeof levelValues];
  });

  // Calculate skill goals (skills marked as required in matrix)
  const skillGoals = employeeSkills.filter(skill => {
    const currentState = currentStates[skill.title];
    return currentState?.requirement === 'required';
  });

  const missingSkills = allRequiredSkills
    .filter(skill => !employeeSkills.some(empSkill => empSkill.title === skill.title))
    .map(skill => ({
      name: skill.title,
      status: "missing" as const
    }));

  const skillMatchPercentage = Math.round(
    (skillMatches.length / allRequiredSkills.length) * 100
  );

  const competencyMatchPercentage = Math.round(
    (competencyMatches.length / allRequiredSkills.length) * 100
  );

  const skillGoalPercentage = Math.round(
    (skillGoals.length / allRequiredSkills.length) * 100
  );

  const getLevelStyles = () => {
    return "border-[#CCDBFF]";
  };

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          Benchmark Analysis
          <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
            {skillMatchPercentage}%
          </span>
        </h2>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Skill Match</span>
              <span className="text-sm text-foreground">
                {skillMatches.length} out of {allRequiredSkills.length}
              </span>
            </div>
            <Progress value={skillMatchPercentage} className="h-2 w-full" />
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Competency Match</span>
              <span className="text-sm text-foreground">
                {competencyMatches.length} out of {allRequiredSkills.length}
              </span>
            </div>
            <Progress value={competencyMatchPercentage} className="h-2 w-full" />
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Skill Goal</span>
              <span className="text-sm text-foreground">
                {skillGoals.length} out of {allRequiredSkills.length}
              </span>
            </div>
            <Progress value={skillGoalPercentage} className="h-2 w-full" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">Missing Skills or Certifications</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {missingSkills.length}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <Badge 
                key={`${skill.name}-${index}`}
                variant="outline" 
                className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles()}`}
              >
                {skill.name} <div className="h-2 w-2 rounded-full bg-primary-icon" />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};