import { TableCell, TableRow } from "@/components/ui/table";
import { COLUMN_WIDTHS } from "./constants";

interface SkillDetails {
  level: string;
  required: string;
}

interface CompetencySkillRowProps {
  skillName: string;
  levels: string[];
  getSkillDetails: (skillName: string, level: string) => SkillDetails;
}

export const CompetencySkillRow = ({ skillName, levels, getSkillDetails }: CompetencySkillRowProps) => {
  return (
    <TableRow className="hover:bg-background/30 transition-colors">
      <TableCell className={`font-medium border-r border-border ${COLUMN_WIDTHS.skill}`}>
        {skillName}
      </TableCell>
      {levels.map((level, index) => {
        const details = getSkillDetails(skillName, level);
        return (
          <TableCell 
            key={`${skillName}-${level}`}
            className={`text-center p-3 align-middle ${!index !== levels.length - 1 ? 'border-r' : ''} border-border ${COLUMN_WIDTHS.level}`}
          >
            {details.level !== "-" ? (
              <div className="flex flex-col items-center gap-0.5">
                <div className={`${getLevelStyles(details.level)} min-w-[100px]`}>
                  {details.level}
                </div>
                <div className={`${getRequirementStyles(details.required, details.level)} min-w-[100px]`}>
                  {getRequirementIcon(details.required)}
                  <span>{details.required}</span>
                </div>
              </div>
            ) : (
              <span className="text-muted-foreground/30">-</span>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const getLevelStyles = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner':
      return 'bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm';
    case 'intermediate':
      return 'bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full text-sm';
    case 'advanced':
      return 'bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full text-sm';
    default:
      return '';
  }
};

const getRequirementStyles = (required: string, level: string) => {
  return `flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-sm ${
    required === 'preferred' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
  }`;
};

const getRequirementIcon = (required: string) => {
  switch (required.toLowerCase()) {
    case 'required':
      return '✓';
    case 'preferred':
      return '♡';
    default:
      return '';
  }
};