import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

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
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: string) => {
    if (!selectedItems.includes(item)) {
      onItemsChange([...selectedItems, item]);
    }
    setSearchQuery("");
  };

  const removeItem = (item: string) => {
    onItemsChange(selectedItems.filter(i => i !== item));
  };

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="text-sm text-muted-foreground">{label}</label>
      <div className="relative">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedItems.map((item) => (
            <Badge key={item} variant="secondary" className="flex items-center gap-1">
              {item}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeItem(item)}
              />
            </Badge>
          ))}
        </div>
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="bg-white"
        />
        {isOpen && searchQuery && (
          <Command className="absolute w-full z-50 mt-2 rounded-lg border shadow-md bg-white">
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => handleSelect(item)}
                  className="cursor-pointer"
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        )}
      </div>
    </div>
  );
};