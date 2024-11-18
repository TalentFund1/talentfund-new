interface BenchmarkProgressBarProps {
  label: string;
  current: number;
  total: number;
}

export const BenchmarkProgressBar = ({ label, current, total }: BenchmarkProgressBarProps) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-foreground">
          {current} out of {total}
        </span>
      </div>
      <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#1F2144] rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
};