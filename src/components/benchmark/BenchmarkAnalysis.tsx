import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const [selectedRole, setSelectedRole] = useState<string>(id || "123");
  const { currentStates } = useSkillsMatrixStore();
  
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
  
  // Get all toggled skills for the current role
  const toggledRoleSkills = [
    ...(currentRoleSkills.specialized || []),
    ...(currentRoleSkills.common || []),
    ...(currentRoleSkills.certifications || [])
  ].filter(skill => toggledSkills.has(skill.title));

  // Calculate matching skills (skills that employee has from toggled skills)
  const matchingSkills = toggledRoleSkills.filter(skill => 
    currentStates[skill.title] && currentStates[skill.title].level !== 'Not Interested'
  );

  // Calculate total skills count based on the role
  const getTotalSkillsCount = (roleId: string) => {
    const role = roleSkills[roleId as keyof typeof roleSkills];
    if (!role) return 0;
    return (role.specialized?.length || 0) + 
           (role.common?.length || 0) + 
           (role.certifications?.length || 0);
  };

  const getMatchingSkillsCount = (roleId: string) => {
    const role = roleSkills[roleId as keyof typeof roleSkills];
    if (!role) return 0;
    
    const allRoleSkills = [
      ...(role.specialized || []),
      ...(role.common || []),
      ...(role.certifications || [])
    ];

    return allRoleSkills.filter(skill => 
      currentStates[skill.title] && 
      currentStates[skill.title].level !== 'Not Interested'
    ).length;
  };

  const totalSkillsCount = getTotalSkillsCount(selectedRole);
  const matchingSkillsCount = getMatchingSkillsCount(selectedRole);
  const matchPercentage = Math.round((matchingSkillsCount / totalSkillsCount) * 100);

  // Calculate competency match
  const competencyTotal = 12;
  const competencyMatch = 12;

  // Calculate skill goals (dynamically based on matrix state)
  const skillGoalTotal = matchingSkills.length;
  const skillGoalMatch = matchingSkills.filter(skill => {
    const state = currentStates[skill.title];
    return state && state.requirement === 'required';
  }).length;

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              Benchmark Analysis
              <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
                {matchPercentage}%
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage and track employee skills and competencies
            </p>
          </div>
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

            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Competency Match</span>
                <span className="text-sm text-foreground">{competencyMatch} out of {competencyTotal}</span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full" 
                  style={{ width: `${(competencyMatch/competencyTotal) * 100}%` }} 
                />
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Skill Goal</span>
                <span className="text-sm text-foreground">{skillGoalMatch} out of {skillGoalTotal}</span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full" 
                  style={{ width: `${(skillGoalMatch/skillGoalTotal) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};