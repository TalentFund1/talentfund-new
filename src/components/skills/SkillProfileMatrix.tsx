import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SkillTypeFilters } from "./filters/SkillTypeFilters";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { SkillProfileMatrixPagination } from "./SkillProfileMatrixPagination";
import { useToggledSkills } from "./context/ToggledSkillsContext";

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("all");
  const { toggledSkills } = useToggledSkills();

  console.log('SkillProfileMatrix - Current state:', {
    sortBy,
    toggledSkillsCount: toggledSkills.size
  });

  return (
    <Card className="p-6 bg-white">
      <SkillTypeFilters
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <SkillProfileMatrixTable />
      <SkillProfileMatrixPagination />
    </Card>
  );
};