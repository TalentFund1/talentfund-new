import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { roles } from "./data/rolesData";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoleDetails } from "./RoleDetails";

const RoleBenchmark = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedRole = value ? roles.find((role) => role.id === value) : null;

  const handleSkillProfileClick = () => {
    if (selectedRole) {
      const roleId = selectedRole.id.split('-')[1]; // Extract the numeric part
      navigate(`/skills/${roleId}`);
    } else {
      navigate('/skills');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
          <Button 
            variant="outline" 
            className="bg-[#F7F9FF] text-[#1F2144] hover:bg-[#F7F9FF]/90 border border-[#CCDBFF]"
            onClick={handleSkillProfileClick}
          >
            See Skill Profile
          </Button>
        </div>

        <div className="w-full max-w-[800px]">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-white"
              >
                {selectedRole ? `${selectedRole.title}: ${selectedRole.level}` : "Search skill profiles..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search skill profiles..." />
                <CommandList>
                  <CommandEmpty>No profiles found.</CommandEmpty>
                  <CommandGroup>
                    {roles.map((role) => (
                      <CommandItem
                        key={role.id}
                        onSelect={() => {
                          setValue(role.id === value ? "" : role.id);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === role.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {role.title}: {role.level}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Separator className="my-6" />

        {selectedRole && <RoleDetails role={selectedRole} />}
      </div>
    </div>
  );
};

export default RoleBenchmark;