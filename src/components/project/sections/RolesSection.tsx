import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    "Credit Analysis",
    "Due diligence",
    "Leadership",
    "Market Research",
    "Contract Negotiation",
    "Supply Chain Management",
    "Risk Management",
    "Database Management",
    "iOS Developer"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-primary">2. Project Roles</h2>
        <p className="text-sm text-primary/60">Add the roles you need for this project.</p>
      </div>

      <div className="relative">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-4 border-border focus:border-primary-accent focus:ring-1 focus:ring-primary-accent bg-[#F7F9FF]"
          placeholder="Search roles..."
        />
      </div>

      {selectedRoles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-primary">Selected Roles</h3>
          <div className="flex flex-wrap gap-2">
            {selectedRoles.map((role) => (
              <Badge
                key={role}
                variant="outline"
                className="bg-[#F7F9FF] text-primary border-[#E5E7EB] hover:bg-[#F7F9FF]/80 flex items-center gap-1.5 px-3 py-1.5 h-8 text-sm rounded-md"
              >
                {role}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-primary-accent"
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
            <Button
              key={role}
              variant="outline"
              className="bg-[#F7F9FF] hover:bg-[#F7F9FF]/80 text-primary border-[#E5E7EB] flex items-center gap-1.5 px-3 py-1.5 h-8 font-normal text-sm rounded-md"
              onClick={() => onRoleAdd(role)}
            >
              <Plus className="h-3.5 w-3.5" />
              {role}
            </Button>
          ))}
        </div>
      </div>
      <Separator className="my-8 bg-[#CCDBFF]" />
    </div>
  );
};