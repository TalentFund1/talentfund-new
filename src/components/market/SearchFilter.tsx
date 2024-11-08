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
    <div className="space-y-2 p-4 bg-white rounded-lg border border-border shadow-sm">
      <label className="text-sm font-medium text-primary">{label}</label>
      <div className="relative">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedItems.map((item) => (
            <Badge key={item} variant="secondary" className="flex items-center gap-1">
              {item}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-primary-accent" 
                onClick={() => removeItem(item)}
              />
            </Badge>
          ))}
        </div>
        <Input
          placeholder={placeholder}
          onClick={() => setOpen(true)}
          readOnly
          className="bg-white cursor-pointer hover:border-primary-accent transition-colors"
        />
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder={`Search ${label.toLowerCase()}...`}
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="border-b border-border"
            />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item}
                    onSelect={() => handleSelect(item)}
                    className="cursor-pointer hover:bg-secondary"
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