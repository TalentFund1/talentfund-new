import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { SkillBubble } from "../skills/SkillBubble";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getSkillProfileId, getBaseRole, getLevel } from "../EmployeeTable";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface EmployeeTableRowProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (name: string) => void;
  imageUrl: string;
  selectedSkills?: string[];
  selectedJobTitle?: string[];
  isExactMatch?: boolean;
  benchmark?: number;
}

export const EmployeeTableRow = ({ 
  employee, 
  isSelected, 
  onSelect, 
  imageUrl,
  selectedSkills = [],
  selectedJobTitle = [],
  isExactMatch = false,
  benchmark = 0
}: EmployeeTableRowProps) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeRoleId = getSkillProfileId(employee.role);
  const employeeLevel = getLevel(employee.role);

  const getBenchmarkColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const renderSkills = () => {
    if (selectedSkills.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 min-w-[300px] px-4">
        {selectedSkills.map(skillName => {
          const competencyState = getSkillCompetencyState(skillName, employeeLevel, employeeRoleId);
          return competencyState ? (
            <SkillBubble
              key={skillName}
              skillName={skillName}
              level={competencyState.level}
              isRequired={competencyState.required === 'required' || competencyState.required === 'skill_goal'}
            />
          ) : null;
        })}
      </div>
    );
  };

  return (
    <tr className={`border-t border-border hover:bg-muted/50 transition-colors ${
      isExactMatch ? 'bg-blue-50/50' : ''
    }`}>
      <td className="px-4 py-4 w-[48px]">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={isSelected}
          onChange={() => onSelect(employee.name)}
        />
      </td>
      <td className="px-4 py-4 w-[200px]">
        <div className="flex items-center gap-2">
          <img 
            src={imageUrl}
            alt={employee.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="flex items-center gap-2">
            <Link to={`/employee/${employee.id}`} className="text-primary hover:text-primary-accent transition-colors text-sm">
              {employee.name}
            </Link>
            {isExactMatch && selectedJobTitle.length > 0 && (
              <Badge 
                variant="secondary" 
                className="text-xs bg-primary-accent/10 text-primary-accent border border-primary-accent/20 hover:bg-primary-accent/15 flex items-center gap-1.5 px-2 py-0.5 font-medium animate-fade-in"
              >
                <CheckCircle2 className="w-3 h-3" />
                Exact Match
              </Badge>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-4 w-[250px]">
        <Link 
          to={`/skills/${employeeRoleId}`} 
          className="text-sm text-primary hover:text-primary-accent transition-colors"
        >
          {employee.role}
        </Link>
      </td>
      <td className="px-4 py-4 w-[150px] text-sm">{employee.department}</td>
      <td className="px-4 py-4 text-center">
        {selectedJobTitle.length > 0 && (
          <span className="text-sm text-muted-foreground font-medium">
            {employee.skillCount} / {employee.skillCount}
          </span>
        )}
      </td>
      <td className="px-4 py-4 text-center">
        {benchmark > 0 && (
          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${
            getBenchmarkColor(benchmark)
          }`}>
            {Math.round(benchmark)}%
          </span>
        )}
      </td>
      {selectedSkills.length > 0 && (
        <td className="px-4 py-4">
          {renderSkills()}
        </td>
      )}
      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};