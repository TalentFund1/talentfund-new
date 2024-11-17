import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillLevelFilterProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export const SkillLevelFilter = ({ selectedLevel, onLevelChange }: SkillLevelFilterProps) => {
  return (
    <Select value={selectedLevel} onValueChange={onLevelChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Filter by Level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Levels</SelectItem>
        <SelectItem value="advanced">Advanced</SelectItem>
        <SelectItem value="intermediate">Intermediate</SelectItem>
        <SelectItem value="beginner">Beginner</SelectItem>
        <SelectItem value="unspecified">Unspecified</SelectItem>
      </SelectContent>
    </Select>
  );
};