import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MatchesSectionProps {
  selectedEmployees: string[];
  onEmployeeSelect: (employeeName: string) => void;
}

export const MatchesSection = ({
  selectedEmployees,
  onEmployeeSelect
}: MatchesSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-primary">4. Review your Matches</h2>
          <p className="text-sm text-primary/60">Find the perfect team members for your project.</p>
        </div>
      </div>

      <ScrollArea className="h-[300px] rounded-lg border border-border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-background/40">
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Employee Name</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Skill Count</TableHead>
              <TableHead>Skill Match</TableHead>
              <TableHead>Adjacent Skills</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-muted/50">
              <TableCell>
                <input 
                  type="checkbox" 
                  checked={selectedEmployees.includes('Victor Smith')}
                  onChange={() => onEmployeeSelect('Victor Smith')}
                  className="rounded border-gray-300"
                />
              </TableCell>
              <TableCell className="font-medium">Victor Smith</TableCell>
              <TableCell>AI Engineer: P4</TableCell>
              <TableCell>Engineering</TableCell>
              <TableCell>1/1</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary-accent/10 text-primary border-primary-accent/20">
                  Swift
                </Badge>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};