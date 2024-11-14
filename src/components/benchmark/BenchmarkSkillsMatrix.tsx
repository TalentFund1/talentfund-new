import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";

const ITEMS_PER_PAGE = 10;

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const { id } = useParams<{ id: string }>();
  const { benchmarkSearchSkills } = useBenchmarkSearch();
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedSearchSkills(benchmarkSearchSkills);
  }, [benchmarkSearchSkills]);

  const employeeSkills = getEmployeeSkills(id || "");
  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      let matchesSearch = true;
      let matchesLevel = true;

      // Level filtering
      if (selectedLevel !== 'all') {
        matchesLevel = (skill.level || 'unspecified').toLowerCase() === selectedLevel.toLowerCase();
      }

      // Search filtering
      if (selectedSearchSkills.length > 0) {
        matchesSearch = selectedSearchSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      } else if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      const levelPriority: { [key: string]: number } = {
        'advanced': 0,
        'intermediate': 1,
        'beginner': 2,
        'unspecified': 3
      };
      
      const aLevel = (a.level || 'unspecified').toLowerCase();
      const bLevel = (b.level || 'unspecified').toLowerCase();
      
      return levelPriority[aLevel] - levelPriority[bLevel];
    });

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      setSelectedSearchSkills(prev => [...prev, searchTerm.trim()]);
      setSearchTerm("");
    }
  };

  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(prev => prev.filter(s => s !== skill));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedSearchSkills([]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleItems < filteredSkills.length) {
          setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredSkills.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [visibleItems, filteredSkills.length]);

  const paginatedSkills = filteredSkills.slice(0, visibleItems);

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground">Skills Matrix</h2>
            <p className="text-sm text-muted-foreground">
              Manage and track employee skills and competencies
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white">Export</Button>
            <Button>Add Skill</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 mb-4">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="unspecified">Unspecified</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

        <SkillsMatrixTable 
          filteredSkills={paginatedSkills}
        />
        
        {visibleItems < filteredSkills.length && (
          <div 
            ref={observerTarget} 
            className="h-10 flex items-center justify-center"
          >
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
      </Card>
    </div>
  );
};