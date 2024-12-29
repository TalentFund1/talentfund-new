import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TablePaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (value: string) => void;
  rowsPerPage?: number;
}

export const TablePagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPage = 10
}: TablePaginationProps) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);

  console.log('TablePagination rendering:', {
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    rowsPerPage
  });

  return (
    <div className="flex justify-between items-center">
      <Select value={String(rowsPerPage)} onValueChange={onRowsPerPageChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={`${rowsPerPage} rows`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 rows</SelectItem>
          <SelectItem value="20">20 rows</SelectItem>
          <SelectItem value="50">50 rows</SelectItem>
          <SelectItem value="100">100 rows</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {totalItems > 0 ? `${startIndex + 1}-${endIndex} of ${totalItems}` : '0 items'}
        </span>
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-8 h-8"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="w-8 h-8"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};