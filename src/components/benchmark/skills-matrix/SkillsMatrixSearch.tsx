import { SearchFilter } from "@/components/market/SearchFilter";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { roleSkills } from "../../skills/data/roleSkills";
import { useEffect } from "react";
import { useRoleStore } from "../RoleBenchmark";

interface SkillsMatrixSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
}

export const SkillsMatrixSearch = ({
  searchTerm,
  setSearchTerm,
  selectedSearchSkills,
  setSelectedSearchSkills,
}: SkillsMatrixSearchProps) => {
  const { toggledSkills } = useToggledSkills();
  const { selectedRole } = useRoleStore();

  // Get all skills for the selected role
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].map(skill => skill.title);

  // Filter to only get toggled skills for the current role
  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill));

  // Auto-populate search skills when role changes or toggled skills change
  useEffect(() => {
    console.log("Role or toggled skills changed. Available skills:", toggledRoleSkills);
    setSelectedSearchSkills(toggledRoleSkills);
  }, [selectedRole, toggledSkills, setSelectedSearchSkills]);

  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(selectedSearchSkills.filter(s => s !== skill));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedSearchSkills([]);
  };

  return (
    <div className="space-y-4">
      <SearchFilter
        label=""
        placeholder="Search skills..."
        items={toggledRoleSkills}
        selectedItems={selectedSearchSkills}
        onItemsChange={setSelectedSearchSkills}
      />
      {selectedSearchSkills.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={clearSearch}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};