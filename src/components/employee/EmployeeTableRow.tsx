import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId, getBaseRole, getLevel } from "../EmployeeTable";
import { SkillBubble } from "../skills/SkillBubble";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { filterEmployeesBySkills, getSkillMatchCount } from "./EmployeeSkillsFilter";
import { useTableBenchmark } from "./benchmark/TableBenchmarkCalculator";
import { TableBenchmarkDisplay } from "./benchmark/TableBenchmarkDisplay";

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
  const roleId = selectedJobTitle.length > 0 
    ? getSkillProfileId(selectedJobTitle[0])
    : getSkillProfileId(employee.role);
    
  const roleLevel = getLevel(employee.role);
  const benchmark = useTableBenchmark(employee.id, roleId || "123", roleLevel);
  
  const isExactMatch = selectedJobTitle.length > 0 && 
    getBaseRole(employee.role) === selectedJobTitle[0];

  const renderSkillBubbles = () => {
    if (!selectedSkills?.length) return null;

    const employeeSkills = getEmployeeSkills(employee.id);
    return (
      <div className="flex flex-wrap gap-2 min-w-[300px] px-4">
        {selectedSkills.map(skillName => {
          const employeeSkill = employeeSkills.find(s => s.title === skillName);
          if (!employeeSkill) return null;

          const competencyState = getSkillCompetencyState(skillName, roleLevel);
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
      <td className="px-4 py-4 w-[150px] text-sm">{employee.department}</td>
      <td className="px-4 py-4">
        {selectedSkills.length > 0 ? renderSkillBubbles() : (
          <div className="text-center text-sm">
            {`${benchmark.skillMatch.current}/${benchmark.skillMatch.total}`}
          </div>
        )}
      </td>
      <td className="py-4 w-[200px]">
        <TableBenchmarkDisplay {...benchmark} />
      </td>
      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};