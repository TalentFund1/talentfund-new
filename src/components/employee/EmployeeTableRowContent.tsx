import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId } from "../EmployeeTable";
import { SkillBubble } from "../skills/SkillBubble";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { calculateSkillMatch } from "../skills/utils/skillMatching";

interface EmployeeTableRowContentProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (name: string) => void;
  imageUrl: string;
  selectedSkills?: string[];
  selectedRoleId?: string[];
}

export const EmployeeTableRowContent = ({
  employee,
  isSelected,
  onSelect,
  imageUrl,
  selectedSkills = [],
  selectedRoleId = []
}: EmployeeTableRowContentProps) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();

  const employeeRoleId = getSkillProfileId(employee.role);
  const roleId = selectedRoleId.length > 0 ? selectedRoleId[0] : employeeRoleId;
  const isExactMatch = selectedRoleId.length > 0 && employeeRoleId === selectedRoleId[0];

  const { matchingCount, totalCount } = calculateSkillMatch(
    employee.id,
    roleId,
    toggledSkills
  );

  const renderBenchmark = () => {
    if (selectedSkills.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 min-w-[300px] px-4">
          {selectedSkills.map(skillName => {
            const employeeSkills = getEmployeeSkills(employee.id);
            const employeeSkill = employeeSkills.find(s => s.title === skillName);
            if (!employeeSkill) return null;

            const competencyState = getSkillCompetencyState(skillName, employee.role.split(":")[1]?.trim() || "P4");
            const skillState = currentStates[skillName];
            const isSkillGoal = skillState?.requirement === 'required' || 
                               skillState?.requirement === 'skill_goal';
            
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
          employee.benchmark >= 80 
            ? 'bg-green-100 text-green-800' 
            : employee.benchmark >= 60
            ? 'bg-orange-100 text-orange-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {employee.benchmark}%
        </span>
      </div>
    );
  };

  const shouldShowExactMatch = (isExactMatch) && 
    (selectedSkills.length > 0 || selectedRoleId.length > 0);

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
            {shouldShowExactMatch && (
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
      <td className="px-4 py-4 w-[100px] text-sm text-muted-foreground">
        {employeeRoleId}
      </td>
      <td className="px-4 py-4 w-[150px] text-sm">{employee.department}</td>
      <td className="px-4 py-4 w-[100px] text-center text-sm">{`${matchingCount} / ${totalCount}`}</td>
      <td className="py-4 w-[200px] text-center">
        {renderBenchmark()}
      </td>
      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};