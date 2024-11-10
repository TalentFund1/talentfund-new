import React, { useState, useEffect, useRef } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SearchFilterProps {
  label: string;
  placeholder?: string;
  items: string[];
  selectedItems: string[];
  onItemsChange: (items: string[]) => void;
  singleSelect?: boolean;
}

export function SearchFilter({
  label,
  placeholder,
  items,
  selectedItems,
  onItemsChange,
  singleSelect = false,
}: SearchFilterProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItem = (item: string) => {
    if (singleSelect) {
      onItemsChange([item]);
      setOpen(false);
      return;
    }

    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      onItemsChange(selectedItems.filter((i) => i !== item));
    } else {
      onItemsChange([...selectedItems, item]);
    }
  };

  const removeItem = (itemToRemove: string) => {
    onItemsChange(selectedItems.filter((item) => item !== itemToRemove));
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {item}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeItem(item)}
            />
          </Badge>
        ))}
      </div>
      <Command className="overflow-visible bg-transparent">
        <CommandInput
          ref={inputRef}
          placeholder={placeholder}
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="border-input"
        />
        {searchQuery && (
          <div className="absolute mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filteredItems.map((item) => {
                  const isSelected = selectedItems.includes(item);
                  return (
                    <CommandItem
                      key={item}
                      onSelect={() => toggleItem(item)}
                      className={isSelected ? "bg-accent" : ""}
                    >
                      {item}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}