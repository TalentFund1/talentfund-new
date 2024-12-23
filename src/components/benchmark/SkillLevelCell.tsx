import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Shield, Target, CircleDashed } from "lucide-react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useParams } from "react-router-dom";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string) => void;
  isRoleBenchmark?: boolean;
}

export const SkillLevelCell = ({ 
  initialLevel, 
  skillTitle,
  onLevelChange,
  isRoleBenchmark = false
}: SkillLevelCellProps) => {
  const { id: profileId } = useParams<{ id: string }>();
  const { currentStates, setSkillState, initializeState } = useSkillsMatrixStore();

  // Initialize the state when the component mounts
  if (profileId) {
    initializeState(profileId, skillTitle, initialLevel?.toLowerCase() || 'unspecified');
  }

  const currentState = profileId && currentStates[profileId]?.[skillTitle];

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

  const getBorderColorClass = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'advanced':
        return 'border-primary-accent bg-primary-accent/10';
      case 'intermediate':
        return 'border-primary-icon bg-primary-icon/10';
      case 'beginner':
        return 'border-[#008000] bg-[#008000]/10';
      default:
        return 'border-gray-400 bg-gray-100/50';
    }
  };

  if (!profileId || !currentState) return null;

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select 
          value={currentState.level} 
          onValueChange={(value) => {
            if (profileId) {
              setSkillState(profileId, skillTitle, value);
              onLevelChange?.(value);
            }
          }}
        >
          <SelectTrigger className={`
            rounded-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
            border-2 ${getBorderColorClass(currentState.level)}
          `}>
            <SelectValue>
              <span className="flex items-center gap-2">
                {getLevelIcon(currentState.level)}
                {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
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
      </div>
    </TableCell>
  );
};