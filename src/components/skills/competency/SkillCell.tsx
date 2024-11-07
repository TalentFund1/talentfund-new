import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, Heart } from "lucide-react";
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

  const getLevelStyles = (level: string) => {
    if (!level || level === '-') {
      return 'text-gray-300 text-sm font-medium h-[26px] flex items-center justify-center';
    }

    const baseStyles = 'rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144]';

    switch (level.toLowerCase()) {
      case 'advanced':
        return `${baseStyles} border-2 border-primary-accent bg-primary-accent/10`;
      case 'intermediate':
        return `${baseStyles} border-2 border-primary-icon bg-primary-icon/10`;
      case 'beginner':
        return `${baseStyles} border-2 border-[#008000] bg-[#008000]/10`;
      default:
        return `${baseStyles} border-2 border-gray-300 text-gray-400`;
    }
  };

  const getRequirementStyles = (requirement: string, level: string) => {
    const borderColor = level.toLowerCase() === 'advanced' 
      ? 'border-primary-accent'
      : level.toLowerCase() === 'intermediate'
        ? 'border-primary-icon'
        : level.toLowerCase() === 'beginner'
          ? 'border-[#008000]'
          : 'border-gray-300';

    if (!requirement || requirement === '-') {
      return 'invisible h-[22px]';
    }

    const baseStyles = 'text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5';
    
    switch (requirement.toLowerCase()) {
      case 'required':
        return `${baseStyles} bg-gray-100/90 border-x-2 border-b-2 rounded-b-md ${borderColor}`;
      case 'preferred':
        return `${baseStyles} bg-gray-50/90 border-x-2 border-b-2 rounded-b-md border-gray-300`;
      case 'unspecified':
        return `${baseStyles} bg-gray-50/50 border-x-2 border-b-2 rounded-b-md border-gray-200`;
      default:
        return `${baseStyles} bg-transparent`;
    }
  };

  const getRequirementIcon = (requirement: string) => {
    switch (requirement.toLowerCase()) {
      case 'required':
        return '✓';
      case 'preferred':
        return <Heart className="w-3 h-3" />;
      case 'unspecified':
        return '−';
      default:
        return '';
    }
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      {level !== "-" ? (
        <div className="flex flex-col items-center gap-0">
          <Select 
            value={level.toLowerCase()} 
            onValueChange={(value) => setLevel(value)}
          >
            <SelectTrigger 
              className={`${getLevelStyles(level)} border-2 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
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

          <Select 
            value={required.toLowerCase()} 
            onValueChange={(value) => setRequired(value)}
          >
            <SelectTrigger 
              className={`${getRequirementStyles(required, level)} focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
            >
              <SelectValue>
                <span className="flex items-center gap-2 justify-center">
                  {getRequirementIcon(required)}
                  {required}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="required">
                <span className="flex items-center gap-2">✓ Required</span>
              </SelectItem>
              <SelectItem value="preferred">
                <span className="flex items-center gap-2">
                  <Heart className="w-3 h-3" /> Preferred
                </span>
              </SelectItem>
              <SelectItem value="unspecified">
                <span className="flex items-center gap-2">− Unspecified</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <span className="text-muted-foreground/30">-</span>
      )}
    </TableCell>
  );
};