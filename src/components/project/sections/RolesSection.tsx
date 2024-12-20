import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RolesSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRoles: string[];
  onRoleAdd: (role: string) => void;
  onRoleRemove: (role: string) => void;
}

export const RolesSection = ({
  searchTerm,
  setSearchTerm,
  selectedRoles,
  onRoleAdd,
  onRoleRemove,
}: RolesSectionProps) => {
  // These would typically come from an API or database
  const matchingRoles = [
    "Project Manager",
    "UX/UI Designer",
    "Engineering Manager"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-primary">2. Project Roles</h2>
        <p className="text-sm text-primary/60">Add the roles you need for this project.</p>
      </div>

      <div className="relative">
        <Input 
          className="pl-10 border-border focus:border-primary-accent focus:ring-1 focus:ring-primary-accent"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {selectedRoles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-primary">Selected Roles</h3>
          <div className="flex flex-wrap gap-2">
            {selectedRoles.map((role) => (
              <Badge 
                key={role}
                variant="secondary"
                className="bg-primary-accent/10 text-primary border-primary-accent/20 flex items-center gap-1"
              >
                {role}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-primary-accent" 
                  onClick={() => onRoleRemove(role)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-primary">Matching Roles</h3>
        <div className="flex flex-wrap gap-2">
          {matchingRoles.map((role) => (
            <Badge 
              key={role}
              variant="outline"
              className="border-border hover:bg-primary-accent/10 hover:border-primary-accent cursor-pointer transition-colors"
              onClick={() => onRoleAdd(role)}
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};