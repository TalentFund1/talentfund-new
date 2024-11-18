import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { BenchmarkMatrixFilters } from "./BenchmarkMatrixFilters";
import { SkillsMatrixTableHeader } from "./SkillsMatrixTableHeader";
import { SkillsMatrixTable } from "./SkillsMatrixTable";

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
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSkillLevel,
  setSelectedSkillLevel,
  selectedSearchSkills,
  setSelectedSearchSkills,
  visibleItems,
  observerTarget
}: BenchmarkSkillsMatrixContentProps) => {
  return (
    <div className="space-y-6">
      <BenchmarkMatrixFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSearchSkills={selectedSearchSkills}
        setSelectedSearchSkills={setSelectedSearchSkills}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        selectedSkillLevel={selectedSkillLevel}
        setSelectedSkillLevel={setSelectedSkillLevel}
      />

      <div className="rounded-md border">
        <SkillsMatrixTableHeader />
        <SkillsMatrixTable
          roleId={roleId}
          employeeId={employeeId}
          roleLevel={roleLevel}
          filteredSkills={filteredSkills}
          visibleItems={visibleItems}
          observerTarget={observerTarget}
        />
      </div>
    </div>
  );
};