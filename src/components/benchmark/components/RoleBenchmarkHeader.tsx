import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface RoleBenchmarkHeaderProps {
  selectedRole: string;
  selectedLevel: string;
  roles: Record<string, string>;
  levels: string[];
  onRoleChange: (value: string) => void;
  onLevelChange: (value: string) => void;
}

export const RoleBenchmarkHeader = ({
  selectedRole,
  selectedLevel,
  roles,
  levels,
  onRoleChange,
  onLevelChange
}: RoleBenchmarkHeaderProps) => {
  const navigate = useNavigate();

  const handleSeeSkillProfile = () => {
    navigate(`/skills/${selectedRole}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
        <Button 
          variant="outline" 
          className="bg-[#F7F9FF] text-[#1F2144] hover:bg-[#F7F9FF]/90 border border-[#CCDBFF]"
          onClick={handleSeeSkillProfile}
        >
          See Skill Profile
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <Select 
          value={selectedRole}
          onValueChange={onRoleChange}
        >
          <SelectTrigger className="w-[400px] bg-white">
            <SelectValue placeholder="Select Role">
              {roles[selectedRole]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(roles).map(([id, title]) => (
              <SelectItem key={id} value={id}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={selectedLevel}
          onValueChange={onLevelChange}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};