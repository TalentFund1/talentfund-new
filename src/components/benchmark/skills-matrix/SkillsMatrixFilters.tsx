import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsMatrixFiltersProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedRoleRequirement: string;
  setSelectedRoleRequirement: (requirement: string) => void;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixFilters = ({
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedCategory,
  setSelectedCategory,
  selectedRoleRequirement,
  setSelectedRoleRequirement,
  isRoleBenchmark
}: SkillsMatrixFiltersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
        <SelectTrigger>
          <SelectValue placeholder="Select Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="p1">P1 - Entry</SelectItem>
          <SelectItem value="p2">P2 - Developing</SelectItem>
          <SelectItem value="p3">P3 - Career</SelectItem>
          <SelectItem value="p4">P4 - Senior</SelectItem>
          <SelectItem value="p5">P5 - Expert</SelectItem>
          <SelectItem value="p6">P6 - Principal</SelectItem>
          <SelectItem value="m3">M3 - Manager</SelectItem>
          <SelectItem value="m4">M4 - Senior Manager</SelectItem>
          <SelectItem value="m5">M5 - Director</SelectItem>
          <SelectItem value="m6">M6 - Senior Director</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedInterest} onValueChange={setSelectedInterest}>
        <SelectTrigger>
          <SelectValue placeholder="Select Interest" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="development">Development</SelectItem>
          <SelectItem value="management">Management</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="data">Data</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="specialized">Specialized</SelectItem>
          <SelectItem value="common">Common</SelectItem>
          <SelectItem value="certification">Certification</SelectItem>
        </SelectContent>
      </Select>

      {isRoleBenchmark && (
        <Select value={selectedRoleRequirement} onValueChange={setSelectedRoleRequirement}>
          <SelectTrigger>
            <SelectValue placeholder="Select Role Requirement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">Required</SelectItem>
            <SelectItem value="preferred">Preferred</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
