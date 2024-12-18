import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useState } from "react";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { UnifiedSkill } from "./types/SkillTypes";
import { roleSkills } from "./data/roleSkills";
import { useParams } from "react-router-dom";

export const SkillProfileMatrix = () => {
  const [sortField, setSortField] = useState<'growth' | 'salary' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const { toggledSkills, toggleSkill } = useToggledSkills();
  const { id } = useParams();

  console.log('SkillProfileMatrix rendering with toggledSkills:', toggledSkills);

  // Get skills for the current role
  const currentRole = roleSkills[id as keyof typeof roleSkills];
  const allSkills = currentRole ? [
    ...currentRole.specialized.map(skill => ({ ...skill, type: 'specialized' })),
    ...currentRole.common.map(skill => ({ ...skill, type: 'common' })),
    ...currentRole.certifications.map(skill => ({ ...skill, type: 'certification' }))
  ] : [];

  const handleSort = (field: 'growth' | 'salary' | null) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortSkills = (skills: UnifiedSkill[]) => {
    if (!sortField || !sortDirection) return skills;

    return [...skills].sort((a, b) => {
      if (sortField === 'growth') {
        const aGrowth = parseFloat(a.growth.replace('%', ''));
        const bGrowth = parseFloat(b.growth.replace('%', ''));
        return sortDirection === 'asc' ? aGrowth - bGrowth : bGrowth - aGrowth;
      }
      if (sortField === 'salary') {
        const aSalary = parseInt(a.salary.replace(/[^0-9]/g, ''));
        const bSalary = parseInt(b.salary.replace(/[^0-9]/g, ''));
        return sortDirection === 'asc' ? aSalary - bSalary : bSalary - aSalary;
      }
      return 0;
    });
  };

  const sortedSkills = sortSkills(allSkills);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">Skill Mapping</h2>
        <Button className="bg-[#1F2144] hover:bg-[#1F2144]/90">
          <div className="w-5 h-5 rounded-full border-[1.75px] border-white flex items-center justify-center">
            <Plus className="h-3 w-3 stroke-[2]" />
          </div>
          <span className="ml-2 text-sm font-medium">Add Skill</span>
        </Button>
      </div>

      <SkillProfileMatrixTable
        paginatedSkills={sortedSkills}
        toggledSkills={toggledSkills}
        onToggleSkill={toggleSkill}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
};