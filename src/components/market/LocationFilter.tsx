import { useState } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LocationFilterProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
}

export const LocationFilter = ({ selectedLocations, onLocationChange }: LocationFilterProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (location: string) => {
    // Only allow one location to be selected
    onLocationChange([location]);
    setOpen(false);
  };

  const removeLocation = (location: string) => {
    onLocationChange([]);
  };

  const locations = ["New York, NYC", "San Francisco, CA", "London, UK"];
  const filteredLocations = locations.filter(location => 
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <label className="text-sm mb-2 block">Location</label>
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
        <Input
          placeholder={selectedLocations.length === 0 ? "Add Location" : ""}
          onClick={() => setOpen(true)}
          readOnly
          className="bg-white"
        />
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder="Search locations..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No locations found.</CommandEmpty>
              <CommandGroup>
                {filteredLocations.map((location) => (
                  <CommandItem
                    key={location}
                    onSelect={() => handleSelect(location)}
                  >
                    {location}
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