import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SkillsMatrixHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
        <Select defaultValue="modify">
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Modify As" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modify">Modify As</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="bg-white">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};