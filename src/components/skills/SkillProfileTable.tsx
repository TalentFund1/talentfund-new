import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { roleSkills } from './data/roleSkills';
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { ToggledSkillsProvider } from "./context/ToggledSkillsContext";
import { getSkillProfileId } from "../EmployeeTable";
import { getUnifiedSkillData } from './data/skillDatabaseService';
import { normalizeSkillTitle } from './utils/normalization';

interface SkillProfileTableProps {
  selectedFunction: string;
  selectedSkills?: string[];
  selectedJobTitle: string;
}

const SkillProfileTableContent = ({ 
  selectedFunction,
  selectedSkills = [],
  selectedJobTitle
}: SkillProfileTableProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();

  const filteredProfiles = Object.entries(roleSkills)
    .filter(([_, profile]) => {
      if (selectedFunction && profile.function !== selectedFunction) {
        return false;
      }
      if (selectedJobTitle && profile.title !== selectedJobTitle) {
        return false;
      }
      if (selectedSkills.length > 0) {
        const profileSkills = [
          ...profile.specialized.map(s => normalizeSkillTitle(s.title)),
          ...profile.common.map(s => normalizeSkillTitle(s.title)),
          ...profile.certifications.map(s => normalizeSkillTitle(s.title))
        ];
        return selectedSkills.every(skill => 
          profileSkills.includes(normalizeSkillTitle(skill))
        );
      }
      return true;
    });

  const calculateBenchmark = (roleId: string, level: string) => {
    return calculateBenchmarkPercentage(
      "profile",
      roleId,
      level,
      currentStates
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="font-semibold">Job Title</TableHead>
            <TableHead className="font-semibold">Function</TableHead>
            <TableHead className="font-semibold">Level</TableHead>
            <TableHead className="font-semibold">Required Skills</TableHead>
            <TableHead className="font-semibold text-right">Growth</TableHead>
            <TableHead className="font-semibold text-right">Salary Range</TableHead>
            <TableHead className="font-semibold text-center">Benchmark</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProfiles.map(([id, profile]) => {
            const benchmark = calculateBenchmark(id, "p4");
            const skillCount = [
              ...profile.specialized,
              ...profile.common,
              ...profile.certifications
            ].length;

            return (
              <TableRow key={id} className="hover:bg-muted/5">
                <TableCell className="font-medium">{profile.title}</TableCell>
                <TableCell>{profile.function || 'N/A'}</TableCell>
                <TableCell>{profile.level || "All Levels"}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {skillCount} skills
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-green-100 text-green-800">
                    ↗ {profile.growth || "0%"}
                  </span>
                </TableCell>
                <TableCell className="text-right">{profile.salary || "N/A"}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${
                    benchmark >= 90 ? 'bg-green-100 text-green-800' :
                    benchmark >= 70 ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {Math.round(benchmark)}%
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
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
