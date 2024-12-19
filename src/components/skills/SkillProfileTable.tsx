import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { roleSkills } from './data/roleSkills';
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { ToggledSkillsProvider } from "./context/ToggledSkillsContext";

interface SkillProfileTableProps {
  selectedFunction?: string;
  selectedSkills?: string[];
  selectedJobTitle?: string;
}

const SkillProfileTableContent = ({ 
  selectedFunction, 
  selectedSkills = [], 
  selectedJobTitle 
}: SkillProfileTableProps) => {
  const navigate = useNavigate();
  const { toggledSkills } = useToggledSkills();

  console.log('SkillProfileTable rendering with:', {
    selectedFunction,
    selectedSkills,
    selectedJobTitle,
    toggledSkillsCount: toggledSkills.size
  });

  const filteredRoles = Object.entries(roleSkills)
    .filter(([id, role]) => {
      if (selectedFunction && role.function !== selectedFunction) return false;
      if (selectedJobTitle && role.title !== selectedJobTitle) return false;
      if (selectedSkills.length > 0) {
        const roleSkillTitles = [
          ...role.specialized.map(s => s.title),
          ...role.common.map(s => s.title),
          ...role.certifications.map(s => s.title)
        ];
        return selectedSkills.some(skill => roleSkillTitles.includes(skill));
      }
      return true;
    });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Job Title</TableHead>
            <TableHead>Function</TableHead>
            <TableHead>Total Skills</TableHead>
            <TableHead>Specialized Skills</TableHead>
            <TableHead>Common Skills</TableHead>
            <TableHead>Certifications</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoles.map(([id, role]) => (
            <TableRow 
              key={id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(`/skills/${id}`)}
            >
              <TableCell className="font-medium">{role.title}</TableCell>
              <TableCell>{role.function || 'Engineering'}</TableCell>
              <TableCell>
                {role.specialized.length + role.common.length + role.certifications.length}
              </TableCell>
              <TableCell>{role.specialized.length}</TableCell>
              <TableCell>{role.common.length}</TableCell>
              <TableCell>{role.certifications.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const SkillProfileTable = (props: SkillProfileTableProps) => {
  return (
    <ToggledSkillsProvider>
      <SkillProfileTableContent {...props} />
    </ToggledSkillsProvider>
  );
};