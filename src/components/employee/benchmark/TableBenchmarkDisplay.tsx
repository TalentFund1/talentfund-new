import { Badge } from "@/components/ui/badge";

interface TableBenchmarkDisplayProps {
  skillMatch: { current: number; total: number };
  competencyMatch: { current: number; total: number };
  skillGoals: { current: number; total: number };
  averagePercentage: number;
}

export const TableBenchmarkDisplay = ({
  skillMatch,
  competencyMatch,
  skillGoals,
  averagePercentage
}: TableBenchmarkDisplayProps) => {
  const getBenchmarkColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="flex flex-col gap-1 min-w-[120px]">
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Skills:</span>
        <span>{skillMatch.current}/{skillMatch.total}</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Competency:</span>
        <span>{competencyMatch.current}/{competencyMatch.total}</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Goals:</span>
        <span>{skillGoals.current}/{skillGoals.total}</span>
      </div>
      <Badge className={`mt-1 ${getBenchmarkColor(averagePercentage)}`}>
        {averagePercentage}%
      </Badge>
    </div>
  );
};