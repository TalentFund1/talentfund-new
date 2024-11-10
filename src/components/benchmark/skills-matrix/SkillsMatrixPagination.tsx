import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SkillsMatrixPaginationProps {
  filteredSkills: any[];
}

export const SkillsMatrixPagination = ({ filteredSkills }: SkillsMatrixPaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <Select defaultValue="10">
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
          1-{filteredSkills.length} of {filteredSkills.length}
        </span>
        <Button variant="outline" size="icon" className="w-8 h-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="w-8 h-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};