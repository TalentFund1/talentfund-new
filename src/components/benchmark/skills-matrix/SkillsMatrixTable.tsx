import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { SkillLevelCell } from "../SkillLevelCell";
import { useParams } from "react-router-dom";
import { useEmployeeSkillsStore } from "../../employee/store/employeeSkillsStore";

interface SkillsMatrixTableProps {
  skills: UnifiedSkill[];
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixTable = ({ 
  skills,
  isRoleBenchmark = false 
}: SkillsMatrixTableProps) => {
  const { id: employeeId } = useParams();
  const { getEmployeeSkills } = useEmployeeSkillsStore();

  const employeeSkills = employeeId ? getEmployeeSkills(employeeId) : [];
  
  console.log('Rendering SkillsMatrixTable:', {
    skillCount: skills.length,
    employeeId,
    employeeSkillCount: employeeSkills.length
  });

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Skill</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead className="text-center">Level</TableHead>
            <TableHead className="text-center">Growth</TableHead>
            <TableHead className="text-center">Salary Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell className="font-medium">{skill.title}</TableCell>
              <TableCell>{skill.subcategory}</TableCell>
              <SkillLevelCell
                initialLevel={skill.level}
                skillTitle={skill.title}
                isRoleBenchmark={isRoleBenchmark}
              />
              <TableCell className="text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  parseFloat(skill.growth) > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {skill.growth}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="text-sm text-gray-600">{skill.salary}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};