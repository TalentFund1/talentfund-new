import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { roles } from "./data/rolesData";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RequiredSkillsSection } from "./sections/RequiredSkillsSection";
import { PreferredSkillsSection } from "./sections/PreferredSkillsSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { RoleSkills } from "./types";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

const getSkillsForRole = (roleId: string): RoleSkills => {
  const roleLevel = roleId.split(": ")[1];
  
  if (roleId.includes("AI Engineer")) {
    if (roleLevel === "P4") {
      return {
        required: [
          { name: "Machine Learning", level: "advanced" },
          { name: "Deep Learning", level: "advanced" },
          { name: "Python", level: "advanced" },
          { name: "TensorFlow", level: "advanced" },
          { name: "Natural Language Processing", level: "advanced" },
          { name: "Computer Vision", level: "advanced" }
        ],
        preferred: [
          { name: "AWS", level: "intermediate" },
          { name: "PyTorch", level: "intermediate" },
          { name: "Problem Solving", level: "intermediate" },
          { name: "Technical Writing", level: "intermediate" },
          { name: "Data Engineering", level: "intermediate" }
        ],
        certifications: [
          { name: "AWS Certified Machine Learning - Specialty" },
          { name: "TensorFlow Developer Certificate" },
          { name: "Google Cloud Professional Machine Learning Engineer" }
        ]
      };
    } else if (roleLevel === "P3") {
      return {
        required: [
          { name: "Machine Learning", level: "intermediate" },
          { name: "Python", level: "intermediate" },
          { name: "Deep Learning", level: "intermediate" },
          { name: "Natural Language Processing", level: "intermediate" }
        ],
        preferred: [
          { name: "AWS", level: "beginner" },
          { name: "TensorFlow", level: "beginner" },
          { name: "Problem Solving", level: "intermediate" }
        ],
        certifications: [
          { name: "AWS Certified Developer - Associate" },
          { name: "Google Cloud Professional Machine Learning Engineer" }
        ]
      };
    }
  }
  
  return {
    required: [],
    preferred: [],
    certifications: []
  };
};

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { setCurrentRole } = useSkillsMatrixStore();

  const handleRoleSelect = (roleId: string) => {
    setValue(roleId);
    setOpen(false);
    setCurrentRole(roleId);
  };

  const getLevelStyles = (level: string) => {
    return "border-[#CCDBFF]";
  };

  const getLevelDot = (level: string) => {
    switch (level) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  const selectedRole = value ? roles.find((role) => role.id === value) : null;
  const skills = selectedRole ? getSkillsForRole(selectedRole?.title || "") : {
    required: [],
    preferred: [],
    certifications: []
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
          <Button 
            variant="outline" 
            className="bg-[#F7F9FF] text-[#1F2144] hover:bg-[#F7F9FF]/90 border border-[#CCDBFF]"
            onClick={() => navigate('/skills')}
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
                {selectedRole ? selectedRole.title : "Select role..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search roles..." />
                <CommandList>
                  <CommandEmpty>No roles found.</CommandEmpty>
                  <CommandGroup>
                    {roles.map((role) => (
                      <CommandItem
                        key={role.id}
                        onSelect={() => handleRoleSelect(role.id)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === role.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {role.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          <RequiredSkillsSection 
            skills={skills.required}
            getLevelStyles={getLevelStyles}
            getLevelDot={getLevelDot}
          />
          <PreferredSkillsSection 
            skills={skills.preferred}
            getLevelStyles={getLevelStyles}
            getLevelDot={getLevelDot}
          />
          <CertificationsSection 
            certifications={skills.certifications}
            getLevelStyles={getLevelStyles}
            getLevelDot={getLevelDot}
          />
        </div>
      </div>
    </div>
  );
};