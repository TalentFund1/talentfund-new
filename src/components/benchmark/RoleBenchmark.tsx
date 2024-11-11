import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { roles } from "./data/rolesData";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  level: "advanced" | "intermediate" | "beginner" | "unspecified";
}

const getSkillsForRole = (roleId: string) => {
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
          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Required Skills</span>
                <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                  {skills.required.length}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.required.map((skill) => (
                <Badge 
                  key={skill.name} 
                  variant="outline" 
                  className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles(skill.level)}`}
                >
                  {skill.name}
                  <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Preferred Skills</span>
                <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                  {skills.preferred.length}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.preferred.map((skill) => (
                <Badge 
                  key={skill.name} 
                  variant="outline" 
                  className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles(skill.level)}`}
                >
                  {skill.name}
                  <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Certifications</span>
                <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                  {skills.certifications.length}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.certifications.map((cert) => (
                <Badge 
                  key={cert.name}
                  variant="outline" 
                  className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors"
                >
                  {cert.name}
                  <div className={`h-2 w-2 rounded-full ${getLevelDot("advanced")}`} />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};