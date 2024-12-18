import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchFilterProps {
  label?: string;
  placeholder?: string;
  items: string[];
  selectedItems: string[];
  onItemsChange: (items: string[]) => void;
  singleSelect?: boolean;
}

export const SearchFilter = ({
  label = "Filter",
  placeholder = "Search items...",
  items = [],
  selectedItems = [],
  onItemsChange,
  singleSelect = false,
}: SearchFilterProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];
  
  console.log('SearchFilter rendering with:', {
    itemsCount: safeItems.length,
    selectedCount: selectedItems.length,
    searchValue
  });

  const handleSelect = (currentValue: string) => {
    if (singleSelect) {
      onItemsChange([currentValue]);
      setOpen(false);
      return;
    }

    const newSelectedItems = selectedItems.includes(currentValue)
      ? selectedItems.filter((item) => item !== currentValue)
      : [...selectedItems, currentValue];

    onItemsChange(newSelectedItems);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full bg-white"
          >
            {selectedItems.length === 0
              ? "Select items..."
              : `${selectedItems.length} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder={placeholder} 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {safeItems.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => handleSelect(item)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItems.includes(item)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};