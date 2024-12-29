import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LocationFilterProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
  required?: boolean;
}

export const LocationFilter = ({ 
  selectedLocations, 
  onLocationChange,
  required = false 
}: LocationFilterProps) => {
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

  const handleSelect = (location: string) => {
    onLocationChange([location]);
    setSearchQuery("");
    setIsOpen(false);
  };

  const removeLocation = (location: string) => {
    onLocationChange([]);
  };

  const locations = ["New York, NYC", "San Francisco, CA", "London, UK"];
  const filteredLocations = locations.filter(location => 
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="text-sm mb-2 block text-muted-foreground">
        Location
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <div className="relative">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedLocations.map((location) => (
            <Badge key={location} variant="secondary" className="flex items-center gap-1">
              {location}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeLocation(location)}
              />
            </Badge>
          ))}
        </div>
        <div 
          className="relative cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Input
            placeholder={selectedLocations.length === 0 ? "Add Location" : ""}
            value={isOpen ? searchQuery : ""}
            onChange={(e) => {
              e.stopPropagation();
              setSearchQuery(e.target.value);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="bg-white pr-8"
          />
          <ChevronDown className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform",
            isOpen && "transform rotate-180"
          )} />
        </div>
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-md border shadow-lg max-h-60 overflow-auto">
            <div className="p-1">
              {filteredLocations.length === 0 ? (
                <div className="py-2 px-3 text-sm text-gray-500">
                  No locations found.
                </div>
              ) : (
                filteredLocations.map((location) => (
                  <div
                    key={location}
                    onClick={() => handleSelect(location)}
                    className="flex items-center justify-between px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
                  >
                    {location}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};