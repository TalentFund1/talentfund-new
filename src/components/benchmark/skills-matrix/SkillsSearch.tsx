import { useEffect } from "react";
import { SearchFilter } from '@/components/market/SearchFilter';
import { roleSkills } from "../../skills/data/roleSkills";
import { useRoleStore } from "../RoleBenchmark";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";

interface SkillsSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
}

export const SkillsSearch = ({
  searchTerm,
  setSearchTerm,
  selectedSearchSkills,
  setSelectedSearchSkills,
}: SkillsSearchProps) => {
  const { selectedRole } = useRoleStore();
  const { setToggledSkills } = useToggledSkills();

  // Get all skills for the selected role
  const getAllRoleSkills = () => {
    const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
    
    const allSkills = [
      ...(currentRoleSkills.specialized || []),
      ...(currentRoleSkills.common || []),
      ...(currentRoleSkills.certifications || [])
    ].map(skill => skill.title);

    return allSkills;
  };

  // Auto-populate skills when role changes
  useEffect(() => {
    const roleSkills = getAllRoleSkills();
    setSelectedSearchSkills(roleSkills);
    
    // Update toggled skills to match selected role skills
    const newToggledSkills = new Set(roleSkills);
    setToggledSkills(newToggledSkills);
  }, [selectedRole, setSelectedSearchSkills, setToggledSkills]);

  return (
    <div className="relative">
      <SearchFilter
        label=""
        placeholder="Search skills..."
        items={getAllRoleSkills()}
        selectedItems={selectedSearchSkills}
        onItemsChange={setSelectedSearchSkills}
        singleSelect={false}
      />
    </div>
  );
};