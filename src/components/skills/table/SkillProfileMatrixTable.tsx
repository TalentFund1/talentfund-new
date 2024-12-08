import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { ChevronUp, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type SortField = 'growth' | 'salary' | null;
type SortDirection = 'asc' | 'desc' | null;

interface SkillProfileMatrixTableProps {
  paginatedSkills: any[];
  toggledSkills: Set<string>;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onToggleSkill: (skillTitle: string) => void;
}

export const SkillProfileMatrixTable = ({
  paginatedSkills,
  toggledSkills,
  sortField,
  sortDirection,
  onSort,
  onToggleSkill
}: SkillProfileMatrixTableProps) => {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Skill Title</TableHead>
          <TableHead>Subcategory</TableHead>
          <TableHead className="text-center">
            <Button
              variant="ghost"
              className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
              onClick={() => onSort('growth')}
            >
              Growth
              {renderSortArrow('growth')}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                    <p className="text-sm">Projected growth rate for this skill</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Button>
          </TableHead>
          <TableHead className="text-center">
            <Button
              variant="ghost"
              className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
              onClick={() => onSort('salary')}
            >
              Salary Impact
              {renderSortArrow('salary')}
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedSkills.map((skill) => (
          <TableRow key={skill.title}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Switch
                  checked={toggledSkills.has(skill.title)}
                  onCheckedChange={() => onToggleSkill(skill.title)}
                />
                <span>{skill.title}</span>
              </div>
            </TableCell>
            <TableCell>{skill.subcategory}</TableCell>
            <TableCell className="text-center">{skill.growth}</TableCell>
            <TableCell className="text-center">{skill.salary}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};