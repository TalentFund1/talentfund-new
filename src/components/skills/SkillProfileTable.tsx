import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { roleSkills } from './data/roleSkills';
import { employees } from "../employee/EmployeeData";
import { getBaseRole } from "../EmployeeTable";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { useCompetencyStateReader } from "./competency/CompetencyStateReader";
import { TrackProvider } from "./context/TrackContext";
import { SkillProfileTableContent } from "./table/SkillProfileTableContent";

interface SkillProfileTableProps {
  selectedFunction?: string;
  selectedSkills: string[];
  selectedJobTitle?: string;
}

const SkillProfileTableContent = ({ 
  selectedFunction,
  selectedSkills,
  selectedJobTitle 
}: SkillProfileTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { id } = useParams<{ id: string }>();
  
  const getExactRoleMatches = (roleName: string) => {
    return employees.filter(emp => getBaseRole(emp.role) === roleName).length;
  };

  const calculateAverageBenchmark = (roleId: string, roleName: string) => {
    const matchingEmployees = employees.filter(emp => getBaseRole(emp.role) === roleName);
    if (matchingEmployees.length === 0) return 0;

    const benchmarks = matchingEmployees.map(emp => 
      calculateBenchmarkPercentage(
        emp.id,
        roleId,
        "",
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      )
    );

    const sum = benchmarks.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / benchmarks.length);
  };

  const rows = Object.entries(roleSkills).map(([id, role]) => {
    const allRoleSkills = [
      ...role.specialized,
      ...role.common,
      ...role.certifications
    ];
    
    const toggledSkillsCount = allRoleSkills.filter(skill => 
      toggledSkills.has(skill.title)
    ).length;

    return {
      id,
      name: role.title,
      function: "Engineering",
      skillCount: String(toggledSkillsCount),
      employees: String(getExactRoleMatches(role.title)),
      matches: `${calculateAverageBenchmark(id, role.title)}%`,
      lastUpdated: "10/20/24",
      toggledSkillsCount,
      hasToggledSkills: toggledSkillsCount > 0
    };
  });

  const filteredRows = rows
    .filter(row => {
      const matchesFunction = !selectedFunction || 
        row.function.toLowerCase() === selectedFunction.toLowerCase();
      const matchesJobTitle = !selectedJobTitle || 
        row.name.toLowerCase() === selectedJobTitle.toLowerCase();
      
      const roleData = roleSkills[row.id as keyof typeof roleSkills];
      const allProfileSkills = [
        ...(roleData.specialized || []),
        ...(roleData.common || []),
        ...(roleData.certifications || [])
      ];
      
      const hasSelectedSkills = selectedSkills.length === 0 || 
        selectedSkills.some(skill => 
          allProfileSkills.some(profileSkill => 
            profileSkill.title.toLowerCase().includes(skill.toLowerCase())
          )
        );

      return matchesFunction && matchesJobTitle && hasSelectedSkills;
    })
    .sort((a, b) => {
      // First sort by whether the role has any toggled skills
      if (a.hasToggledSkills !== b.hasToggledSkills) {
        return b.hasToggledSkills ? 1 : -1;
      }
      // Then sort by toggled skills count (descending)
      if (b.toggledSkillsCount !== a.toggledSkillsCount) {
        return b.toggledSkillsCount - a.toggledSkillsCount;
      }
      // Finally sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

  console.log('Filtered and sorted rows:', {
    totalRows: rows.length,
    filteredRows: filteredRows.length,
    firstFewRows: filteredRows.slice(0, 3).map(row => ({
      name: row.name,
      toggledSkillsCount: row.toggledSkillsCount,
      hasToggledSkills: row.hasToggledSkills
    }))
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelection = e.target.checked ? filteredRows.map(row => row.id) : [];
    setSelectedRows(newSelection);
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => {
      const newSelection = prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id];
      return newSelection;
    });
  };

  return (
    <SkillProfileTableContent
      rows={filteredRows}
      selectedRows={selectedRows}
      onSelectAll={handleSelectAll}
      onSelectRow={handleSelectRow}
    />
  );
};

export const SkillProfileTable = (props: SkillProfileTableProps) => {
  return (
    <TrackProvider>
      <SkillProfileTableContent {...props} />
    </TrackProvider>
  );
};