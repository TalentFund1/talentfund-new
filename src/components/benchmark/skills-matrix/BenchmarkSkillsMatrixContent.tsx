import React from 'react';
import { CategorizedSkills } from "../CategorizedSkills";
import { Separator } from "@/components/ui/separator";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { roleSkills } from "../../skills/data/roleSkills";
import { SkillsMatrixContent } from "./SkillsMatrixContent";
import { useRoleStore } from "@/components/benchmark/RoleBenchmark";

interface BenchmarkSkillsMatrixContentProps {
  roleId: string;
  employeeId: string;
  roleLevel: string;
  filteredSkills: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedSkillLevel: string;
  setSelectedSkillLevel: (level: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedWeight: string;
  setSelectedWeight: (weight: string) => void;
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
}

export const BenchmarkSkillsMatrixContent = ({
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  selectedCategory,
  setSelectedCategory,
  selectedWeight,
  setSelectedWeight,
  ...props
}: BenchmarkSkillsMatrixContentProps) => {
  const { toggledSkills } = useToggledSkills();
  const { selectedLevel } = useRoleStore();
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  // Get all toggled skills as an array and filter by category
  const getToggledSkillsCount = (category: string) => {
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    return allSkills.filter(skill => {
      if (!toggledSkills.has(skill.title)) return false;

      switch (category) {
        case 'specialized':
          return currentRoleSkills.specialized.some(s => s.title === skill.title);
        case 'common':
          return currentRoleSkills.common.some(s => s.title === skill.title);
        case 'certification':
          return currentRoleSkills.certifications.some(s => s.title === skill.title);
        default:
          return true;
      }
    }).length;
  };

  const skillCounts = {
    all: getToggledSkillsCount('all'),
    specialized: getToggledSkillsCount('specialized'),
    common: getToggledSkillsCount('common'),
    certification: getToggledSkillsCount('certification')
  };

  console.log('BenchmarkSkillsMatrixContent - Skill counts:', skillCounts);

  return (
    <>
      <CategorizedSkills 
        roleId={roleId}
        employeeId={employeeId}
      />

      <Separator className="my-8" />

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {getRoleTitle(roleId)}: {selectedLevel.toUpperCase()}
        </h2>
      </div>

      <SkillsMatrixContent 
        filteredSkills={filteredSkills}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedWeight={selectedWeight}
        setSelectedWeight={setSelectedWeight}
        {...props}
        isRoleBenchmark={true}
      />
    </>
  );
};

const getRoleTitle = (id: string) => {
  const roleTitles: { [key: string]: string } = {
    "123": "AI Engineer",
    "124": "Backend Engineer",
    "125": "Frontend Engineer",
    "126": "Engineering Manager"
  };
  return roleTitles[id] || "AI Engineer";
};