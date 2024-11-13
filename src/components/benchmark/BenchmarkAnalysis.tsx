import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { RoleSkill } from "../skills/types";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { MissingSkills2 } from "./MissingSkills2";

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const [selectedRole, setSelectedRole] = useState<string>(id || "125"); // Default to Frontend Engineer
  
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["125"];
  const employeeSkills = getEmployeeSkills(id || "");
  
  // Get all toggled skills for the current role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Calculate total toggled skills for this role
  const totalToggledSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title)).length;

  // Calculate matching skills (skills that employee has from toggled skills)
  const matchingSkills = allRoleSkills.filter(skill => 
    toggledSkills.has(skill.title) && employeeSkills.some(empSkill => empSkill.title === skill.title)
  );

  // Calculate skill goals (skills marked as required)
  const skillGoals = matchingSkills.filter(skill => 
    skill.level === 'advanced' || skill.level === 'intermediate'
  );

  // Calculate percentages
  const matchPercentage = totalToggledSkills > 0 
    ? Math.round((matchingSkills.length / totalToggledSkills) * 100)
    : 0;

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          Benchmark Analysis
          <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
            {matchPercentage}%
          </span>
        </h2>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="123">AI Engineer</SelectItem>
            <SelectItem value="124">Backend Engineer</SelectItem>
            <SelectItem value="125">Frontend Engineer</SelectItem>
            <SelectItem value="126">Engineering Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Skill Match</span>
              <span className="text-sm text-muted-foreground">
                {matchingSkills.length} out of {totalToggledSkills}
              </span>
            </div>
            <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#027A48] transition-all duration-500"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Competency Match</span>
              <span className="text-sm text-muted-foreground">
                {matchingSkills.length} out of {totalToggledSkills}
              </span>
            </div>
            <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-accent transition-all duration-500"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Skill Goal</span>
              <span className="text-sm text-muted-foreground">
                {skillGoals.length} out of {matchingSkills.length}
              </span>
            </div>
            <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-icon transition-all duration-500"
                style={{ width: `${(skillGoals.length / matchingSkills.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <MissingSkills2 roleId={selectedRole} employeeId={id || ""} selectedLevel="p4" />
      </div>
    </div>
  );
};