import { Employee } from "../types/employeeTypes";
import { getSkillProfileId, getLevel } from "../EmployeeTable";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { roleSkills } from "../skills/data/roleSkills";
import { EmployeeBasicInfo } from "./table/EmployeeBasicInfo";
import { EmployeeSkillMatch } from "./table/EmployeeSkillMatch";
import { EmployeeBenchmark } from "./table/EmployeeBenchmark";
import { useEmployeeSkillsStore } from "./store/employeeSkillsStore";
import { unifiedBenchmarkCalculator } from "../benchmark/analysis/UnifiedBenchmarkCalculator";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { useTrack } from "../skills/context/TrackContext";

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
  const { getTrackForRole } = useTrack();
  const employeeSkills = getEmployeeSkills(employee.id);

  const targetRoleId = selectedJobTitle.length > 0 
    ? getSkillProfileId(selectedJobTitle[0])
    : getSkillProfileId(employee.role);

  const employeeLevel = getLevel(employee.role);
  const track = getTrackForRole(targetRoleId);
  
  console.log('Calculating benchmark for employee:', {
    employeeId: employee.id,
    targetRoleId,
    employeeLevel,
    track,
    skillCount: employeeSkills.length
  });

  const { averagePercentage: benchmark } = unifiedBenchmarkCalculator.calculateBenchmark(
    employeeSkills,
    employeeSkills,
    employeeLevel,
    targetRoleId,
    track || 'Professional',
    getSkillState,
    employee.id
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

  return (
    <tr className={`group border-t border-border hover:bg-muted/50 transition-colors w-full ${
      isExactMatch && selectedJobTitle.length > 0 ? 'bg-blue-50/50' : ''
    }`}>
      <EmployeeBasicInfo 
        id={employee.id}
        name={employee.name}
        role={employee.role}
        imageUrl={imageUrl}
        isExactMatch={isExactMatch}
        selectedJobTitle={selectedJobTitle}
      />
      
      {selectedSkills.length === 0 && (
        <td className="px-6 py-4 w-[150px] text-sm">{employee.department}</td>
      )}
      
      <td className="px-12 py-4 text-center w-[120px]">
        <span className="text-sm text-muted-foreground font-medium">
          {getSkillMatch()}
        </span>
      </td>

      {selectedSkills.length === 0 && (
        <EmployeeBenchmark benchmark={benchmark} />
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