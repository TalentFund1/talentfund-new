import { Heart } from "lucide-react";

export const getGoalStatusStyles = (goalStatus: string, level: string) => {
  const borderColor = level.toLowerCase() === 'advanced' 
    ? 'border-primary-accent'
    : level.toLowerCase() === 'intermediate'
      ? 'border-primary-icon'
      : level.toLowerCase() === 'beginner'
        ? 'border-[#008000]'
        : 'border-gray-300';

  if (!goalStatus || goalStatus === '-') {
    return 'invisible h-[22px]';
  }

  const baseStyles = 'text-xs px-2 py-1.5 font-medium w-full flex items-center justify-center gap-1.5';
  
  switch (goalStatus.toLowerCase()) {
    case 'skill_goal':
      return `${baseStyles} bg-gray-100/90 border-x-2 border-b-2 rounded-b-md ${borderColor} text-[#1f2144]`;
    case 'not_interested':
      return `${baseStyles} bg-gray-50/90 border-x-2 border-b-2 rounded-b-md border-gray-300 text-[#1f2144]`;
    case 'unknown':
      return `${baseStyles} bg-white border-[0.5px] rounded-b-md border-gray-50 text-gray-400`;
    default:
      return `${baseStyles} bg-transparent`;
  }
};

export const getGoalStatusIcon = (goalStatus: string) => {
  switch (goalStatus.toLowerCase()) {
    case 'skill_goal':
      return '✓';
    case 'not_interested':
      return <Heart className="w-3 h-3" />;
    case 'unknown':
      return '−';
    default:
      return '';
  }
};