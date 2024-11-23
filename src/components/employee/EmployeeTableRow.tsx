import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId } from "../EmployeeTable";
import { SkillBubble } from "../skills/SkillBubble";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

interface EmployeeTableRowProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (name: string) => void;
  imageUrl: string;
  selectedSkills?: string[];
}

export const EmployeeTableRow = ({ 
  employee, 
  isSelected, 
  onSelect, 
  imageUrl,
  selectedSkills = []
}: EmployeeTableRowProps) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employee.id);

  const renderBenchmark = () => {
    if (selectedSkills.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 justify-center">
          {selectedSkills.map(skillName => {
            const employeeSkill = employeeSkills.find(s => s.title === skillName);
            if (!employeeSkill) return null;

            const competencyState = getSkillCompetencyState(skillName, employee.role.split(":")[1]?.trim() || "P4");
            
            return (
              <SkillBubble
                key={skillName}
                skillName={skillName}
                level={competencyState?.level || employeeSkill.level}
                isRequired={competencyState?.required === 'required'}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <span className={`px-2.5 py-1 rounded-full text-sm ${
          employee.benchmark >= 80 
            ? 'bg-green-100 text-green-800' 
            : 'bg-orange-100 text-orange-800'
        }`}>
          {employee.benchmark}%
        </span>
      </div>
    );
  };

  return (
    <tr className="border-t border-border hover:bg-muted/50 transition-colors">
      <td className="px-4 py-4">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={isSelected}
          onChange={() => onSelect(employee.name)}
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <img 
            src={imageUrl}
            alt={employee.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <Link to={`/employee/${employee.id}`} className="text-primary hover:text-primary-accent transition-colors text-sm">
            {employee.name}
          </Link>
        </div>
      </td>
      <td className="px-4 py-4">
        <Link 
          to={`/skills/${getSkillProfileId(employee.role)}`} 
          className="text-sm text-primary hover:text-primary-accent transition-colors"
        >
          {employee.role}
        </Link>
      </td>
      <td className="px-4 py-4 text-sm">{employee.department}</td>
      <td className="px-4 py-4 text-center text-sm">{employee.skillCount}</td>
      <td className="px-4 py-4">
        {renderBenchmark()}
      </td>
      <td className="px-4 py-4 text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};