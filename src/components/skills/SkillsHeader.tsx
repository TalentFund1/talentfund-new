import { useState } from "react";
import { SearchFilter } from '@/components/market/SearchFilter';
import { getAllSkills } from './data/skills/allSkills';
import { Separator } from "@/components/ui/separator";

export const SkillsHeader = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const allSkills = getAllSkills().map(skill => skill.title);

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col space-y-2">
        <SearchFilter
          label=""
          placeholder="Search Skills..."
          items={allSkills}
          selectedItems={selectedSkills}
          onItemsChange={setSelectedSkills}
        />
      </div>
      <Separator className="my-4" />
    </div>
  );
};