import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SkillLevelCell } from "../SkillLevelCell";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { BaseSkill } from "@/components/skills/types";

interface SkillsMatrixTableProps {
  filteredSkills: BaseSkill[];
  setHasChanges: (hasChanges: boolean) => void;
}

export const SkillsMatrixTable = ({ filteredSkills, setHasChanges }: SkillsMatrixTableProps) => {
  const { currentStates, setSkillState } = useSkillsMatrixStore();

  const handleSkillUpdate = (skillTitle: string, level: string, requirement: string) => {
    setSkillState(skillTitle, level, requirement);
    setHasChanges(true);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Skill Title</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Company Skill</TableHead>
            <TableHead>Skill Level</TableHead>
            <TableHead>Confidence Score</TableHead>
            <TableHead>Projected Growth</TableHead>
            <TableHead>Appears In</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSkills.map((skill) => (
            <TableRow key={skill.title}>
              <TableCell className="font-medium">{skill.title}</TableCell>
              <TableCell>{skill.subcategory}</TableCell>
              <TableCell>
                {skill.isCompanySkill ? "✓" : ""}
              </TableCell>
              <TableCell>
                <SkillLevelCell
                  skillTitle={skill.title}
                  initialLevel={currentStates[skill.title]?.level || skill.level}
                  initialRequirement={currentStates[skill.title]?.requirement || skill.requirement}
                  onUpdate={handleSkillUpdate}
                />
              </TableCell>
              <TableCell>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  High
                </span>
              </TableCell>
              <TableCell>
                <span className="text-green-600">↑ 30%</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">R</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">E</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">M</span>
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">S</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};