import { Employee } from "../types/employeeTypes";
import { getSkillProfileId, getLevel } from "../EmployeeTable";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";
import { roleSkills } from "../skills/data/roleSkills";
import { EmployeeBasicInfo } from "./table/EmployeeBasicInfo";
import { EmployeeSkillMatch } from "./table/EmployeeSkillMatch";
import { EmployeeBenchmark } from "./table/EmployeeBenchmark";
import { useEmployeeSkillsStore } from "./store/employeeSkillsStore";

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
  const { getSkillState } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const competencyReader = useCompetencyStateReader();
  const { getEmployeeSkills } = useEmployeeSkillsStore();
  const employeeSkills = getEmployeeSkills(employee.id);

  const targetRoleId = selectedJobTitle.length > 0 
    ? getSkillProfileId(selectedJobTitle[0])
    : getSkillProfileId(employee.role);

  const employeeLevel = getLevel(employee.role);
  
  const benchmark = calculateBenchmarkPercentage(
    employee.id,
    targetRoleId,
    employeeLevel,
    employeeSkills,
    toggledSkills,
    competencyReader
  );

  const getSkillMatches = () => {
    console.log('Calculating skill matches for employee:', employee.id);
    const employeeSkills = getEmployeeSkills(employee.id);
    const allRoleSkills = selectedSkills.length > 0 
      ? selectedSkills 
      : getRoleSkills(targetRoleId);

    console.log('Role skills:', {
      employeeId: employee.id,
      roleSkillsCount: allRoleSkills.length,
      employeeSkillsCount: employeeSkills.length
    });

    const matchingSkills = employeeSkills.filter(empSkill => 
      allRoleSkills.some(roleSkill => 
        typeof roleSkill === 'string' 
          ? roleSkill === empSkill.title 
          : roleSkill.title === empSkill.title
      )
    );

    const competencyMatchingSkills = matchingSkills.filter(skill => {
      const employeeSkillLevel = skill.level;
      const roleSkillLevel = competencyReader.getSkillCompetencyState(
        skill.title,
        employeeLevel,
        targetRoleId
      )?.level?.toLowerCase() || 'unspecified';

      return employeeSkillLevel !== 'unspecified';
    });

    console.log('Skill matches calculated:', {
      employeeId: employee.id,
      totalSkills: allRoleSkills.length,
      matchingSkills: matchingSkills.length,
      competencyMatches: competencyMatchingSkills.length
    });

    return {
      skillMatch: `${matchingSkills.length}/${allRoleSkills.length}`,
      competencyMatch: `${competencyMatchingSkills.length}/${allRoleSkills.length}`
    };
  };

  const { skillMatch, competencyMatch } = getSkillMatches();

  const isExactRoleMatch = selectedJobTitle.length > 0 && 
    getSkillProfileId(employee.role) === getSkillProfileId(selectedJobTitle[0]);

  return (
    <tr className={`group border-t border-border hover:bg-muted/50 transition-colors w-full ${
      isExactRoleMatch && selectedJobTitle.length > 0 ? 'bg-blue-50/50' : ''
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
          <span className="text-sm">{employee.name}</span>
        </div>
      </td>
      
      <td className={`px-6 py-4 ${selectedSkills.length > 0 ? 'w-[600px]' : 'w-[350px]'}`}>
        <span className="text-sm">{employee.role}</span>
      </td>

      {selectedSkills.length === 0 && (
        <td className="px-6 py-4 w-[150px] text-sm">{employee.department}</td>
      )}
      
      <td className="px-12 py-4 text-center w-[120px]">
        <span className="text-sm text-muted-foreground font-medium">
          {skillMatch}
        </span>
      </td>

      <td className="px-12 py-4 text-center w-[120px]">
        <span className="text-sm text-muted-foreground font-medium">
          {competencyMatch}
        </span>
      </td>

      {!selectedSkills.length && (
        <td className="px-6 py-4 text-center w-[120px]">
          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${
            benchmark >= 90 ? 'bg-green-100 text-green-800' :
            benchmark >= 70 ? 'bg-orange-100 text-orange-800' :
            'bg-red-100 text-red-800'
          }`}>
            {Math.round(benchmark)}%
          </span>
        </td>
      )}

      {selectedSkills.length > 0 && (
        <EmployeeSkillMatch 
          employeeId={employee.id}
          selectedSkills={selectedSkills}
        />
      )}

      {selectedSkills.length === 0 && (
        <td className="px-6 py-4 w-[140px] text-right text-sm text-muted-foreground">
          {employee.lastUpdated}
        </td>
      )}
    </tr>
  );
};

const getRoleSkills = (roleId: string) => {
  const roleData = roleSkills[roleId as keyof typeof roleSkills];
  if (!roleData) return [];
  
  return [
    ...roleData.specialized,
    ...roleData.common,
    ...roleData.certifications
  ];
};