import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompensationTableHeaderProps {
  track: string;
  onTrackChange: (value: string) => void;
}

export const CompensationTableHeader = ({ track, onTrackChange }: CompensationTableHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Compensation Analysis</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Track:</span>
          <Select value={track} onValueChange={onTrackChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Managerial">Managerial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};