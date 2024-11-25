import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SkillsMatrixHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="All Skills" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="specialized">Specialized Skills</SelectItem>
          <SelectItem value="common">Common Skills</SelectItem>
          <SelectItem value="certification">Certification</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};