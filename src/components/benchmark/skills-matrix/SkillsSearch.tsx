import { SearchFilter } from "@/components/market/SearchFilter";
import { useEffect } from "react";
import { filterSkillsByCategory } from "../skills-matrix/skillCategories";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";

interface SkillsSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  employeeId: string;
}

export const SkillsSearch = ({
  searchTerm,
  setSearchTerm,
  selectedSearchSkills,
  setSelectedSearchSkills,
  employeeId,
}: SkillsSearchProps) => {
  const { toggledSkills } = useToggledSkills();
  const employeeSkills = getEmployeeSkills(employeeId);

  // Get all skills from all categories
  const allSkills = [
    ...filterSkillsByCategory(employeeSkills, "specialized"),
    ...filterSkillsByCategory(employeeSkills, "common"),
    ...filterSkillsByCategory(employeeSkills, "certification"),
  ]
    .filter(skill => toggledSkills.has(skill.title))
    .map(skill => skill.title);

  // Auto-populate search with all toggled skills
  useEffect(() => {
    console.log("Auto-populating skills:", allSkills);
    setSelectedSearchSkills(allSkills);
  }, [toggledSkills, employeeId]);

  return (
    <SearchFilter
      label=""
      placeholder="Search skills..."
      items={allSkills}
      selectedItems={selectedSearchSkills}
      onItemsChange={setSelectedSearchSkills}
    />
  );
};