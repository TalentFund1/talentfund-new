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

  // Determine which role ID to use for benchmark calculation
  const targetRoleId = selectedJobTitle.length > 0 
    ? getSkillProfileId(selectedJobTitle[0])
    : getSkillProfileId(employee.role);

  const employeeLevel = getLevel(employee.role);
  
  // Calculate benchmark percentage
  const benchmark = calculateBenchmarkPercentage(
    employee.id,
    targetRoleId,
    employeeLevel,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  // Calculate skill match ratio
  const getSkillMatch = () => {
    const employeeSkills = getEmployeeSkills(employee.id);
    const roleData = roleSkills[targetRoleId as keyof typeof roleSkills];
    
    if (!roleData) {
      console.log('No role data found for:', targetRoleId);
      return "0 / 0";
    }

    // Get all required skills for the role
    const requiredRoleSkills = [
      ...roleData.specialized,
      ...roleData.common,
      ...roleData.certifications
    ];

    console.log('Calculating skill match:', {
      employeeName: employee.name,
      roleId: targetRoleId,
      totalRoleSkills: requiredRoleSkills.length,
      employeeSkillsCount: employeeSkills.length
    });

    // Find matching skills without filtering by toggledSkills
    const matchingSkills = requiredRoleSkills.filter(roleSkill => 
      employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
    );

    console.log('Skill match results:', {
      employeeName: employee.name,
      matchingSkills: matchingSkills.map(s => s.title),
      matchCount: matchingSkills.length,
      totalRequired: requiredRoleSkills.length
    });

    return `${matchingSkills.length} / ${requiredRoleSkills.length}`;
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

  console.log('Employee Row Rendering:', {
    employee: employee.name,
    targetRoleId,
    employeeLevel,
    benchmark,
    skillMatch: getSkillMatch(),
    isExactMatch
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
          {getSkillMatch()}
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
          {renderSkills()}
        </td>
      )}
      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};