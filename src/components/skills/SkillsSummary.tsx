import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SearchFilter } from "@/components/market/SearchFilter";

export const SkillsSummary = () => {
  const SkillSection = ({ title, count }: { title: string; count: number }) => (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {count}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* Empty state - no skills displayed */}
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">Skills Summary</h3>
      
      <div className="mb-4">
        <div className="space-y-2">
          <SearchFilter
            label=""
            placeholder="Search skills..."
            items={[]}
            selectedItems={[]}
            onItemsChange={() => {}}
            singleSelect={false}
          />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <SkillSection title="Specialized Skills" count={0} />
        <SkillSection title="Common Skills" count={0} />
        <SkillSection title="Certifications" count={0} />
      </div>
    </div>
  );
};
