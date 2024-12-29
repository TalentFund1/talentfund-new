import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SkillProfileMatrixPaginationProps {
  rowsPerPage: number;
  handleRowsPerPageChange: (value: string) => void;
  startIndex: number;
  endIndex: number;
  totalSkills: number;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const SkillProfileMatrixPagination = ({
  rowsPerPage,
  handleRowsPerPageChange,
  startIndex,
  endIndex,
  totalSkills,
  currentPage,
  totalPages,
  handlePageChange,
}: SkillProfileMatrixPaginationProps) => {
  return (
    <div className="flex justify-between items-center border-t border-border pt-4">
      <Select value={String(rowsPerPage)} onValueChange={handleRowsPerPageChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="10 rows" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 rows</SelectItem>
          <SelectItem value="20">20 rows</SelectItem>
          <SelectItem value="50">50 rows</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-muted-foreground">
          {`${startIndex + 1}-${Math.min(endIndex, totalSkills)} of ${totalSkills}`}
        </span>
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-8 h-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="w-8 h-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};