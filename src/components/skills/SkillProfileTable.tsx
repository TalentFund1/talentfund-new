import { useState } from "react";
import { SkillProfileTableContent } from "./table/SkillProfileTableContent";
import { roleSkills } from './data/roleSkills';
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { TrackProvider } from "./context/TrackContext";

interface SkillProfileTableProps {
  selectedFunction?: string;
  selectedSkills: string[];
  selectedJobTitle?: string;
}

const SkillProfileTableInner = ({ 
  selectedFunction,
  selectedSkills,
  selectedJobTitle 
}: SkillProfileTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { toggledSkills } = useToggledSkills();

  console.log('SkillProfileTable - Initializing with:', {
    selectedFunction,
    selectedSkills,
    selectedJobTitle,
    toggledSkillsCount: toggledSkills.size
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

  const rows = Object.entries(roleSkills).map(([id, role]) => {
    const toggledSkillsCount = Array.from(toggledSkills).filter(skillTitle => {
      const allRoleSkills = [
        ...(role.specialized || []),
        ...(role.common || []),
        ...(role.certifications || [])
      ];
      return allRoleSkills.some(s => s.title === skillTitle);
    }).length;

    return {
      id,
      name: role.title,
      function: role.function || "Engineering",
      skillCount: String(toggledSkillsCount),
      employees: "0",
      matches: "0%",
      lastUpdated: "10/20/24"
    };
  });

  const filteredRows = rows.filter(row => {
    const matchesFunction = !selectedFunction || row.function.toLowerCase() === selectedFunction.toLowerCase();
    const matchesJobTitle = !selectedJobTitle || row.name.toLowerCase() === selectedJobTitle.toLowerCase();
    
    const roleData = roleSkills[row.id as keyof typeof roleSkills];
    const allProfileSkills = [
      ...(roleData.specialized || []),
      ...(roleData.common || []),
      ...(roleData.certifications || [])
    ];
    
    const hasSelectedSkills = selectedSkills.length === 0 || selectedSkills.some(skill => 
      allProfileSkills.some(profileSkill => 
        profileSkill.title.toLowerCase().includes(skill.toLowerCase())
      )
    );

    return matchesFunction && matchesJobTitle && hasSelectedSkills;
  });

  console.log('SkillProfileTable - Filtered rows:', {
    total: rows.length,
    filtered: filteredRows.length,
    selectedRows: selectedRows.length
  });

  return (
    <SkillProfileTableContent
      rows={filteredRows}
      selectedRows={selectedRows}
      onSelectRow={handleSelectRow}
      onSelectAll={handleSelectAll}
    />
  );
};

export const SkillProfileTable = (props: SkillProfileTableProps) => {
  return (
    <TrackProvider>
      <SkillProfileTableInner {...props} />
    </TrackProvider>
  );
};