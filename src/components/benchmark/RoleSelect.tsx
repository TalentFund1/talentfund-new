import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roleProfiles } from "./data/roleProfiles";

interface RoleSelectProps {
  selectedRole: string;
  onRoleChange: (value: string) => void;
}

export const RoleSelect = ({ selectedRole, onRoleChange }: RoleSelectProps) => (
  <div className="w-full max-w-[800px]">
    <Select value={selectedRole} onValueChange={onRoleChange}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(roleProfiles).flatMap(([role, profiles]) =>
          Object.entries(profiles).map(([level, { title }]) => (
            <SelectItem key={`${role}-${level}`} value={`${role}-${level}`}>{title}</SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  </div>
);