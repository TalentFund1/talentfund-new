interface ProgressBarProps {
  percentage: number;
  matchCount: number;
  total: number;
  label: string;
}

export const ProgressBar = ({ percentage, matchCount, total, label }: ProgressBarProps) => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-sm text-foreground">
            {matchCount} out of {total}
          </span>
        </div>
        <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#1F2144] rounded-full" 
            style={{ width: `${percentage}%` }} 
          />
        </div>
      </div>
    </div>
  );
};