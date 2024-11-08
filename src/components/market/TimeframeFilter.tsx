import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TimeframeFilter = () => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">Timeframe</label>
      <div className="flex items-center gap-2">
        <Select defaultValue="may2023">
          <SelectTrigger className="w-[120px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="may2023">May 2023</SelectItem>
            <SelectItem value="jun2023">Jun 2023</SelectItem>
            <SelectItem value="jul2023">Jul 2023</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm">to</span>
        <Select defaultValue="may2024">
          <SelectTrigger className="w-[120px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="may2024">May 2024</SelectItem>
            <SelectItem value="jun2024">Jun 2024</SelectItem>
            <SelectItem value="jul2024">Jul 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};