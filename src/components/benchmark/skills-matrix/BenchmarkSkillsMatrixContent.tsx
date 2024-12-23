import React, { useState } from 'react';
import { CategorizedSkills } from "../CategorizedSkills";
import { Separator } from "@/components/ui/separator";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { roleSkills } from "../../skills/data/roleSkills";
import { SkillsMatrixContent } from "./SkillsMatrixContent";
import { useRoleStore } from "@/components/benchmark/RoleBenchmark";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";

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
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
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
  ...props
}: BenchmarkSkillsMatrixContentProps) => {
  const { toggledSkills } = useToggledSkills();
  const { selectedLevel } = useRoleStore();
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  console.log('BenchmarkSkillsMatrixContent - Current state:', {
    roleId,
    selectedLevel,
    selectedCategory,
    filteredSkillsCount: filteredSkills.length,
    toggledSkillsCount: toggledSkills.size
  });

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