import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { SkillBubble } from "../skills/SkillBubble";
import { getSkillProfileId } from "../EmployeeTable";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { roleSkills } from "../skills/data/roleSkills";
import { getLevel } from "../EmployeeTable";

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

  const employeeLevel = getLevel(employee.role);
  
  const benchmark = calculateBenchmarkPercentage(
    employee.id,
    targetRoleId,
    employeeLevel,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  const getSkillMatch = () => {
    const employeeSkills = getEmployeeSkills(employee.id);
    
    if (selectedSkills.length > 0) {
      const matchingSkills = selectedSkills.filter(skillName => 
        employeeSkills.some(empSkill => empSkill.title === skillName)
      );
      return `${matchingSkills.length}/${selectedSkills.length}`;
    }

    const roleData = roleSkills[targetRoleId as keyof typeof roleSkills];
    if (!roleData) return "0/0";

    const allRoleSkills = [
      ...roleData.specialized,
      ...roleData.common,
      ...roleData.certifications
    ].filter(skill => toggledSkills.has(skill.title));

    const matchingSkills = allRoleSkills.filter(roleSkill => 
      employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
    );

    return `${matchingSkills.length}/${allRoleSkills.length}`;
  };

  const isExactMatch = selectedJobTitle.length > 0 && 
    getSkillProfileId(employee.role) === getSkillProfileId(selectedJobTitle[0]);

  const getBenchmarkColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const renderSkills = () => {
    if (selectedSkills.length === 0) return null;

    const employeeSkills = getEmployeeSkills(employee.id);
    
    const skillsToShow = selectedSkills.filter(skillName => 
      employeeSkills.some(empSkill => empSkill.title === skillName)
    );

    return (
      <div className="flex flex-wrap gap-2 min-w-[250px]">
        {skillsToShow.map(skillName => {
          const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skillName);
          if (!employeeSkill) return null;
          
          return (
            <SkillBubble
              key={skillName}
              skillName={skillName}
              level={employeeSkill.level || 'unspecified'}
              isRequired={false}
            />
          );
        })}
      </div>
    );
  };

  const renderAdjacentSkills = () => {
    if (selectedSkills.length === 0) return null;

    const employeeSkills = getEmployeeSkills(employee.id);
    const adjacentSkills = employeeSkills.filter(empSkill => 
      !selectedSkills.includes(empSkill.title)
    ).slice(0, 3);

    return (
      <div className="flex flex-wrap gap-2 min-w-[250px]">
        {adjacentSkills.map(skill => (
          <SkillBubble
            key={skill.title}
            skillName={skill.title}
            level={skill.level || 'unspecified'}
            isRequired={false}
          />
        ))}
      </div>
    );
  };

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
      <td className="px-10 py-4 text-center w-[120px]">
        <span className="text-sm text-muted-foreground font-medium">
          {getSkillMatch()}
        </span>
      </td>
      {selectedSkills.length === 0 && (
        <td className="px-6 py-4 text-center w-[120px]">
          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${
            getBenchmarkColor(benchmark)
          }`}>
            {Math.round(benchmark)}%
          </span>
        </td>
      )}
      {selectedSkills.length > 0 && (
        <>
          <td className="px-6 py-4 w-[350px] text-left">
            {renderSkills()}
          </td>
          <td className="px-6 py-4 w-[350px] text-left">
            {renderAdjacentSkills()}
          </td>
        </>
      )}
      {selectedSkills.length === 0 && (
        <td className="px-6 py-4 w-[140px] text-right text-sm text-muted-foreground">
          {employee.lastUpdated}
        </td>
      )}
    </tr>
  );
};
