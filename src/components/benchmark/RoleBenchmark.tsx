import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { SkillSection } from "./SkillSection";
import { technicalLevels, managerialLevels, requiredSkills, preferredSkills, certifications } from "./constants";

const RoleBenchmark = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [roleType, setRoleType] = useState<"technical" | "managerial">("technical");
  const [selectedRole, setSelectedRole] = useState("senior-frontend");

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

  const handleRoleTypeChange = (value: "technical" | "managerial") => {
    setRoleType(value);
    setSelectedRole(value === "technical" ? "senior-frontend" : "engineering-manager");
    
    toast({
      title: "Role Type Updated",
      description: `Switched to ${value === "technical" ? "Technical" : "Managerial"} track`,
    });
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
        
        <div className="flex items-center gap-4 w-full max-w-[800px]">
          <Select value={roleType} onValueChange={handleRoleTypeChange}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Select Role Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical Track</SelectItem>
              <SelectItem value="managerial">Managerial Track</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roleType === "technical" ? (
                <>
                  <SelectItem value="senior-frontend">Senior Frontend Engineer: P4</SelectItem>
                  <SelectItem value="lead-frontend">Lead Frontend Engineer: P5</SelectItem>
                  <SelectItem value="principal">Principal Engineer: P6</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="engineering-manager">Engineering Manager: M3</SelectItem>
                  <SelectItem value="senior-manager">Senior Engineering Manager: M4</SelectItem>
                  <SelectItem value="director">Engineering Director: M5</SelectItem>
                  <SelectItem value="vp">VP of Engineering: M6</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          <SkillSection 
            title="Required Skills"
            items={requiredSkills}
            getLevelStyles={getLevelStyles}
            getLevelDot={getLevelDot}
          />
          <SkillSection 
            title="Preferred Skills"
            items={preferredSkills}
            getLevelStyles={getLevelStyles}
            getLevelDot={getLevelDot}
          />
          <SkillSection 
            title="Certifications"
            items={certifications}
            getLevelStyles={getLevelStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleBenchmark;