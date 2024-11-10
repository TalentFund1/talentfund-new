import * as React from "react";
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

interface ComboboxDemoProps {
  skills: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export function ComboboxDemo({ skills, selected, onSelect }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  
  // Ensure we always have a valid array to work with and handle undefined/null cases
  const safeSkills = React.useMemo(() => {
    if (!Array.isArray(skills)) return [];
    return skills.filter(skill => skill != null && typeof skill === 'string');
  }, [skills]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white"
        >
          {selected || "Select skill..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search skills..." />
          <CommandEmpty>No skill found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {safeSkills.map((skill) => (
              <CommandItem
                key={skill}
                value={skill}
                onSelect={() => {
                  onSelect(skill);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected === skill ? "opacity-100" : "opacity-0"
                  )}
                />
                {skill}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}