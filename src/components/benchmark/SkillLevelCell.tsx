import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, Heart, CircleDashed } from "lucide-react";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, requirement: string) => void;
  isReadOnly?: boolean;
}

export const SkillLevelCell = ({ initialLevel, skillTitle, onLevelChange, isReadOnly = false }: SkillLevelCellProps) => {
  const getLevelStyles = (level: string) => {
    const baseStyles = "rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[28px] text-[#1f2144]";
    
    switch (level.toLowerCase()) {
      case "advanced":
        return `${baseStyles} border-2 border-primary-accent bg-primary-accent/10`;
      case "intermediate":
        return `${baseStyles} border-2 border-primary-icon bg-primary-icon/10`;
      case "beginner":
        return `${baseStyles} border-2 border-[#008000] bg-[#008000]/10`;
      default:
        return `${baseStyles} border-2 border-gray-400 bg-gray-100/50`;
    }
  };

  const getRequirementStyles = (level: string) => {
    const borderColor = level.toLowerCase() === "advanced" 
      ? "border-primary-accent"
      : level.toLowerCase() === "intermediate"
        ? "border-primary-icon"
        : level.toLowerCase() === "beginner"
          ? "border-[#008000]"
          : "border-gray-300";

    return `text-xs px-2 py-1 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 rounded-b-md bg-gray-100/90 ${borderColor}`;
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "advanced":
        return <Star className="w-4 h-4 text-primary-accent" />;
      case "intermediate":
        return <Shield className="w-4 h-4 text-primary-icon" />;
      case "beginner":
        return <Target className="w-4 h-4 text-[#008000]" />;
      default:
        return <CircleDashed className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isReadOnly) {
    return (
      <TableCell className="border-r border-blue-200 p-0">
        <div className="flex flex-col items-center">
          <div className={getLevelStyles(initialLevel)}>
            <span className="flex items-center gap-2 justify-center text-[15px]">
              {getLevelIcon(initialLevel)}
              {initialLevel.charAt(0).toUpperCase() + initialLevel.slice(1)}
            </span>
          </div>
          <div className={getRequirementStyles(initialLevel)}>
            <Heart className="w-3.5 h-3.5" />
            <span>Skill Goal</span>
          </div>
        </div>
      </TableCell>
    );
  }

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select value={initialLevel} onValueChange={handleLevelChange}>
          <SelectTrigger 
            className={`${getLevelStyles(initialLevel)} border-2 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
          >
            <SelectValue>
              <span className="flex items-center gap-2 justify-center text-[15px]">
                {getLevelIcon(initialLevel)}
                {initialLevel.charAt(0).toUpperCase() + initialLevel.slice(1)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unspecified">
              <span className="flex items-center gap-2">
                <CircleDashed className="w-4 h-4 text-gray-400" />
                Unspecified
              </span>
            </SelectItem>
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

        <Select value={required} onValueChange={handleRequirementChange}>
          <SelectTrigger 
            className={`${getRequirementStyles(required, level)} focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
          >
            <SelectValue>
              <span className="flex items-center gap-2 justify-center">
                {required === 'required' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Required</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3.5 h-3.5" />
                    <span>Preferred</span>
                  </>
                )}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">
              <span className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" /> Required
              </span>
            </SelectItem>
            <SelectItem value="preferred">
              <span className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5" /> Preferred
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </TableCell>
  );
};
