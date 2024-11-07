import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getLevelStyles, getRequirementStyles, getRequirementIcon } from "./RequirementUtils";
import { Star, Shield, Target } from "lucide-react";
import { useState } from "react";

interface SkillCellProps {
  details: {
    level: string;
    required: string;
  };
  isLastColumn: boolean;
}

export const SkillCell = ({ details, isLastColumn }: SkillCellProps) => {
  const [level, setLevel] = useState(details.level);
  const [required, setRequired] = useState(details.required);

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return <Star className="w-4 h-4 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-4 h-4 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-4 h-4 text-[#008000]" />;
      default:
        return null;
    }
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      {level !== "-" ? (
        <div className="flex flex-col items-center gap-0">
          <Select value={level.toLowerCase()} onValueChange={(value) => setLevel(value)}>
            <SelectTrigger 
              className={`${getLevelStyles(level)} min-w-[120px] border-2 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
            >
              <SelectValue>
                <span className="flex items-center gap-2 justify-center text-[15px]">
                  {getLevelIcon(level)}
                  {level}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#008000]" />
                  Beginner
                </span>
              </SelectItem>
              <SelectItem value="intermediate">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary-icon" />
                  Intermediate
                </span>
              </SelectItem>
              <SelectItem value="advanced">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary-accent" />
                  Advanced
                </span>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={required.toLowerCase()} onValueChange={(value) => setRequired(value)}>
            <SelectTrigger 
              className={`${getRequirementStyles(required, level)} min-w-[120px] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
            >
              <SelectValue>
                <span className="flex items-center gap-2 justify-center">
                  {getRequirementIcon(required)}
                  {required}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="required">✓ Required</SelectItem>
              <SelectItem value="preferred">○ Preferred</SelectItem>
              <SelectItem value="unspecified">− Unspecified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <span className="text-muted-foreground/30">-</span>
      )}
    </TableCell>
  );
};