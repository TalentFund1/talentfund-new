import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronUp, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillProfileMatrixHeaderProps {
  sortField: 'growth' | 'salary' | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (field: 'growth' | 'salary' | null) => void;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixTableHeader = ({
  sortField,
  sortDirection,
  onSort,
  isRoleBenchmark = false
}: SkillProfileMatrixHeaderProps) => {
  const renderSortArrow = (field: 'growth' | 'salary') => {
    if (sortField !== field) {
      return <ChevronUp className="h-4 w-4 text-muted-foreground opacity-50" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-primary" />
    ) : (
      <ChevronUp className="h-4 w-4 text-primary rotate-180 transform" />
    );
  };

  return (
    <TableHeader>
      <TableRow className="bg-background text-left">
        <TableHead className="py-4 px-4 text-sm font-medium text-muted-foreground w-[35%]">Skill Title</TableHead>
        <TableHead className="py-4 px-4 text-sm font-medium text-muted-foreground w-[25%]">Subcategory</TableHead>
        <TableHead className="py-4 px-4 text-sm font-medium text-muted-foreground w-[20%]">
          <Button
            variant="ghost"
            className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
            onClick={() => onSort('growth')}
          >
            Projected Growth
            {renderSortArrow('growth')}
          </Button>
        </TableHead>
        <TableHead className="py-4 px-2 text-sm font-medium text-muted-foreground w-[20%]">
          <Button
            variant="ghost"
            className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
            onClick={() => onSort('salary')}
          >
            Skill Pricer
            {renderSortArrow('salary')}
          </Button>
        </TableHead>
        {isRoleBenchmark && (
          <TableHead className="py-4 px-4 text-sm font-medium text-muted-foreground w-[15%]">
            <div className="flex items-center justify-center gap-1">
              Skill Growth
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-left">Skill Growth:</h4>
                      <p className="text-sm text-left font-normal">
                        Add this skill to your development plan
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TableHead>
        )}
        <TableHead className="py-4 px-8 text-sm font-medium text-muted-foreground text-center whitespace-nowrap">
          Appears In
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};