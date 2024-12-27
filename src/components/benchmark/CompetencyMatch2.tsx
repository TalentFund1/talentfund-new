import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { roleSkills } from "../skills/data/roleSkills";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { EmployeeSkillData } from "../employee/types/employeeSkillTypes";

interface CompetencyMatch2Props {
  employeeId: string;
  roleId: string;
  roleLevel: string;
}

export const CompetencyMatch2 = ({ employeeId, roleId, roleLevel }: CompetencyMatch2Props) => {
  const { toggledSkills } = useToggledSkills();
  const getEmployeeSkills = useEmployeeSkillsStore((state) => state.getEmployeeSkills);
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [matchingSkills, setMatchingSkills] = useState<EmployeeSkillData[]>([]);

  const getLevelValue = (level: string): number => {
    const values: { [key: string]: number } = {
      'advanced': 4,
      'intermediate': 3,
      'beginner': 2,
      'unspecified': 1
    };
    return values[level.toLowerCase()] || 1;
  };

  useEffect(() => {
    const calculateMatch = () => {
      const employeeSkills = getEmployeeSkills(employeeId);
      const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
      
      if (!currentRoleSkills) {
        console.error('No role skills found for:', roleId);
        return;
      }

      const allRoleSkills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ];

      const toggledRoleSkills = allRoleSkills.filter(skill => 
        toggledSkills.has(skill.title)
      );

      console.log('Comparing skills:', {
        employeeSkillsCount: employeeSkills.length,
        toggledRoleSkillsCount: toggledRoleSkills.length
      });

      const matching = employeeSkills.filter(empSkill => {
        const roleSkill = toggledRoleSkills.find(rs => rs.title === empSkill.title);
        if (!roleSkill) return false;

        const employeeLevelValue = getLevelValue(empSkill.level);
        const roleLevelValue = getLevelValue(roleSkill.level);

        console.log('Skill level comparison:', {
          skill: empSkill.title,
          employeeLevel: empSkill.level,
          roleLevel: roleSkill.level,
          employeeLevelValue,
          roleLevelValue
        });

        // If role level is unspecified, any employee level is considered a match
        if (roleSkill.level.toLowerCase() === 'unspecified') {
          return true;
        }

        return employeeLevelValue >= roleLevelValue;
      });

      const percentage = toggledRoleSkills.length > 0
        ? (matching.length / toggledRoleSkills.length) * 100
        : 0;

      console.log('Match calculation result:', {
        matchingSkills: matching.length,
        totalSkills: toggledRoleSkills.length,
        percentage
      });

      setMatchingSkills(matching);
      setMatchPercentage(Math.round(percentage));
    };

    calculateMatch();
  }, [employeeId, roleId, roleLevel, toggledSkills, getEmployeeSkills]);

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Competency Match</h3>
        <p className="text-sm text-muted-foreground">
          {matchingSkills.length} skills matching required levels
        </p>
      </div>
      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-500"
          style={{ width: `${matchPercentage}%` }}
        />
      </div>
      <p className="text-sm font-medium">{matchPercentage}% match</p>
    </Card>
  );
};