import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { roles } from "./data/rolesData";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SkillSection } from "@/components/skills/SkillSection";
import { skillsByCategory } from "@/components/skills/competency/skillsData";
import { initialSkills } from "./skills-matrix/initialSkills";

const RoleBenchmark = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedRole = value ? roles.find((role) => role.id === value) : null;

  // Get skills based on selected role
  const getSkillsForRole = () => {
    if (!selectedRole) return { required: [], preferred: [], certifications: [] };

    const [track, level] = selectedRole.id.split('-');
    const isManagerial = selectedRole.track === "Managerial";
    const skillsData = skillsByCategory.all[isManagerial ? 'managerial' : 'professional'][level] || [];
    const certifications = skillsByCategory.certification[isManagerial ? 'managerial' : 'professional'][level] || [];

    return {
      required: skillsData.filter(skill => skill.required === "required"),
      preferred: skillsData.filter(skill => skill.required === "preferred"),
      certifications: certifications
    };
  };

  const { required, preferred, certifications } = getSkillsForRole();

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
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
          <SkillSection title="Required Skills" count={required.length}>
            <div className="flex flex-wrap gap-2">
              {required.map((skill) => (
                <Badge 
                  key={skill.name}
                  variant="outline" 
                  className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors border-[#CCDBFF]"
                >
                  {skill.name}
                  <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
                </Badge>
              ))}
            </div>
          </SkillSection>

          <SkillSection title="Preferred Skills" count={preferred.length}>
            <div className="flex flex-wrap gap-2">
              {preferred.map((skill) => (
                <Badge 
                  key={skill.name}
                  variant="outline" 
                  className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors border-[#CCDBFF]"
                >
                  {skill.name}
                  <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
                </Badge>
              ))}
            </div>
          </SkillSection>

          <SkillSection title="Certifications" count={certifications.length}>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge 
                  key={cert.name}
                  variant="outline" 
                  className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors border-[#CCDBFF]"
                >
                  {cert.name}
                  <div className={`h-2 w-2 rounded-full ${getLevelColor(cert.level)}`} />
                </Badge>
              ))}
            </div>
          </SkillSection>
        </div>
      </div>
    </div>
  );
};

export default RoleBenchmark;