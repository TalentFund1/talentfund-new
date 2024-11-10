import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  label: string;
  placeholder: string;
  items: string[];
  selectedItems: string[];
  onItemsChange: (items: string[]) => void;
  singleSelect?: boolean;
  required?: boolean;
  className?: string;
}

export const SearchFilter = ({ 
  label, 
  placeholder, 
  items, 
  selectedItems, 
  onItemsChange,
  singleSelect = false,
  required = false,
  className
}: SearchFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    if (singleSelect) {
      onItemsChange([item]);
    } else {
      if (!selectedItems.includes(item)) {
        onItemsChange([...selectedItems, item]);
      }
    }
    // Don't clear search query or close dropdown when editing
    if (singleSelect) {
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const removeItem = (item: string) => {
    if (singleSelect) {
      onItemsChange([]);
    } else {
      onItemsChange(selectedItems.filter(i => i !== item));
    }
  };

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("space-y-2", className)} ref={dropdownRef}>
      <label className="text-sm text-muted-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
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
        <div 
          className="relative cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Input
            placeholder={selectedItems.length === 0 ? placeholder : ""}
            value={searchQuery}
            onChange={(e) => {
              e.stopPropagation();
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="bg-white pr-8 placeholder:text-muted-foreground"
          />
          <ChevronDown className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform",
            isOpen && "transform rotate-180"
          )} />
        </div>
        {isOpen && filteredItems.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-md border shadow-lg max-h-60 overflow-auto">
            <div className="p-1">
              {filteredItems.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(item)}
                  className="flex items-center justify-between px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
                >
                  <span>{item}</span>
                  {selectedItems.includes(item) && (
                    <Check className="h-4 w-4 text-primary-accent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};