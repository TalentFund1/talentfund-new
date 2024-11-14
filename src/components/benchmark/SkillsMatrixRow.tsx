import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsMatrixRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
  };
  setHasChanges?: (value: boolean) => void;
}

export const SkillsMatrixRow = ({ skill, setHasChanges }: SkillsMatrixRowProps) => {
  const handleLevelChange = (value: string) => {
    if (setHasChanges) {
      setHasChanges(true);
    }
  };

  const handleRequirementChange = (value: string) => {
    if (setHasChanges) {
      setHasChanges(true);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{skill.title}</TableCell>
      <TableCell>{skill.subcategory}</TableCell>
      <TableCell>
        <Select defaultValue={skill.level} onValueChange={handleLevelChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="unspecified">Unspecified</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select defaultValue="required" onValueChange={handleRequirementChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">Skill Goal</SelectItem>
            <SelectItem value="not-interested">Not Interested</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Badge variant={skill.confidence === "high" ? "default" : "secondary"}>
          {skill.confidence}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ↗ {skill.growth}
        </span>
      </TableCell>
    </TableRow>
  );
};