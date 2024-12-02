import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { SkillBubble } from "../skills/SkillBubble";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getSkillProfileId, getBaseRole, getLevel } from "../EmployeeTable";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { roleSkills } from "../skills/data/roleSkills";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

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
  
  // Get employee's assigned role ID for default comparison
  const employeeRoleId = getSkillProfileId(employee.role);
  const employeeLevel = getLevel(employee.role);
  
  // Use selected role if specified, otherwise use employee's assigned role
  const targetRoleId = selectedJobTitle.length > 0 
    ? getSkillProfileId(selectedJobTitle[0])
    : employeeRoleId;
    
  const isExactMatch = selectedJobTitle.length > 0 && employeeRoleId === targetRoleId;

  const getSkillMatchCount = () => {
    if (selectedSkills.length === 0) {
      // When no skills selected, compare against assigned role skills
      const currentRoleSkills = roleSkills[employeeRoleId as keyof typeof roleSkills];
      if (!currentRoleSkills) {
        console.log('No role skills found for:', employeeRoleId);
        return '0 / 0';
      }

      const allRoleSkills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ].filter(skill => toggledSkills.has(skill.title));

      console.log('Comparing employee skills against role:', {
        employeeName: employee.name,
        roleId: employeeRoleId,
        totalRoleSkills: allRoleSkills.length,
        toggledSkills: Array.from(toggledSkills)
      });

      const matchingSkills = allRoleSkills.filter(roleSkill => {
        const employeeSkill = getEmployeeSkills(employee.id).find(empSkill => empSkill.title === roleSkill.title);
        return employeeSkill !== undefined;
      });

      return `${matchingSkills.length} / ${allRoleSkills.length}`;
    } else {
      // When skills are selected, compare against selected skills
      const employeeSkills = getEmployeeSkills(employee.id);
      const matchingSkills = selectedSkills.filter(skillName => 
        employeeSkills.some(empSkill => empSkill.title === skillName)
      );
      return `${matchingSkills.length} / ${selectedSkills.length}`;
    }
  };

  const getBenchmarkPercentage = () => {
    // Calculate benchmark against assigned role when no role selected
    return calculateBenchmarkPercentage(
      employee.id,
      targetRoleId,
      employeeLevel,
      currentStates,
      toggledSkills,
      getSkillCompetencyState
    );
  };

  const benchmark = getBenchmarkPercentage();
  const skillMatch = getSkillMatchCount();
  const [matchingCount, totalCount] = skillMatch ? skillMatch.split(' / ').map(Number) : [0, 0];
  const isPerfectSkillMatch = matchingCount === totalCount && totalCount > 0;

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
      <div className="flex flex-wrap gap-2 min-w-[300px] px-4">
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

  return (
    <tr className={`group border-t border-border hover:bg-muted/50 transition-colors w-full ${
      isExactMatch && selectedJobTitle.length > 0 ? 'bg-blue-50/50' : ''
    } ${isPerfectSkillMatch && selectedSkills.length > 0 ? 'bg-blue-50/50' : ''}`}>
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
        {skillMatch && (
          <span className="text-sm text-muted-foreground font-medium">
            {skillMatch}
          </span>
        )}
      </td>
      {selectedSkills.length === 0 && (
        <td className="px-4 py-4 text-center w-[120px]">
          {benchmark !== null && benchmark > 0 && (
            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${
              getBenchmarkColor(benchmark)
            }`}>
              {Math.round(benchmark)}%
            </span>
          )}
        </td>
      )}
      {selectedSkills.length > 0 && (
        <td className="px-4 py-4 min-w-[300px]">
          {renderSkills()}
        </td>
      )}
      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};