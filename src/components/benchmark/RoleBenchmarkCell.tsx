import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, Check, Heart } from "lucide-react";

interface RoleBenchmarkCellProps {
  level: string;
  requirement: string;
}

export const RoleBenchmarkCell = ({ level, requirement }: RoleBenchmarkCellProps) => {
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

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={`
          rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
          ${level === 'advanced' ? 'bg-primary-accent/10 border-2 border-primary-accent' : 
            level === 'intermediate' ? 'bg-primary-icon/10 border-2 border-primary-icon' : 
            level === 'beginner' ? 'bg-[#008000]/10 border-2 border-[#008000]' : 
            'bg-gray-100/50 border-2 border-gray-400'}
        `}>
          <span className="flex items-center gap-2">
            {getLevelIcon(level)}
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </div>

        <div className={`
          text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
          border-x-2 border-b-2 min-h-[32px] rounded-b-md
          ${level === 'advanced' ? 'border-primary-accent' : 
            level === 'intermediate' ? 'border-primary-icon' : 
            level === 'beginner' ? 'border-[#008000]' : 
            'border-gray-400'}
          bg-[#F9FAFB]
        `}>
          <span className="flex items-center gap-1.5">
            {requirement === 'required' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Skill Goal</span>
              </>
            ) : (
              <>
                <Heart className="w-3.5 h-3.5" />
                <span>Skill Goal</span>
              </>
            )}
          </span>
        </div>
      </div>
    </TableCell>
  );
};