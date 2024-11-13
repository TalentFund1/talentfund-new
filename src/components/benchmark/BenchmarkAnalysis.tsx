import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { RoleSkill } from "../skills/types";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Skill {
  name: string;
  status: "present" | "missing";
}

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const [selectedRole, setSelectedRole] = useState<string>(id || "125"); // Default to Frontend Engineer
  
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["125"];
  const employeeSkills = getEmployeeSkills(id || "");
  
  // Calculate total required and preferred skills for P4
  const requiredAndPreferredSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter((skill: RoleSkill) => skill.requirement === 'required' || skill.requirement === 'preferred');

  // Calculate matching skills (skills that employee has from required and preferred skills)
  const matchingSkills = requiredAndPreferredSkills.filter(skill => 
    employeeSkills.some(empSkill => empSkill.title === skill.title)
  );

  // Calculate skill match percentage based on the ratio
  const totalSkillsCount = requiredAndPreferredSkills.length;
  const matchingSkillsCount = matchingSkills.length;
  const matchPercentage = totalSkillsCount > 0 
    ? Math.round((matchingSkillsCount / totalSkillsCount) * 100)
    : 0;

  // Calculate missing skills
  const missingSkills = requiredAndPreferredSkills
    .filter(skill => !employeeSkills.some(empSkill => empSkill.title === skill.title))
    .map(skill => ({
      name: skill.title,
      status: "missing" as const
    }));

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
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Skill Match</span>
              <span className="text-sm text-foreground">
                {matchingSkillsCount} out of {totalSkillsCount}
              </span>
            </div>
            <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1F2144] rounded-full" 
                style={{ width: `${matchPercentage}%` }} 
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-foreground">Missing Skills or Certifications</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {missingSkills.length}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <Badge 
                key={`${skill.name}-${index}`}
                variant="outline" 
                className="rounded-full px-4 py-2 border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
              >
                {skill.name}
                <div className={`h-2 w-2 rounded-full ${
                  index % 2 === 0 ? 'bg-primary-accent' : 'bg-primary-icon'
                }`} />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};