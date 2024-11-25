import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillProfileTableProps {
  skills: any[];
  toggledSkills: Set<string>;
  onToggleSkill: (skillTitle: string) => void;
  sortField: string | null;
  sortDirection: string | null;
  onSort: (field: any) => void;
  selectedCategory: string;
  roleId: string;
  selectedFunction: string;
  selectedSkills: string[];
  selectedJobTitle: string;
}

export const SkillProfileTable = ({
  skills,
  toggledSkills,
  onToggleSkill,
  sortField,
  sortDirection,
  onSort,
  selectedCategory,
  roleId,
  selectedFunction,
  selectedSkills,
  selectedJobTitle
}: SkillProfileTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="w-[22%] h-12">
            <div className="flex items-center gap-1">
              Skill Title <ChevronDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead className="w-[18%] h-12">Subcategory</TableHead>
          <TableHead className="w-[15%] text-center h-12">
            <div className="flex items-center justify-center gap-1">
              Projected Growth
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-left">Projected Growth:</h4>
                      <p className="text-sm text-left font-normal">
                        Indicates the projected growth rate for this skill over the next year based on market demand and industry trends.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TableHead>
          <TableHead className="w-[15%] text-center h-12">Skill Pricer</TableHead>
          <TableHead className="w-[15%] text-center h-12">Appears In</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skills.map((skill) => (
          <TableRow key={skill.title} className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
            <TableCell className="align-middle">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={toggledSkills.has(skill.title)}
                  onCheckedChange={() => onToggleSkill(skill.title)}
                />
                <span className="font-medium">{skill.title}</span>
              </div>
            </TableCell>
            <TableCell className="align-middle">{skill.subcategory}</TableCell>
            <TableCell className="text-center align-middle">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ↗ {skill.growth}
              </span>
            </TableCell>
            <TableCell className="text-center align-middle">{skill.salary}</TableCell>
            <TableCell className="text-center align-middle">
              <div className="flex items-center justify-center space-x-1">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">B</span>
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-sm font-medium">R</span>
                <span className="w-6 h-6 rounded-full bg-[#E5DEFF] text-[#6E59A5] flex items-center justify-center text-sm font-medium">M</span>
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm font-medium">O</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};