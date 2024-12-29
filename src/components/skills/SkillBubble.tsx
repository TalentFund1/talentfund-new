interface SkillBubbleProps {
  skillName: string;
  level: string;
  isSkillGoal?: boolean;
}

export const SkillBubble = ({ skillName, level, isSkillGoal = false }: SkillBubbleProps) => {
  const getLevelColor = () => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'bg-primary-accent/10 text-primary-accent border-primary-accent';
      case 'intermediate':
        return 'bg-primary-icon/10 text-primary-icon border-primary-icon';
      case 'beginner':
        return 'bg-[#008000]/10 text-[#008000] border-[#008000]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className={`
      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm 
      border transition-colors ${getLevelColor()}
      ${isSkillGoal ? 'ring-2 ring-primary ring-offset-2' : ''}
    `}>
      {skillName}
      {isSkillGoal && (
        <span className="inline-flex items-center justify-center w-4 h-4 bg-primary text-white rounded-full text-xs font-medium">
          ✓
        </span>
      )}
    </div>
  );
};