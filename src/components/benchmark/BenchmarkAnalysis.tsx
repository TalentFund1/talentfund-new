import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { RoleSkill } from "../skills/types";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";

interface Skill {
  name: string;
  status: "present" | "missing";
}

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  
  const currentRoleSkills = roleSkills["125"]; // Frontend Engineer role
  const employeeSkills = getEmployeeSkills(id || "");
  
  const allRequiredSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter((skill: RoleSkill) => skill.requirement === 'required');

  const missingSkills = allRequiredSkills
    .filter(skill => !employeeSkills.some(empSkill => empSkill.title === skill.title))
    .map(skill => ({
      name: skill.title,
      status: "missing" as const
    }));

  const matchPercentage = Math.round(
    ((allRequiredSkills.length - missingSkills.length) / allRequiredSkills.length) * 100
  );

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          Benchmark Analysis
          <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
            {matchPercentage}%
          </span>
        </h2>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Skill Match</span>
              <span className="text-sm text-foreground">
                {allRequiredSkills.length - missingSkills.length} out of {allRequiredSkills.length}
              </span>
            </div>
            <Progress value={matchPercentage} className="h-2" />
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Competency Match</span>
              <span className="text-sm text-foreground">8 out of 12</span>
            </div>
            <Progress value={66} className="h-2" />
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Skill Goal</span>
              <span className="text-sm text-foreground">4 out of 6</span>
            </div>
            <Progress value={66} className="h-2" />
          </div>
        </div>

        {/* Missing Skills Section */}
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
                className="rounded-md px-4 py-2 border-2 border-[#CCDBFF] flex items-center gap-2 bg-white hover:bg-background/80 transition-colors"
              >
                {skill.name}
                <div className="h-2 w-2 rounded-full bg-red-500" />
              </Badge>
            ))}
          </div>
        </div>

        {/* New Missing Skills Detailed Section */}
        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <h3 className="text-lg font-semibold mb-4">Required Skills Analysis</h3>
          
          <div className="space-y-6">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                      Missing
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This skill is required for the current role. Consider prioritizing its development.
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                All required skills are present. Great job!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};