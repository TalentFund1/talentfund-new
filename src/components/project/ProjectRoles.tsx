import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectRolesProps {
  selectedRoles: string[];
  onChange: (roles: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const availableRoles = [
  "iOS Developer",
  "Project Manager",
  "UI/UX Designer",
  "Engineering Manager",
  "Backend Engineer",
  "Frontend Developer"
];

export const ProjectRoles = ({ selectedRoles, onChange, onNext, onBack }: ProjectRolesProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = availableRoles.filter(role => 
    role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleToggle = (role: string) => {
    if (selectedRoles.includes(role)) {
      onChange(selectedRoles.filter(r => r !== role));
    } else {
      onChange([...selectedRoles, role]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">2. Add Project Roles</h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {selectedRoles.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Selected Roles</h3>
            <div className="flex flex-wrap gap-2">
              {selectedRoles.map(role => (
                <Badge
                  key={role}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleRoleToggle(role)}
                >
                  {role} ×
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Matching Roles</h3>
          <div className="flex flex-wrap gap-2">
            {filteredRoles
              .filter(role => !selectedRoles.includes(role))
              .map(role => (
                <Badge
                  key={role}
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => handleRoleToggle(role)}
                >
                  {role}
                </Badge>
              ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};