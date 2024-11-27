import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { SkillBubble } from "../skills/SkillBubble";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getSkillProfileId } from "../EmployeeTable";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface EmployeeTableRowProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (name: string) => void;
  imageUrl: string;
  selectedSkills?: string[];
  selectedJobTitle?: string[];
}

export const EmployeeTableRow = ({ 
  employee, 
  isSelected, 
  onSelect, 
  imageUrl,
  selectedSkills = [],
  selectedJobTitle = []
}: EmployeeTableRowProps) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const roleId = getSkillProfileId(employee.role);
  
  const isExactMatch = selectedJobTitle.length > 0 && 
    selectedJobTitle.some(title => getSkillProfileId(title) === roleId);

  const renderSkills = () => {
    if (selectedSkills.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 min-w-[300px] px-4">
        {selectedSkills.map(skillName => {
          const competencyState = getSkillCompetencyState(skillName, employee.role.split(":")[1]?.trim() || "P4");
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
            {isExactMatch && (
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
          to={`/skills/${roleId}`} 
          className="text-sm text-primary hover:text-primary-accent transition-colors"
        >
          {employee.role}
        </Link>
      </td>
      <td className="px-4 py-4 w-[100px] text-sm">{roleId}</td>
      <td className="px-4 py-4 w-[150px] text-sm">{employee.department}</td>
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