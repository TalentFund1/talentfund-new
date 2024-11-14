import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SkillsMatrixSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: (skills: string[]) => void;
  handleSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeSearchSkill: (skill: string) => void;
  clearSearch: () => void;
}

export const SkillsMatrixSearch = ({
  searchTerm,
  setSearchTerm,
  selectedSearchSkills,
  handleSearchKeyDown,
  removeSearchSkill,
  clearSearch
}: SkillsMatrixSearchProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full pr-8"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {selectedSearchSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedSearchSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="flex items-center gap-1 bg-background"
              >
                {skill}
                <button
                  onClick={() => removeSearchSkill(skill)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearSearch}
              className="text-sm"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};