import { Link } from "react-router-dom";
import { Employee } from "../types/employeeTypes";
import { getSkillProfileId, getBaseRole } from "../EmployeeTable";
import { SkillBubble } from "../skills/SkillBubble";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

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

  const roleId = selectedJobTitle.length > 0 
    ? getSkillProfileId(selectedJobTitle[0])
    : getSkillProfileId(employee.role);
    
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  
  const isExactMatch = selectedJobTitle.length > 0 && 
    getBaseRole(employee.role) === selectedJobTitle[0];

  const getMatchingSkillsCount = () => {
    if (selectedSkills.length > 0) {
      const matchingSkills = selectedSkills.filter(skillName => {
        return employeeSkills.some(empSkill => empSkill.title === skillName);
      });
      
      return {
        count: `${matchingSkills.length} / ${selectedSkills.length}`,
        isExactSkillMatch: matchingSkills.length === selectedSkills.length && selectedSkills.length > 0
      };
    }

    if (!currentRoleSkills) return { count: '0 / 0', isExactSkillMatch: false };

    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ].filter(skill => toggledSkills.has(skill.title));

    const matchingSkills = allRoleSkills.filter(roleSkill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
      return employeeSkill !== undefined;
    });

    return {
      count: `${matchingSkills.length} / ${allRoleSkills.length}`,
      isExactSkillMatch: matchingSkills.length === allRoleSkills.length && allRoleSkills.length > 0
    };
  };

  const renderBenchmark = () => {
    if (selectedSkills.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 min-w-[300px] px-4">
          {selectedSkills.map(skillName => {
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
            : 'bg-orange-100 text-orange-800'
        }`}>
          {employee.benchmark}%
        </span>
      </div>
    );
  };

  const { count, isExactSkillMatch } = getMatchingSkillsCount();

  return (
    <tr className="border-t border-border hover:bg-muted/50 transition-colors">
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
            {isExactSkillMatch && selectedSkills.length > 0 && (
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
        <div className="flex items-center gap-2">
          <Link 
            to={`/skills/${roleId}`} 
            className="text-sm text-primary hover:text-primary-accent transition-colors"
          >
            {employee.role}
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
      </td>
      <td className="px-4 py-4 w-[150px] text-sm">{employee.department}</td>
      <td className="px-4 py-4 w-[100px] text-center text-sm">{count}</td>
      <td className="py-4 w-[200px] text-center">
        {renderBenchmark()}
      </td>
      <td className="px-4 py-4 w-[120px] text-right text-sm text-muted-foreground">
        {employee.lastUpdated}
      </td>
    </tr>
  );
};