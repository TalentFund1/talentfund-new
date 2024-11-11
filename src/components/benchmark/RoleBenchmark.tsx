import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";
import { RoleBenchmarkHeader } from "./components/RoleBenchmarkHeader";
import { SkillSection } from "./components/SkillSection";

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const RoleBenchmark = () => {
  const [selectedRole, setSelectedRole] = useState<string>("125");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();

  const track = getTrackForRole(selectedRole);
  
  const getLevels = () => {
    return track === "Professional" 
      ? ["P1", "P2", "P3", "P4", "P5", "P6"]
      : ["M3", "M4", "M5", "M6"];
  };

  useEffect(() => {
    const levels = getLevels();
    setSelectedLevel(levels[0]);
  }, [track]);

  const getLevelStyles = (level: string) => {
    return "border-[#CCDBFF]";
  };

  const getLevelDot = (level: string) => {
    switch (level) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  const selectedRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  const filteredSpecializedSkills = selectedRoleSkills.specialized.filter(
    skill => toggledSkills.has(skill.title)
  );

  const filteredCommonSkills = selectedRoleSkills.common.filter(
    skill => toggledSkills.has(skill.title)
  );

  const filteredCertifications = selectedRoleSkills.certifications.filter(
    cert => toggledSkills.has(cert.title)
  );

  return (
    <div className="space-y-6">
      <RoleBenchmarkHeader 
        selectedRole={selectedRole}
        selectedLevel={selectedLevel}
        roles={roles}
        levels={getLevels()}
        onRoleChange={setSelectedRole}
        onLevelChange={setSelectedLevel}
      />

      <Separator className="my-6" />

      {selectedRoleSkills && (
        <div className="space-y-6">
          <SkillSection 
            title="Specialized Skills"
            skills={filteredSpecializedSkills}
            getLevelStyles={getLevelStyles}
            getLevelDot={getLevelDot}
          />

          <SkillSection 
            title="Common Skills"
            skills={filteredCommonSkills}
            getLevelStyles={getLevelStyles}
            getLevelDot={getLevelDot}
          />

          <SkillSection 
            title="Certifications"
            skills={filteredCertifications}
            getLevelStyles={getLevelStyles}
            getLevelDot={getLevelDot}
          />
        </div>
      )}
    </div>
  );
};