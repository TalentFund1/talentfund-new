import { SearchFilter } from "@/components/market/SearchFilter";
import { useRoleStore } from "../RoleBenchmark";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { useEffect } from "react";

interface SkillsMatrixSearchProps {
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
}

export const SkillsMatrixSearch = ({
  selectedSearchSkills,
  setSelectedSearchSkills
}: SkillsMatrixSearchProps) => {
  const { selectedRole } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  // Get all skills for the selected role that are toggled
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ]
  .map(skill => skill.title)
  .filter(skillTitle => toggledSkills.has(skillTitle));

  // Update search skills when role changes
  useEffect(() => {
    console.log("Role changed, updating search skills:", selectedRole);
    setSelectedSearchSkills(allRoleSkills);
  }, [selectedRole, toggledSkills]);

  return (
    <SearchFilter
      label=""
      placeholder="Search skills..."
      items={allRoleSkills}
      selectedItems={selectedSearchSkills}
      onItemsChange={setSelectedSearchSkills}
    />
  );
};