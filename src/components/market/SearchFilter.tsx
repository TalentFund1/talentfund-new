import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  label: string;
  placeholder: string;
  items?: Array<string | { id: string; title: string }>;
  selectedItems: string[];
  onItemsChange: (items: string[]) => void;
  singleSelect?: boolean;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  displayKey?: 'title';
}

export const SearchFilter = ({ 
  label, 
  placeholder, 
  items = [],
  selectedItems = [],
  onItemsChange,
  singleSelect = false,
  required = false,
  className,
  disabled = false,
  displayKey
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

  const getDisplayValue = (item: string | { id: string; title: string }): string => {
    if (typeof item === 'string') return item;
    return displayKey ? item[displayKey] : item.id;
  };

  const handleSelect = (item: string | { id: string; title: string }) => {
    if (disabled) return;
    
    const value = typeof item === 'string' ? item : item.id;
    
    if (singleSelect) {
      onItemsChange([value]);
    } else {
      if (!selectedItems.includes(value)) {
        onItemsChange([...selectedItems, value]);
      }
    }
    setSearchQuery("");
    if (singleSelect) {
      setIsOpen(false);
    }
  };

  const removeItem = (itemToRemove: string) => {
    if (disabled) return;
    
    if (singleSelect) {
      onItemsChange([]);
    } else {
      onItemsChange(selectedItems.filter(i => i !== itemToRemove));
    }
  };

  const filteredItems = items.filter(item => {
    const displayValue = getDisplayValue(item).toLowerCase();
    return displayValue.includes(searchQuery.toLowerCase());
  });

  const getSelectedItemDisplay = (itemId: string): string => {
    const item = items.find(i => {
      if (typeof i === 'string') return i === itemId;
      return i.id === itemId;
    });
    return item ? getDisplayValue(item) : itemId;
  };

  return (
    <div className={cn("space-y-2", className)} ref={dropdownRef}>
      <label className="text-sm text-muted-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <div className="relative">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedItems.map((itemId) => (
            <Badge key={itemId} variant="secondary" className="flex items-center gap-1">
              {getSelectedItemDisplay(itemId)}
              <X 
                className={cn("h-3 w-3", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")}
                onClick={() => !disabled && removeItem(itemId)}
              />
            </Badge>
          ))}
        </div>
        <div 
          className={cn("relative", disabled ? "cursor-not-allowed" : "cursor-pointer")}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <Input
            placeholder={selectedItems.length === 0 ? placeholder : ""}
            value={isOpen ? searchQuery : ""}
            onChange={(e) => {
              if (!disabled) {
                e.stopPropagation();
                setSearchQuery(e.target.value);
              }
            }}
            onClick={(e) => {
              if (!disabled) {
                e.stopPropagation();
                setIsOpen(true);
              }
            }}
            disabled={disabled}
            className={cn(
              "bg-white pr-8 placeholder:text-muted-foreground",
              disabled && "opacity-50"
            )}
          />
          <ChevronDown className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform",
            isOpen && "transform rotate-180",
            disabled && "opacity-50"
          )} />
        </div>
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-md border shadow-lg max-h-60 overflow-auto">
            <div className="p-1">
              {filteredItems.length === 0 ? (
                <div className="py-2 px-3 text-sm text-gray-500">
                  No {label.toLowerCase()} found.
                </div>
              ) : (
                filteredItems.map((item) => {
                  const value = typeof item === 'string' ? item : item.id;
                  const display = getDisplayValue(item);
                  return (
                    <div
                      key={value}
                      onClick={() => handleSelect(item)}
                      className="flex items-center justify-between px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <span>{display}</span>
                      {selectedItems.includes(value) && (
                        <Check className="h-4 w-4 text-primary-accent" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};