import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId } from "../EmployeeTable";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { SkillsDisplay } from "./SkillsDisplay";
import { 
  calculateEmployeeBenchmark, 
  getSkillMatch, 
  getBenchmarkColor 
} from "./utils/benchmarkUtils";

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
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  const targetRoleId = selectedJobTitle.length > 0 
    ? getSkillProfileId(selectedJobTitle[0])
    : getSkillProfileId(employee.role);

  const benchmark = calculateEmployeeBenchmark(
    employee,
    selectedJobTitle,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  const skillMatch = getSkillMatch(employee, selectedSkills, targetRoleId, toggledSkills);
  const isExactMatch = selectedJobTitle.length > 0 && 
    getSkillProfileId(employee.role) === getSkillProfileId(selectedJobTitle[0]);

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
      <td className="px-4 py-4 w-[180px]">
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
                Role Match
              </Badge>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-4 w-[220px]">
        <Link 
          to={`/skills/${getSkillProfileId(employee.role)}`} 
          className="text-sm text-primary hover:text-primary-accent transition-colors"
        >
          {employee.role}
        </Link>
      </td>
      <td className="px-4 py-4 w-[150px] text-sm">{employee.department}</td>
      <td className="px-4 py-4 text-center w-[120px]">
        <span className="text-sm text-muted-foreground font-medium">
          {skillMatch}
        </span>
      </td>
      {selectedSkills.length === 0 && (
        <td className="px-4 py-4 text-center w-[120px]">
          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${
            getBenchmarkColor(benchmark)
          }`}>
            {Math.round(benchmark)}%
          </span>
        </td>
      )}
      {selectedSkills.length > 0 && (
        <td className="px-4 py-4 min-w-[300px]">
          <SkillsDisplay 
            employeeId={employee.id}
            selectedSkills={selectedSkills}
          />
        </td>
      )}
      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};