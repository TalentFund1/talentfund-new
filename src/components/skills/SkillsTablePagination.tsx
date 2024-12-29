import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsTablePaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (value: string) => void;
}

export const SkillsTablePagination = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange
}: SkillsTablePaginationProps) => {
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="flex justify-between items-center px-6 py-4 border-t border-border">
      <div className="flex items-center gap-2">
        <Select value={String(rowsPerPage)} onValueChange={onRowsPerPageChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="10 rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground ml-4">
          {`${startIndex}-${endIndex} of ${totalItems}`}
        </span>
      </div>
      
      <div className="flex gap-1">
        <Button 
          variant="outline" 
          size="icon" 
          className="w-8 h-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="w-8 h-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};