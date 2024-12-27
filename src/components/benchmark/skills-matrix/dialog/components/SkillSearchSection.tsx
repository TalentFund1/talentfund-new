import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillSearchSectionProps {
  allSkills: string[];
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  onCancel: () => void;
  onAdd: () => void;
  isLoading?: boolean;
}

export const SkillSearchSection = ({
  allSkills,
  selectedSkills,
  setSelectedSkills,
  onCancel,
  onAdd,
  isLoading = false
}: SkillSearchSectionProps) => {
  return (
    <div className="space-y-4">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search skills..." />
        <CommandEmpty>No skills found.</CommandEmpty>
        <CommandGroup>
          <ScrollArea className="h-72">
            {allSkills.map((skill) => (
              <CommandItem
                key={skill}
                onSelect={() => {
                  if (selectedSkills.includes(skill)) {
                    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
                  } else {
                    setSelectedSkills([...selectedSkills, skill]);
                  }
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedSkills.includes(skill) ? "opacity-100" : "opacity-0"
                  )}
                />
                {skill}
              </CommandItem>
            ))}
          </ScrollArea>
        </CommandGroup>
      </Command>

      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          onClick={onAdd}
          disabled={selectedSkills.length === 0 || isLoading}
          className="bg-primary"
        >
          {isLoading ? "Adding..." : "Add Selected Skills"}
        </Button>
      </div>
    </div>
  );
};