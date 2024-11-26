import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId, getBaseRole } from "../utils/roleUtils";
import { SkillBubble } from "../skills/SkillBubble";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { EmployeeNameCell } from "./table/EmployeeNameCell";
import { BenchmarkCell } from "./table/BenchmarkCell";

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
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const employeeSkills = getEmployeeSkills(employee.id);

  const employeeRoleId = getSkillProfileId(getBaseRole(employee.role));
  const selectedRoleId = selectedJobTitle.length > 0 
    ? getSkillProfileId(selectedJobTitle[0])
    : employeeRoleId;
    
  const isExactMatch = selectedJobTitle.length > 0 && 
    getBaseRole(employee.role) === selectedJobTitle[0];

  const shouldShowExactMatch = isExactMatch && selectedJobTitle.length > 0;

  return (
    <tr className={`border-t border-border hover:bg-muted/50 transition-colors ${
      shouldShowExactMatch ? 'bg-blue-50/50' : ''
    }`}>
      <td className="px-4 py-4 w-[48px]">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={isSelected}
          onChange={() => onSelect(employee.name)}
        />
      </td>
      
      <EmployeeNameCell 
        id={employee.id}
        name={employee.name}
        imageUrl={imageUrl}
        shouldShowExactMatch={shouldShowExactMatch}
      />

      <td className="px-4 py-4 w-[250px]">
        <Link 
          to={`/skills/${selectedRoleId}`} 
          className="text-sm text-primary hover:text-primary-accent transition-colors"
        >
          {employee.role}
        </Link>
      </td>

      <td className="px-4 py-4 w-[100px] text-sm">
        {employeeRoleId}
      </td>

      <td className="px-4 py-4 w-[150px] text-sm">{employee.department}</td>

      <BenchmarkCell 
        benchmark={employee.benchmark}
        selectedSkills={selectedSkills}
        employeeSkills={employeeSkills}
        getSkillCompetencyState={getSkillCompetencyState}
        currentStates={currentStates}
      />

      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};