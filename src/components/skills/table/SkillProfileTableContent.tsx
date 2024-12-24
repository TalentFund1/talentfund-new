import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { SkillProfileTableHeader } from "./SkillProfileTableHeader";
import { SkillProfileTableRow } from "./SkillProfileTableRow";
import { useToast } from "@/hooks/use-toast";

interface SkillProfileTableContentProps {
  rows: Array<{
    id: string;
    name: string;
    function: string;
    skillCount: string;
    employees: string;
    matches: string;
    lastUpdated: string;
  }>;
  selectedRows: string[];
  onSelectRow: (id: string) => void;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SkillProfileTableContent = ({
  rows,
  selectedRows,
  onSelectRow,
  onSelectAll
}: SkillProfileTableContentProps) => {
  const { toast } = useToast();

  console.log('Rendering SkillProfileTableContent:', {
    rowCount: rows.length,
    selectedCount: selectedRows.length
  });

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <SkillProfileTableHeader
            onSelectAll={onSelectAll}
            isAllSelected={rows.length > 0 && selectedRows.length === rows.length}
            hasSkills={rows.length > 0}
          />
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No profile found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <SkillProfileTableRow
                key={row.id}
                row={row}
                isSelected={selectedRows.includes(row.id)}
                onSelect={onSelectRow}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};