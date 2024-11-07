import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const SkillProfileTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableCell className="w-[4%] py-4">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableCell>
          <TableCell className="w-[25%] py-4">
            <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
              Role Name <ChevronDown className="h-4 w-4" />
            </div>
          </TableCell>
          <TableCell className="w-[20%] py-4 text-sm font-medium text-muted-foreground">Function</TableCell>
          <TableCell className="w-[15%] py-4 text-center text-sm font-medium text-muted-foreground">Skill Count</TableCell>
          <TableCell className="w-[15%] py-4 text-center text-sm font-medium text-muted-foreground">Employees</TableCell>
          <TableCell className="w-[15%] py-4 text-center text-sm font-medium text-muted-foreground">Profile Matches</TableCell>
          <TableCell className="w-[10%] py-4 text-right text-sm font-medium text-muted-foreground">Last Updated</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
          <TableCell className="align-middle">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableCell>
          <TableCell className="align-middle">
            <Link to="/skills/ai-engineer" className="text-primary hover:underline">
              AI Engineer
            </Link>
          </TableCell>
          <TableCell className="align-middle">Engineering</TableCell>
          <TableCell className="text-center align-middle">16</TableCell>
          <TableCell className="text-center align-middle">2</TableCell>
          <TableCell className="text-center align-middle">0</TableCell>
          <TableCell className="text-right align-middle text-muted-foreground">10/20/24</TableCell>
        </TableRow>
        <TableRow className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
          <TableCell className="align-middle">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableCell>
          <TableCell className="align-middle">
            <Link to="/skills/backend-engineer" className="text-primary hover:underline">
              Backend Engineer
            </Link>
          </TableCell>
          <TableCell className="align-middle">Engineering</TableCell>
          <TableCell className="text-center align-middle">12</TableCell>
          <TableCell className="text-center align-middle">3</TableCell>
          <TableCell className="text-center align-middle">4</TableCell>
          <TableCell className="text-right align-middle text-muted-foreground">10/20/24</TableCell>
        </TableRow>
        <TableRow className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
          <TableCell className="align-middle">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableCell>
          <TableCell className="align-middle">
            <Link to="/skills/frontend-engineer" className="text-primary hover:underline">
              Frontend Engineer
            </Link>
          </TableCell>
          <TableCell className="align-middle">Engineering</TableCell>
          <TableCell className="text-center align-middle">17</TableCell>
          <TableCell className="text-center align-middle">0</TableCell>
          <TableCell className="text-center align-middle">5</TableCell>
          <TableCell className="text-right align-middle text-muted-foreground">10/20/24</TableCell>
        </TableRow>
        <TableRow className="h-16 hover:bg-muted/50 transition-colors">
          <TableCell className="align-middle">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableCell>
          <TableCell className="align-middle">
            <Link to="/skills/engineering-manager" className="text-primary hover:underline">
              Engineering Manager
            </Link>
          </TableCell>
          <TableCell className="align-middle">Engineering</TableCell>
          <TableCell className="text-center align-middle">11</TableCell>
          <TableCell className="text-center align-middle">2</TableCell>
          <TableCell className="text-center align-middle">5</TableCell>
          <TableCell className="text-right align-middle text-muted-foreground">10/20/24</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};