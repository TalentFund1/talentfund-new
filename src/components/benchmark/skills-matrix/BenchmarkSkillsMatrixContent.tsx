import { useRef } from "react";
import { SkillsMatrixContent } from "./SkillsMatrixContent";
import { CategorizedSkills } from "../CategorizedSkills";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { Separator } from "@/components/ui/separator";
import { roleSkills } from "../../skills/data/roleSkills";

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
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
}

export const BenchmarkSkillsMatrixContent = ({
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  ...props
}: BenchmarkSkillsMatrixContentProps) => {
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  // Get all skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Filter skills based on toggled status
  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));

  console.log('BenchmarkSkillsMatrixContent - Skill counts:', {
    totalToggled: toggledSkills.size,
    filteredCount: filteredSkills.length,
    toggledRoleSkills: toggledRoleSkills.length,
    allRoleSkills: allRoleSkills.length
  });

  const getRoleTitle = (id: string) => {
    const roleTitles: { [key: string]: string } = {
      "123": "AI Engineer",
      "124": "Backend Engineer",
      "125": "Frontend Engineer",
      "126": "Engineering Manager"
    };
    return roleTitles[id] || "AI Engineer";
  };

  return (
    <>
      <CategorizedSkills 
        roleId={roleId}
        employeeId={employeeId}
        selectedLevel={roleLevel}
      />

      <Separator className="my-8" />

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {getRoleTitle(roleId)}: {roleLevel.toUpperCase()}
        </h2>
      </div>

      <SkillsMatrixContent 
        filteredSkills={filteredSkills}
        {...props}
      />
    </>
  );
};