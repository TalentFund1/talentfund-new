import { TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useParams } from "react-router-dom";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { useToast } from "@/hooks/use-toast";

interface SkillsMatrixRowProps {
  skill: UnifiedSkill;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixRow = ({ skill, isRoleBenchmark = false }: SkillsMatrixRowProps) => {
  const { id } = useParams();
  const { toast } = useToast();
  const { getSkillState, updateSkillState } = useEmployeeSkillsStore();
  const { setHasChanges } = useSkillsMatrixStore();

  console.log('SkillsMatrixRow - Rendering for skill:', {
    skillTitle: skill.title,
    isRoleBenchmark
  });

  const handleDevelopmentPlanChange = (checked: boolean) => {
    if (!id) return;

    const currentState = getSkillState(id, skill.title);
    console.log('Current skill state:', currentState);

    if (checked) {
      // Adding to development plan
      updateSkillState(id, skill.title, {
        ...currentState,
        inDevelopmentPlan: true,
        source: 'checkbox',
        level: currentState.level || 'unspecified',
        goalStatus: currentState.goalStatus || 'unknown'
      });
      setHasChanges(true);
      toast({
        title: "Added to Development Plan",
        description: `${skill.title} has been added to your development plan.`
      });
    } else {
      // Removing from development plan
      if (
        currentState.level === 'unspecified' &&
        currentState.source === 'checkbox' &&
        currentState.goalStatus === 'unknown'
      ) {
        // Complete removal case
        updateSkillState(id, skill.title, {
          inDevelopmentPlan: false,
          level: 'unspecified',
          source: undefined,
          goalStatus: 'unknown'
        });
        toast({
          title: "Removed from Development Plan",
          description: `${skill.title} has been removed from your development plan.`
        });
      } else {
        // Keep skill case
        updateSkillState(id, skill.title, {
          ...currentState,
          inDevelopmentPlan: false
        });
        toast({
          title: "Removed from Development Plan",
          description: `${skill.title} has been removed from your development plan.`
        });
      }
      setHasChanges(true);
    }
  };

  const skillState = id ? getSkillState(id, skill.title) : null;

  return (
    <TableRow>
      <TableCell className="font-medium">{skill.title}</TableCell>
      <TableCell>{skill.subcategory}</TableCell>
      {!isRoleBenchmark && (
        <TableCell className="text-center">
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Company
          </span>
        </TableCell>
      )}
      <TableCell className="text-center">
        <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          skill.level === 'advanced' ? 'bg-green-100 text-green-800' :
          skill.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
          skill.level === 'beginner' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          High
        </span>
      </TableCell>
      {isRoleBenchmark && (
        <TableCell className="text-center">
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ↗ {skill.growth}
          </span>
        </TableCell>
      )}
      <TableCell className="text-center">
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {skill.salary}
        </span>
      </TableCell>
      {isRoleBenchmark && (
        <TableCell className="text-center">
          <Switch
            checked={skillState?.inDevelopmentPlan || false}
            onCheckedChange={handleDevelopmentPlanChange}
          />
        </TableCell>
      )}
      <TableCell className="text-center">
        <div className="flex justify-center gap-1">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium">B</span>
          <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-xs font-medium">R</span>
          <span className="w-6 h-6 rounded-full bg-[#E5DEFF] text-[#6E59A5] flex items-center justify-center text-xs font-medium">M</span>
        </div>
      </TableCell>
    </TableRow>
  );
};
