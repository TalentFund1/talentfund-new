import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPastFiveYears, getCurrentMonthYear } from "./utils/dateUtils";

export const TimeframeSection = () => {
  const timeframeOptions = getPastFiveYears();
  const defaultStartDate = "Oct 2023";
  const defaultEndDate = "Oct 2024";

  return (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">Timeframe</label>
      <div className="flex items-center gap-2">
        <Select defaultValue={defaultStartDate}>
          <SelectTrigger className="w-[120px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeframeOptions.map((date) => (
              <SelectItem key={date} value={date}>{date}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm">to</span>
        <Select defaultValue={defaultEndDate}>
          <SelectTrigger className="w-[120px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeframeOptions.map((date) => (
              <SelectItem key={date} value={date}>{date}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};