import { Switch } from "@/components/ui/switch";
import { ArrowUp, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SelectAllToggle } from "./SelectAllToggle";

interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  salary: string;
  benchmarks: { J: boolean; B: boolean; O: boolean };
}

interface SkillProfileMatrixTableProps {
  paginatedSkills: Skill[];
  toggledSkills: Set<string>;
  onToggleSkill: (skillTitle: string) => void;
}

export const SkillProfileMatrixTable = ({ 
  paginatedSkills, 
  toggledSkills,
  onToggleSkill
}: SkillProfileMatrixTableProps) => {
  const isAllSelected = paginatedSkills.length > 0 && 
    paginatedSkills.every(skill => toggledSkills.has(skill.title));

  const handleToggleAll = () => {
    if (isAllSelected) {
      // Deselect all skills
      paginatedSkills.forEach(skill => {
        if (toggledSkills.has(skill.title)) {
          onToggleSkill(skill.title);
        }
      });
    } else {
      // Select all skills
      paginatedSkills.forEach(skill => {
        if (!toggledSkills.has(skill.title)) {
          onToggleSkill(skill.title);
        }
      });
    }
  };

  return (
    <>
      <SelectAllToggle 
        isAllSelected={isAllSelected}
        onToggleAll={handleToggleAll}
      />
      <table className="w-full">
      <thead>
        <tr className="bg-background text-left">
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground w-[25%]">Skill Title</th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground w-[30%]">Subcategory</th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground text-center w-[15%]">
            <div className="flex items-center justify-center gap-1">
              Projected Growth
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
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
          </th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground text-center w-[15%]">
            <div className="flex items-center justify-center gap-1">
              Salary With Skill
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-left">Salary with Skill:</h4>
                      <p className="text-sm text-left font-normal">
                        Reflects the Nationwide Median Advertised Salary for the past year based on the selected Job Title and the Skill.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground text-center w-[15%]">
            <div className="flex items-center justify-center gap-1">
              Appears In
              <ArrowUp className="h-4 w-4" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {paginatedSkills.map((skill) => (
          <tr 
            key={skill.title}
            className="border-t border-border hover:bg-muted/50 transition-colors"
          >
            <td className="py-3 px-4">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={toggledSkills.has(skill.title)}
                  onCheckedChange={() => onToggleSkill(skill.title)}
                />
                <span className="text-sm">{skill.title}</span>
              </div>
            </td>
            <td className="py-3 px-4 text-sm">
              <span className="block truncate" title={skill.subcategory}>
                {skill.subcategory}
              </span>
            </td>
            <td className="py-3 px-4 text-center">
              <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm">
                ↗ {skill.growth}
              </span>
            </td>
            <td className="py-3 px-4 text-center text-sm">{skill.salary}</td>
            <td className="py-3 px-4">
              <div className="flex justify-center gap-1">
                <span className="w-6 h-6 rounded-full bg-[#8073ec]/20 text-primary flex items-center justify-center text-sm font-medium">J</span>
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">B</span>
                <span className="w-6 h-6 rounded-full bg-primary-icon/10 text-primary-icon flex items-center justify-center text-sm font-medium">O</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </>
  );
};
