import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const CompetencyLoadingState = () => {
  return (
    <>
      {Array(5).fill(0).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium border-r border-border">
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          {Array(4).fill(0).map((_, cellIndex) => (
            <TableCell 
              key={cellIndex}
              className="text-center p-2 align-middle border-r border-border"
            >
              <div className="flex flex-col items-center gap-0">
                <Skeleton className="h-[26px] w-[120px] rounded-t-md" />
                <Skeleton className="h-[26px] w-[120px] rounded-b-md" />
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};