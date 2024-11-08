import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const SkillProfileTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="w-[5%] h-12">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableHead>
          <TableHead className="w-[22%] h-12">
            <div className="flex items-center gap-1">
              Role Name <ChevronDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead className="w-[18%] h-12">Function</TableHead>
          <TableHead className="w-[15%] text-center h-12">Skill Count</TableHead>
          <TableHead className="w-[15%] text-center h-12">Employees</TableHead>
          <TableHead className="w-[15%] text-center h-12">Profile Matches</TableHead>
          <TableHead className="w-[10%] text-right whitespace-nowrap h-12">Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
          <TableCell className="align-middle bg-white">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableCell>
          <TableCell className="align-middle font-medium bg-white">
            <Link to="/skills/ai-engineer" className="text-primary hover:underline">
              AI Engineer
            </Link>
          </TableCell>
          <TableCell className="align-middle bg-white">Engineering</TableCell>
          <TableCell className="text-center align-middle bg-white">16</TableCell>
          <TableCell className="text-center align-middle bg-white">2</TableCell>
          <TableCell className="text-center align-middle bg-white">0</TableCell>
          <TableCell className="text-right align-middle text-muted-foreground bg-white">10/20/24</TableCell>
        </TableRow>
        <TableRow className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
          <TableCell className="align-middle bg-white">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableCell>
          <TableCell className="align-middle font-medium bg-white">
            <Link to="/skills/backend-engineer" className="text-primary hover:underline">
              Backend Engineer
            </Link>
          </TableCell>
          <TableCell className="align-middle bg-white">Engineering</TableCell>
          <TableCell className="text-center align-middle bg-white">12</TableCell>
          <TableCell className="text-center align-middle bg-white">3</TableCell>
          <TableCell className="text-center align-middle bg-white">4</TableCell>
          <TableCell className="text-right align-middle text-muted-foreground bg-white">10/20/24</TableCell>
        </TableRow>
        <TableRow className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
          <TableCell className="align-middle bg-white">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableCell>
          <TableCell className="align-middle font-medium bg-white">
            <Link to="/skills/frontend-engineer" className="text-primary hover:underline">
              Frontend Engineer
            </Link>
          </TableCell>
          <TableCell className="align-middle bg-white">Engineering</TableCell>
          <TableCell className="text-center align-middle bg-white">17</TableCell>
          <TableCell className="text-center align-middle bg-white">0</TableCell>
          <TableCell className="text-center align-middle bg-white">5</TableCell>
          <TableCell className="text-right align-middle text-muted-foreground bg-white">10/20/24</TableCell>
        </TableRow>
        <TableRow className="h-16 hover:bg-muted/50 transition-colors">
          <TableCell className="align-middle bg-white">
            <input type="checkbox" className="rounded border-gray-300" />
          </TableCell>
          <TableCell className="align-middle font-medium bg-white">
            <Link to="/skills/engineering-manager" className="text-primary hover:underline">
              Engineering Manager
            </Link>
          </TableCell>
          <TableCell className="align-middle bg-white">Engineering</TableCell>
          <TableCell className="text-center align-middle bg-white">11</TableCell>
          <TableCell className="text-center align-middle bg-white">2</TableCell>
          <TableCell className="text-center align-middle bg-white">5</TableCell>
          <TableCell className="text-right align-middle text-muted-foreground bg-white">10/20/24</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};