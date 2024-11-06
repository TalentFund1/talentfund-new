import { ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const SkillProfileTableHeader = () => {
  return (
    <thead>
      <tr className="bg-background text-left">
        <th className="py-3 px-4 font-medium w-[25%]">Skill Title</th>
        <th className="py-3 px-4 font-medium w-[30%]">Subcategory</th>
        <th className="py-3 px-4 font-medium text-center w-[15%]">Projected Growth</th>
        <th className="py-3 px-4 font-medium text-right w-[15%]">Salary With Skill</th>
        <th className="py-3 px-4 font-medium text-center w-[15%]">Benchmark</th>
      </tr>
    </thead>
  );
};