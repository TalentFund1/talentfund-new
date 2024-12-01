import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useSkillsMatrixStore } from "./benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./skills/competency/CompetencyStateReader";
import { calculateBenchmarkPercentage } from "./employee/BenchmarkCalculator";
import { getSkillProfileId, getLevel } from "./EmployeeTable";

interface Skill {
  name: string;
  level: number;
}

interface EmployeeSkillCardProps {
  name: string;
  role: string;
  avatar: string;
  skills: Skill[];
  employeeId: string;
  benchmarkRoleId?: string;
}

export const EmployeeSkillCard = ({ 
  name, 
  role, 
  avatar, 
  skills,
  employeeId,
  benchmarkRoleId 
}: EmployeeSkillCardProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  // Calculate benchmark percentage
  const employeeRoleId = getSkillProfileId(role);
  const employeeLevel = getLevel(role);
  
  const benchmark = calculateBenchmarkPercentage(
    employeeId,
    benchmarkRoleId || employeeRoleId,
    employeeLevel,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  const getBenchmarkColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <img src={avatar} alt={name} className="object-cover" />
          </Avatar>
          <div>
            <h3 className="font-semibold text-primary">{name}</h3>
            <p className="text-sm text-secondary-foreground">{role}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${getBenchmarkColor(benchmark)}`}>
          {Math.round(benchmark)}%
        </span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Skill Match</span>
            <span className="text-sm text-secondary-foreground">
              {skills.length} skills
            </span>
          </div>
          <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1F2144] rounded-full" 
              style={{ width: `${benchmark}%` }} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Competency Match</span>
            <span className="text-sm text-secondary-foreground">
              {skills.length} competencies
            </span>
          </div>
          <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1F2144] rounded-full" 
              style={{ width: `${benchmark}%` }} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Skill Goal Match</span>
            <span className="text-sm text-secondary-foreground">
              {skills.length} goals
            </span>
          </div>
          <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1F2144] rounded-full" 
              style={{ width: `${benchmark}%` }} 
            />
          </div>
        </div>
      </div>
    </Card>
  );
};