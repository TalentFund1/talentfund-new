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

  const handleSelect = (location: string) => {
    if (!selectedLocations.includes(location)) {
      onLocationChange([...selectedLocations, location]);
    }
    setOpen(false);
  };

  const removeLocation = (location: string) => {
    onLocationChange(selectedLocations.filter(l => l !== location));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm mb-2 block">Location</label>
      <div className="relative">
        <div className="flex flex-wrap gap-2 mb-2 min-h-[32px] max-w-full overflow-x-hidden">
          {selectedLocations.map((location) => (
            <Badge 
              key={location} 
              variant="secondary" 
              className="flex items-center gap-1.5 py-1 px-3 bg-primary-accent/10 text-primary hover:bg-primary-accent/20 transition-colors"
            >
              {location}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-primary-accent transition-colors" 
                onClick={() => removeLocation(location)}
              />
            </Badge>
          ))}
        </div>
        <Input
          placeholder="Add Locations"
          onClick={() => setOpen(true)}
          readOnly
          className="bg-white"
        />
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search locations..." />
            <CommandList>
              <CommandEmpty>No locations found.</CommandEmpty>
              <CommandGroup>
                <CommandItem onSelect={() => handleSelect("New York, NYC")}>
                  New York, NYC
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("San Francisco, CA")}>
                  San Francisco, CA
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("London, UK")}>
                  London, UK
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </div>
  );
};