import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId, getBaseRole } from "../EmployeeTable";
import { SkillBubble } from "../skills/SkillBubble";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";

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
  const employeeSkills = getEmployeeSkills(employee.id);

  const isExactRoleMatch = selectedJobTitle.length > 0 && 
    getBaseRole(employee.role) === selectedJobTitle[0];

  const renderBenchmark = () => {
    if (selectedSkills.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 min-w-[300px] px-4">
          {selectedSkills.map(skillName => {
            const employeeSkill = employeeSkills.find(s => s.title === skillName);
            if (!employeeSkill) return null;

            const competencyState = getSkillCompetencyState(skillName, employee.role.split(":")[1]?.trim() || "P4");
            const skillState = currentStates[skillName];
            const isSkillGoal = skillState?.requirement === 'required' || skillState?.requirement === 'skill_goal';
            
            return (
              <SkillBubble
                key={skillName}
                skillName={skillName}
                level={competencyState?.level || employeeSkill.level}
                isRequired={isSkillGoal}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <span className={`px-2.5 py-1 rounded-full text-sm ${
          isExactRoleMatch
            ? 'bg-primary-accent/10 text-primary-accent'
            : employee.benchmark >= 80 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
        }`}>
          {employee.benchmark}%
          {isExactRoleMatch && (
            <span className="ml-1 text-xs">(Exact Match)</span>
          )}
        </span>
      </div>
    );
  };

  return (
    <tr className={`border-t border-border hover:bg-muted/50 transition-colors ${
      isExactRoleMatch ? 'bg-primary-accent/5' : ''
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
          <Link to={`/employee/${employee.id}`} className="text-primary hover:text-primary-accent transition-colors text-sm">
            {employee.name}
          </Link>
        </div>
      </td>
      <td className="px-4 py-4 w-[250px]">
        <Link 
          to={`/skills/${getSkillProfileId(employee.role)}`} 
          className="text-sm text-primary hover:text-primary-accent transition-colors"
        >
          {employee.role}
        </Link>
      </td>
      <td className="px-4 py-4 w-[150px] text-sm">{employee.department}</td>
      <td className="px-4 py-4 w-[100px] text-center text-sm">{employee.skillCount}</td>
      <td className="py-4 w-[200px] text-center">
        {renderBenchmark()}
      </td>
      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};