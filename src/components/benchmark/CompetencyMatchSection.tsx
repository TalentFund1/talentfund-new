import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useRoleStore } from "./RoleBenchmark";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { BenchmarkCalculator } from "./analysis/BenchmarkCalculator";

interface CompetencyMatchSectionProps {
  skills: ReadonlyArray<UnifiedSkill>;
  roleLevel: string;
  employeeId: string;
}

export const CompetencyMatchSection = ({ 
  skills, 
  roleLevel,
  employeeId 
}: CompetencyMatchSectionProps) => {
  const { getSkillState } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedRole } = useRoleStore();

  const calculator = new BenchmarkCalculator(getSkillCompetencyState);
  const { competencyMatchingSkills } = calculator.calculateMatchingSkills(
    Array.from(skills),
    Array.from(skills),
    roleLevel.toLowerCase(),
    selectedRole
  );

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Competency Match</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {competencyMatchingSkills.length}
        </span>
      </div>
      {competencyMatchingSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {competencyMatchingSkills.map((skill) => (
            <Badge 
              key={skill.title}
              variant="outline" 
              className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
            >
              {skill.title}
              <div className={`h-2 w-2 rounded-full bg-primary-accent`} />
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};