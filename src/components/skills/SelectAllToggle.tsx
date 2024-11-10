import { Switch } from "@/components/ui/switch";

interface SelectAllToggleProps {
  isAllSelected: boolean;
  onToggleAll: () => void;
}

export const SelectAllToggle = ({ isAllSelected, onToggleAll }: SelectAllToggleProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Switch 
        checked={isAllSelected}
        onCheckedChange={onToggleAll}
      />
      <span className="text-sm font-medium">Select All Skills</span>
    </div>
  );
};