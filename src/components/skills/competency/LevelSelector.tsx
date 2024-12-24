import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, CircleDashed } from "lucide-react";

interface LevelSelectorProps {
  currentLevel: string;
  onLevelChange: (value: string) => void;
}

export const LevelSelector = ({ currentLevel, onLevelChange }: LevelSelectorProps) => {
  const getLevelIcon = (level: string) => {
    switch (level?.toLowerCase()) {
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
    const baseStyles = "rounded-t-lg px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144]";
    
    switch (level?.toLowerCase()) {
      case 'advanced':
        return `${baseStyles} bg-primary-accent/10`;
      case 'intermediate':
        return `${baseStyles} bg-primary-icon/10`;
      case 'beginner':
        return `${baseStyles} bg-[#008000]/10`;
      default:
        return `${baseStyles} bg-gray-100/50`;
    }
  };

  return (
    <Select 
      value={currentLevel}
      onValueChange={onLevelChange}
    >
      <SelectTrigger 
        className={`${getLevelStyles(currentLevel)} focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 border-0`}
      >
        <SelectValue>
          <span className="flex items-center gap-2 justify-center">
            {getLevelIcon(currentLevel)}
            {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unspecified">
          <span className="flex items-center gap-2">
            <CircleDashed className="w-3.5 h-3.5 text-gray-400" />
            Unspecified
          </span>
        </SelectItem>
        <SelectItem value="beginner">
          <span className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-[#008000]" />
            Beginner
          </span>
        </SelectItem>
        <SelectItem value="intermediate">
          <span className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-primary-icon" />
            Intermediate
          </span>
        </SelectItem>
        <SelectItem value="advanced">
          <span className="flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-primary-accent" />
            Advanced
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};