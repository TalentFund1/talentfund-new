import { Switch } from "@/components/ui/switch";
import { ChevronUp, HelpCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UnifiedSkill } from "./types/SkillTypes";
import { roleSkills } from "./data/roleSkills";
import { useParams } from "react-router-dom";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";

interface SkillProfileMatrixTableProps {
  paginatedSkills: UnifiedSkill[];
  toggledSkills: Set<string>;
  onToggleSkill: (skillTitle: string) => void;
  sortField: 'growth' | 'salary' | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (field: 'growth' | 'salary' | null) => void;
}

export const SkillProfileMatrixTable = ({ 
  paginatedSkills, 
  toggledSkills,
  onToggleSkill,
  sortField,
  sortDirection,
  onSort
}: SkillProfileMatrixTableProps) => {
  const { id } = useParams();
  const { setSkillGoalStatus, getSkillState } = useEmployeeSkillsStore();
  
  const getSkillType = (skillTitle: string): string => {
    const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];
    
    if (currentRoleSkills.specialized.some(s => s.title === skillTitle)) {
      return 'Specialized';
    }
    if (currentRoleSkills.common.some(s => s.title === skillTitle)) {
      return 'Common';
    }
    if (currentRoleSkills.certifications.some(s => s.title === skillTitle)) {
      return 'Certification';
    }
    return 'Uncategorized';
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'specialized':
        return 'bg-blue-100 text-blue-800';
      case 'certification':
        return 'bg-purple-100 text-purple-800';
      case 'common':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDevelopmentPlanToggle = (skillTitle: string) => {
    if (!id) return;
    
    const currentState = getSkillState(id, skillTitle);
    const newGoalStatus = currentState.goalStatus === 'skill_goal' ? 'unknown' : 'skill_goal';
    
    console.log('Toggling development plan for skill:', {
      skillTitle,
      employeeId: id,
      currentGoalStatus: currentState.goalStatus,
      newGoalStatus
    });
    
    setSkillGoalStatus(id, skillTitle, newGoalStatus);
  };

  const uniqueSkills = paginatedSkills.reduce((acc: UnifiedSkill[], current) => {
    const exists = acc.find(skill => skill.title === current.title);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);

  const renderSortArrow = (field: 'growth' | 'salary') => {
    if (sortField !== field) {
      return <ChevronUp className="h-4 w-4 text-muted-foreground opacity-50" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-primary" />
    ) : (
      <ChevronUp className="h-4 w-4 text-primary rotate-180 transform" />
    );
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-background text-left">
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground w-[25%]">Skill Title</th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground w-[20%]">Subcategory</th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground w-[15%]">Type</th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground w-[20%]">
            <Button
              variant="ghost"
              className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
              onClick={() => onSort('growth')}
            >
              Projected Growth
              {renderSortArrow('growth')}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </span>
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
            </Button>
          </th>
          <th className="py-4 px-2 text-sm font-medium text-muted-foreground w-[20%]">
            <Button
              variant="ghost"
              className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
              onClick={() => onSort('salary')}
            >
              Skill Pricer
              {renderSortArrow('salary')}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-left">Skill Pricer:</h4>
                      <p className="text-sm text-left font-normal">
                        Reflects the Nationwide Median Advertised Salary for the past year based on the selected Job Title and the Skill.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Button>
          </th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground text-center">
            Skill Development
          </th>
          <th className="py-4 px-8 text-sm font-medium text-muted-foreground text-center whitespace-nowrap">
            Appears In <ChevronUp className="h-4 w-4 inline-block ml-1" />
          </th>
        </tr>
      </thead>
      <tbody>
        {uniqueSkills.map((skill) => (
          <tr 
            key={skill.title}
            className="border-t border-border hover:bg-muted/50 transition-colors"
          >
            <td className="py-3 px-4">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={toggledSkills.has(skill.title)}
                  onCheckedChange={() => onToggleSkill(skill.title)}
                  className="data-[state=checked]:bg-primary"
                />
                <span className="text-sm">{skill.title}</span>
              </div>
            </td>
            <td className="py-3 px-4">
              <span className="text-sm block truncate" title={skill.subcategory}>
                {skill.subcategory}
              </span>
            </td>
            <td className="py-3 px-4">
              <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${getTypeColor(getSkillType(skill.title))}`}>
                {getSkillType(skill.title)}
              </span>
            </td>
            <td className="py-3 px-4">
              <span className={`bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm`}>
                ↗ {skill.growth}
              </span>
            </td>
            <td className="py-3 px-2 text-sm">{skill.salary}</td>
            <td className="py-3 px-4 text-center">
              <Checkbox
                checked={id ? getSkillState(id, skill.title).goalStatus === 'skill_goal' : false}
                onCheckedChange={() => handleDevelopmentPlanToggle(skill.title)}
                className="border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
            </td>
            <td className="py-3 px-8">
              <div className="flex justify-center gap-1">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">R</span>
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-medium">E</span>
                <span className="w-6 h-6 rounded-full bg-[#E5DEFF] text-[#6E59A5] flex items-center justify-center text-sm font-medium">M</span>
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm font-medium">D</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};