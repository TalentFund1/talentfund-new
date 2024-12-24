import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId } from "../EmployeeTable";
import { employeeSkillService } from "../../services/employee/EmployeeSkillService";

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
  const isExactMatch = selectedJobTitle.length > 0 && 
    getSkillProfileId(employee.role) === getSkillProfileId(selectedJobTitle[0]);

  // Normalize skill levels for comparison
  const employeeSkills = employee.skills.map(skill => ({
    ...skill,
    level: employeeSkillService.normalizeSkillLevel(skill.level)
  }));

  console.log('Rendering EmployeeTableRow:', {
    employeeName: employee.name,
    employeeRole: employee.role,
    isExactMatch,
    skillCount: employeeSkills.length
  });

  return (
    <tr className={`group border-t border-border hover:bg-muted/50 transition-colors w-full ${
      isExactMatch && selectedJobTitle.length > 0 ? 'bg-blue-50/50' : ''
    }`}>
      <td className="px-4 py-4 w-[48px]">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={isSelected}
          onChange={() => onSelect(employee.name)}
        />
      </td>
      <td className={`px-10 py-4 ${selectedSkills.length > 0 ? 'w-[600px]' : 'w-[400px]'}`}>
        <div className="flex items-center gap-2">
          <img 
            src={imageUrl}
            alt={employee.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="flex items-center gap-2">
            <Link to={`/employee/${employee.id}`} className="text-primary hover:text-primary-accent transition-colors text-sm whitespace-nowrap">
              {employee.name}
            </Link>
            {isExactMatch && selectedJobTitle.length > 0 && (
              <Badge 
                variant="secondary" 
                className="text-xs bg-primary-accent/10 text-primary-accent border border-primary-accent/20 hover:bg-primary-accent/15 flex items-center gap-1.5 px-2 py-0.5 font-medium animate-fade-in"
              >
                <CheckCircle2 className="w-3 h-3" />
                Role Match
              </Badge>
            )}
          </div>
        </div>
      </td>
      <td className={`px-6 py-4 ${selectedSkills.length > 0 ? 'w-[600px]' : 'w-[350px]'}`}>
        <Link 
          to={`/skills/${getSkillProfileId(employee.role)}`} 
          className="text-sm text-primary hover:text-primary-accent transition-colors whitespace-nowrap"
        >
          {employee.role}
        </Link>
      </td>
      {selectedSkills.length === 0 && (
        <td className="px-6 py-4 w-[150px] text-sm">{employee.department}</td>
      )}
      <td className="px-12 py-4 text-center w-[120px]">
        <span className="text-sm text-muted-foreground font-medium">
          {employeeSkills.length}
        </span>
      </td>
      {!selectedSkills.length && (
        <td className="px-6 py-4 text-center w-[120px]">
          <span className="text-sm text-muted-foreground font-medium">
            {employee.benchmark || 0}%
          </span>
        </td>
      )}
      {selectedSkills.length > 0 && (
        <>
          <td className="px-6 py-4 w-[350px]">
            <div className="flex flex-wrap gap-2">
              {employeeSkills
                .filter(skill => selectedSkills.includes(skill.title))
                .map(skill => (
                  <Badge 
                    key={skill.title}
                    variant="outline" 
                    className="bg-white"
                  >
                    {skill.title}
                  </Badge>
                ))}
            </div>
          </td>
          <td className="px-6 py-4 w-[350px]">
            <div className="flex flex-wrap gap-2">
              {employeeSkills
                .filter(skill => !selectedSkills.includes(skill.title))
                .map(skill => (
                  <Badge 
                    key={skill.title}
                    variant="outline" 
                    className="bg-white text-muted-foreground"
                  >
                    {skill.title}
                  </Badge>
                ))}
            </div>
          </td>
        </>
      )}
      {!selectedSkills.length && (
        <td className="px-6 py-4 text-right w-[140px] text-sm text-muted-foreground">
          {employee.lastUpdated}
        </td>
      )}
    </tr>
  );
};