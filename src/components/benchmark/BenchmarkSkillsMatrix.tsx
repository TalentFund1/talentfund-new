import { useRef } from "react";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";
import { CategorizedSkills } from "./CategorizedSkills";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { Separator } from "@/components/ui/separator";

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

export const BenchmarkSkillsMatrix = ({
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  ...props
}: BenchmarkSkillsMatrixContentProps) => {
  console.log('Rendering BenchmarkSkillsMatrix with skills:', filteredSkills);

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
    <ToggledSkillsProvider>
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
    </ToggledSkillsProvider>
  );
};