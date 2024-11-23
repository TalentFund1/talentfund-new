import { useRef } from "react";
import { SkillsMatrixContent } from "./SkillsMatrixContent";
import { CategorizedSkills } from "../CategorizedSkills";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
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

export const BenchmarkSkillsMatrixContent = ({
  roleId,
  employeeId,
  roleLevel,
  filteredSkills,
  ...props
}: BenchmarkSkillsMatrixContentProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();

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
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-foreground">
            {getRoleTitle(roleId)}: {roleLevel.toUpperCase()}
          </h2>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            ({filteredSkills.length})
          </span>
        </div>
      </div>

      <SkillsMatrixContent 
        filteredSkills={filteredSkills}
        {...props}
      />
    </>
  );
};