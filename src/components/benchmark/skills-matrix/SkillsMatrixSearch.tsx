import { SearchFilter } from "@/components/market/SearchFilter";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { roleSkills } from "../../skills/data/roleSkills";

interface SkillsMatrixSearchProps {
  selectedRole: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
}

export const SkillsMatrixSearch = ({
  selectedRole,
  searchTerm,
  setSearchTerm,
  selectedSearchSkills,
  setSelectedSearchSkills
}: SkillsMatrixSearchProps) => {
  const { toggledSkills } = useToggledSkills();
  
  // Get all skills for the selected role
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ]
  .filter(skill => toggledSkills.has(skill.title))
  .map(skill => skill.title);

  console.log('Available role skills:', allRoleSkills);
  console.log('Currently toggled skills:', Array.from(toggledSkills));

  return (
    <div className="space-y-4">
      <SearchFilter
        label=""
        placeholder="Search skills..."
        items={allRoleSkills}
        selectedItems={selectedSearchSkills}
        onItemsChange={setSelectedSearchSkills}
      />
    </div>
  );
};