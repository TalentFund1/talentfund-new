import { useState } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFilterProps {
  label: string;
  placeholder: string;
  items: string[];
  selectedItems: string[];
  onItemsChange: (items: string[]) => void;
}

export const SearchFilter = ({ 
  label, 
  placeholder, 
  items, 
  selectedItems, 
  onItemsChange 
}: SearchFilterProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (item: string) => {
    if (!selectedItems.includes(item)) {
      onItemsChange([...selectedItems, item]);
    }
    setOpen(false);
  };

  const removeItem = (item: string) => {
    onItemsChange(selectedItems.filter(i => i !== item));
  };

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2 w-full">
      <label className="text-sm text-muted-foreground">{label}</label>
      <div className="relative w-full">
        <div className="flex flex-wrap gap-2 mb-2 min-h-[32px] max-w-full overflow-hidden">
          {selectedItems.map((item) => (
            <Badge 
              key={item} 
              variant="secondary" 
              className="flex items-center gap-1 max-w-full truncate"
            >
              <span className="truncate">{item}</span>
              <X 
                className="h-3 w-3 cursor-pointer flex-shrink-0" 
                onClick={() => removeItem(item)}
              />
            </Badge>
          ))}
        </div>
        <Input
          placeholder={placeholder}
          onClick={() => setOpen(true)}
          readOnly
          className="bg-white w-full"
        />
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder={`Search ${label.toLowerCase()}...`}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item}
                    onSelect={() => handleSelect(item)}
                  >
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </div>
  );
};