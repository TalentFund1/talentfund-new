import { Table, TableHeader, TableBody } from "@/components/ui/table";
import { SkillProfileTableHeader } from "./SkillProfileTableHeader";
import { SkillProfileTableRow } from "./SkillProfileTableRow";
import { SkillProfileRow } from "../types";

export interface SkillProfileTableContentProps {
  rows: SkillProfileRow[];
  selectedRows: string[];
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectRow: (id: string) => void;
}

export const SkillProfileTableContent = ({
  rows,
  selectedRows,
  onSelectAll,
  onSelectRow
}: SkillProfileTableContentProps) => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <SkillProfileTableHeader 
            onSelectAll={onSelectAll}
            selectedRows={selectedRows}
            totalRows={rows.length}
          />
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-muted-foreground">
                No profile found
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <SkillProfileTableRow
                key={row.id}
                row={row}
                isSelected={selectedRows.includes(row.id)}
                onSelect={() => onSelectRow(row.id)}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};