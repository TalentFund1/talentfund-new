import { Input } from "@/components/ui/input";

interface EmployeeSearchProps {
  onSearch: (query: string) => void;
}

export const EmployeeSearch = ({ onSearch }: EmployeeSearchProps) => {
  return (
    <Input
      placeholder="Search Employee..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full mb-4"
    />
  );
};