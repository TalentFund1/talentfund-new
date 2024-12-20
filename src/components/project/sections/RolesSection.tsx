import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface RolesSectionProps {
  selectedRoles: string[];
  onRoleAdd: (role: string) => void;
  onRoleRemove: (role: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const RolesSection = ({
  selectedRoles,
  onRoleAdd,
  onRoleRemove,
  searchQuery,
  onSearchChange
}: RolesSectionProps) => {
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
        <Input 
          className="pl-10 border-border focus:border-primary-accent focus:ring-1 focus:ring-primary-accent"
          placeholder="Search roles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
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
      <Separator className="my-6" />
    </div>
  )
}