import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { RoleSelection } from "./RoleSelection";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { CompetencyGraph } from "../skills/CompetencyGraph";
import { Card } from "../ui/card";
import { create } from "zustand";
import { CategoryCards } from "./CategoryCards";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { Badge } from "../ui/badge";

interface RoleStore {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  selectedRole: "123",
  setSelectedRole: (role) => set({ selectedRole: role }),
  selectedLevel: "p4",
  setSelectedLevel: (level) => set({ selectedLevel: level }),
}));

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole, setTrackForRole } = useTrack();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { selectedRole, setSelectedRole, selectedLevel: roleLevel, setSelectedLevel: setRoleLevel } = useRoleStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  const currentTrack = getTrackForRole(selectedRole);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  // Get all skills from the role profile
  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Filter required skills
  const requiredSkills = allSkills.filter(skill => {
    const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    return toggledSkills.has(skill.title) && competencyState?.required === 'required';
  });

  // Filter preferred skills
  const preferredSkills = allSkills.filter(skill => {
    const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    return toggledSkills.has(skill.title) && competencyState?.required === 'preferred';
  });

  // Filter missing skills (skills that are toggled but not in required or preferred)
  const missingSkills = allSkills.filter(skill => {
    const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    return toggledSkills.has(skill.title) && (!competencyState || !competencyState.required);
  });

  useEffect(() => {
    if (currentTrack === "Professional" && roleLevel.toLowerCase().startsWith("m")) {
      setRoleLevel("p4");
    } else if (currentTrack === "Managerial" && roleLevel.toLowerCase().startsWith("p")) {
      setRoleLevel("m3");
    }
  }, [currentTrack]);

  useEffect(() => {
    const allSkills = [
      ...(currentRoleSkills.specialized || []),
      ...(currentRoleSkills.common || []),
      ...(currentRoleSkills.certifications || [])
    ]
    .map(skill => skill.title)
    .filter(skillTitle => toggledSkills.has(skillTitle));
    
    setBenchmarkSearchSkills(allSkills);
  }, [selectedRole, currentRoleSkills, setBenchmarkSearchSkills, toggledSkills]);

  const handleSeeSkillProfile = () => {
    navigate(`/skills/${selectedRole}`);
  };

  const handleTrackChange = (value: string) => {
    setTrackForRole(selectedRole, value as "Professional" | "Managerial");
  };

  const SkillBadgeList = ({ skills, title, count }: { skills: any[], title: string, count: number }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {count}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge 
            key={skill.title}
            variant="outline" 
            className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors"
          >
            {skill.title}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
          <Button 
            variant="outline" 
            className="bg-[#F7F9FF] text-[#1F2144] hover:bg-[#F7F9FF]/90 border border-[#CCDBFF]"
            onClick={handleSeeSkillProfile}
          >
            See Skill Profile
          </Button>
        </div>
        
        <RoleSelection 
          selectedRole={selectedRole}
          selectedLevel={roleLevel}
          currentTrack={currentTrack}
          onRoleChange={setSelectedRole}
          onLevelChange={setRoleLevel}
          onTrackChange={handleTrackChange}
          roles={roles}
        />

        <CategoryCards 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          roleId={selectedRole}
          selectedLevel={roleLevel}
        />

        <div className="space-y-4">
          {requiredSkills.length > 0 && (
            <SkillBadgeList 
              skills={requiredSkills} 
              title="Required Skills" 
              count={requiredSkills.length} 
            />
          )}

          {preferredSkills.length > 0 && (
            <SkillBadgeList 
              skills={preferredSkills} 
              title="Preferred Skills" 
              count={preferredSkills.length} 
            />
          )}

          {missingSkills.length > 0 && (
            <SkillBadgeList 
              skills={missingSkills} 
              title="Missing Skills" 
              count={missingSkills.length} 
            />
          )}
        </div>

        <Separator className="my-6" />

        <Card className="p-6 bg-white space-y-6">
          <CompetencyGraph 
            track={currentTrack as "Professional" | "Managerial"}
            roleId={selectedRole}
          />
        </Card>
      </div>
    </div>
  );
};