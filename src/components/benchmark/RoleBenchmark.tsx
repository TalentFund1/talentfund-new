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

const getSkillsForRole = (roleId: string): RoleSkills => {
  if (roleId === "AI Engineer: P4") {
    return {
      required: [
        { name: "Machine Learning", level: "advanced" },
        { name: "Deep Learning", level: "advanced" },
        { name: "Computer Vision", level: "advanced" },
        { name: "Natural Language Processing", level: "advanced" }
      ],
      preferred: [
        { name: "TensorFlow", level: "intermediate" },
        { name: "PyTorch", level: "intermediate" }
      ],
      certifications: [
        { name: "AWS Certified Machine Learning - Specialty" },
        { name: "TensorFlow Developer Certificate" },
        { name: "Google Cloud Professional Machine Learning Engineer" }
      ]
    };
  }
  
  // Default fallback skills
  return {
    required: [
      { name: "React", level: "advanced" },
      { name: "JavaScript", level: "advanced" },
      { name: "GraphQL", level: "intermediate" },
      { name: "HTML and CSS3", level: "advanced" },
      { name: "IPA Integrations", level: "intermediate" }
    ],
    preferred: [
      { name: "UI/UX Design Principles", level: "intermediate" },
      { name: "Communication", level: "intermediate" },
      { name: "Angular", level: "beginner" }
    ],
    certifications: [
      { name: "Cybersecurity License" }
    ]
  };
};

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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
  const skills = getSkillsForRole(selectedRole?.title || "");

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
                {selectedRole ? `${selectedRole.title}: ${selectedRole.level}` : "Select role..."}
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