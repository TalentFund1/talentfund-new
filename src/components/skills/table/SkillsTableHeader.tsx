import { TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SkillsTableHeaderProps {
  selectedFilter?: string;
  setSelectedFilter?: (value: string) => void;
  sortField: 'growth' | 'salary' | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (field: 'growth' | 'salary') => void;
}

export const SkillsTableHeader = ({ 
  selectedFilter, 
  setSelectedFilter,
  sortField,
  sortDirection,
  onSort
}: SkillsTableHeaderProps) => {
  const renderSortIcon = (field: 'growth' | 'salary') => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-[25%]">
          <div className="flex items-center gap-1">
            Skill Title {renderSortIcon('growth')}
          </div>
        </TableHead>
        <TableHead className="w-[25%]">Subcategory</TableHead>
        <TableHead className="w-[25%]">Business Category</TableHead>
        <TableHead className="w-[25%]">
          <button 
            onClick={() => onSort('salary')}
            className="flex items-center gap-1 hover:text-primary"
          >
            Salary Impact {renderSortIcon('salary')}
          </button>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};