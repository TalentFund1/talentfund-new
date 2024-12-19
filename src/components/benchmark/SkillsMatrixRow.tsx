import { TableRow, TableCell } from "@/components/ui/table";
import { SkillCell } from "./SkillCell";
import { SkillRequirement } from "../skills/types/SkillTypes";

interface SkillsMatrixRowProps {
  skill: any;
  showCompanySkill: boolean;
  isRoleBenchmark: boolean;
  onSkillUpdate?: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
}

export const SkillsMatrixRow = ({ 
  skill,
  showCompanySkill,
  isRoleBenchmark,
  onSkillUpdate
}: SkillsMatrixRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {skill.title}
      </TableCell>
      <SkillCell 
        skillName={skill.title}
        details={{
          level: skill.level || "unspecified",
          required: skill.requirement || "unknown"
        }}
        isLastColumn={!showCompanySkill}
        levelKey="employee"
        onSkillUpdate={onSkillUpdate}
      />
      {showCompanySkill && (
        <SkillCell 
          skillName={skill.title}
          details={{
            level: skill.companyLevel || "unspecified",
            required: skill.companyRequirement || "unknown"
          }}
          isLastColumn={true}
          levelKey="company"
          onSkillUpdate={onSkillUpdate}
        />
      )}
    </TableRow>
  );
};