import { SkillBubble } from "../../skills/SkillBubble";

interface BenchmarkCellProps {
  benchmark: number;
  selectedSkills: string[];
  employeeSkills: any[];
  getSkillCompetencyState: any;
  currentStates: any;
}

export const BenchmarkCell = ({ 
  benchmark, 
  selectedSkills,
  employeeSkills,
  getSkillCompetencyState,
  currentStates
}: BenchmarkCellProps) => {
  const renderContent = () => {
    if (selectedSkills.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 min-w-[300px] px-4">
          {selectedSkills.map(skillName => {
            const employeeSkill = employeeSkills.find(s => s.title === skillName);
            if (!employeeSkill) return null;

            const competencyState = getSkillCompetencyState(skillName);
            const skillState = currentStates[skillName];
            const isSkillGoal = skillState?.requirement === 'required' || 
                               skillState?.requirement === 'skill_goal';
            
            return (
              <SkillBubble
                key={skillName}
                skill={{ name: skillName }}
                showLevel={true}
                level={competencyState?.level || employeeSkill.level}
                isRoleBenchmark={true}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <span className={`px-2.5 py-1 rounded-full text-sm ${
          benchmark >= 80 
            ? 'bg-green-100 text-green-800' 
            : benchmark >= 60
            ? 'bg-orange-100 text-orange-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {benchmark}%
        </span>
      </div>
    );
  };

  return (
    <td className="py-4 w-[200px] text-center">
      {renderContent()}
    </td>
  );
};