import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, CircleDashed } from "lucide-react";
import { getLevelIcon, getLevelStyles } from "./utils/skillCellStyles";

interface LevelSelectorProps {
  currentLevel: string;
  onLevelChange: (value: string) => void;
}

export const LevelSelector = ({ currentLevel, onLevelChange }: LevelSelectorProps) => {
  const handleChange = (value: string) => {
    console.log('Level selector change:', { currentLevel, newLevel: value });
    onLevelChange(value);
  };

  return (
    <Select 
      value={currentLevel}
      onValueChange={handleChange}
    >
      <SelectTrigger 
        className={`${getLevelStyles(currentLevel)} border-2 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
      >
        <SelectValue>
          <span className="flex items-center gap-2 justify-center text-[15px]">
            {getLevelIcon(currentLevel)}
            {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
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
  );
};