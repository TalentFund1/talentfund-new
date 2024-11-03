import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const SkillsHeader = () => {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search Skills..."
        className="max-w-full bg-white rounded-full border-input"
      />
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2">
          Python <span className="text-xs">×</span>
        </Badge>
      </div>
    </div>
  );
};