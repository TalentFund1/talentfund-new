import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, CircleDashed } from "lucide-react";
import { useState } from "react";

interface SkillLevelCellProps {
  initialLevel: string;
}

export const SkillLevelCell = ({ initialLevel }: SkillLevelCellProps) => {
  const [level, setLevel] = useState(initialLevel.toLowerCase());
  const [required, setRequired] = useState<string>("required");

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return <Star className="w-3.5 h-3.5 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-3.5 h-3.5 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-3.5 h-3.5 text-[#008000]" />;
      default:
        return <CircleDashed className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getLevelStyles = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return "border border-primary-accent bg-primary-accent/10";
      case 'intermediate':
        return "border border-primary-icon bg-primary-icon/10";
      case 'beginner':
        return "border border-[#008000] bg-[#008000]/10";
      default:
        return "border border-gray-400 bg-gray-100/50";
    }
  };

  const getRequirementStyles = (requirement: string) => {
    const baseStyles = "text-xs px-1.5 py-0.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1 border-x border-b rounded-b-md";
    
    switch (requirement) {
      case 'required':
        return `${baseStyles} bg-gray-100/90 ${getLevelBorderColor(level)}`;
      case 'preferred':
        return `${baseStyles} bg-gray-50/90 border-gray-300`;
      default:
        return `${baseStyles} bg-white border-gray-50 text-gray-400`;
    }
  };

  const getLevelBorderColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'border-primary-accent';
      case 'intermediate':
        return 'border-primary-icon';
      case 'beginner':
        return 'border-[#008000]';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger 
            className={`rounded-t-md px-2 py-1 text-xs font-medium w-full capitalize flex items-center justify-center min-h-[22px] text-[#1f2144] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 ${getLevelStyles(level)}`}
          >
            <SelectValue>
              <span className="flex items-center gap-1.5 justify-center">
                {getLevelIcon(level)}
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unspecified">
              <span className="flex items-center gap-1.5">
                <CircleDashed className="w-3.5 h-3.5 text-gray-400" />
                Unspecified
              </span>
            </SelectItem>
            <SelectItem value="beginner">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#008000]" />
                Beginner
              </span>
            </SelectItem>
            <SelectItem value="intermediate">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary-icon" />
                Intermediate
              </span>
            </SelectItem>
            <SelectItem value="advanced">
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-primary-accent" />
                Advanced
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={required} onValueChange={setRequired}>
          <SelectTrigger className={getRequirementStyles(required)}>
            <SelectValue>
              <span className="flex items-center gap-1.5 justify-center text-xs">
                {required === 'required' ? '✓' : '♡'}
                {required.charAt(0).toUpperCase() + required.slice(1)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">
              <span className="flex items-center gap-1.5">✓ Required</span>
            </SelectItem>
            <SelectItem value="preferred">
              <span className="flex items-center gap-1.5">♡ Preferred</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </TableCell>
  );
};