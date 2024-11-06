import { Switch } from "@/components/ui/switch";

interface Skill {
  title: string;
  subcategory: string;
  growth: string;
  salary: string;
  benchmarks: {
    J: boolean;
    B: boolean;
    O: boolean;
  };
}

interface SkillProfileTableRowProps {
  skill: Skill;
}

export const SkillProfileTableRow = ({ skill }: SkillProfileTableRowProps) => {
  return (
    <tr className="border-t border-border hover:bg-muted/50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <Switch />
          <span className="text-sm">{skill.title}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm">
        <span className="block truncate" title={skill.subcategory}>
          {skill.subcategory}
        </span>
      </td>
      <td className="py-3 px-4 text-center">
        <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm">
          ↗ {skill.growth}
        </span>
      </td>
      <td className="py-3 px-4 text-right text-sm">{skill.salary}</td>
      <td className="py-3 px-4">
        <div className="flex justify-center gap-1">
          <span className="w-6 h-6 rounded-full bg-[#8073ec]/20 text-primary flex items-center justify-center text-sm font-medium">J</span>
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">B</span>
          <span className="w-6 h-6 rounded-full bg-primary-icon/10 text-primary-icon flex items-center justify-center text-sm font-medium">O</span>
        </div>
      </td>
    </tr>
  );
};