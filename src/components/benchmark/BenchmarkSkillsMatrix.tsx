import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { BenchmarkMatrixFilters } from "./skills-matrix/BenchmarkMatrixFilters";
import { useRoleStore } from "./RoleBenchmark";
import { professionalLevels, managerialLevels } from "./data/levelData";

const ITEMS_PER_PAGE = 10;

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const { id } = useParams<{ id: string }>();
  const { benchmarkSearchSkills } = useBenchmarkSearch();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { currentStates } = useSkillsMatrixStore();
  const { selectedRole, selectedLevel, setSelectedRole, setSelectedLevel } = useRoleStore();

  const roles = {
    "123": "AI Engineer",
    "124": "Backend Engineer",
    "125": "Frontend Engineer",
    "126": "Engineering Manager"
  };

  useEffect(() => {
    setSelectedSearchSkills(benchmarkSearchSkills);
  }, [benchmarkSearchSkills]);

  const employeeSkills = getEmployeeSkills(id || "");
  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      let matchesSearch = true;
      let matchesLevel = true;

      const currentSkillState = currentStates[skill.title];
      const skillLevel = (currentSkillState?.level || skill.level || 'unspecified').toLowerCase();

      if (selectedLevel !== 'all') {
        matchesLevel = skillLevel === selectedLevel.toLowerCase();
      }

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
      
      const aState = currentStates[a.title];
      const bState = currentStates[b.title];
      
      const aLevel = (aState?.level || a.level || 'unspecified').toLowerCase();
      const bLevel = (bState?.level || b.level || 'unspecified').toLowerCase();
      
      return levelPriority[aLevel] - levelPriority[bLevel];
    });

  const removeSearchSkill = (skill: string) => {
    setSelectedSearchSkills(prev => prev.filter(s => s !== skill));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedSearchSkills([]);
  };

  const paginatedSkills = filteredSkills.slice(0, visibleItems);

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">Skills Matrix</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track employee skills and competencies
          </p>
        </div>

        <div className="flex gap-4 w-full max-w-[800px]">
          <Select 
            value={selectedRole}
            onValueChange={setSelectedRole}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Role">
                {roles[selectedRole as keyof typeof roles]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roles).map(([id, title]) => (
                <SelectItem key={id} value={id}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedLevel}
            onValueChange={setSelectedLevel}
          >
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="p1">P1</SelectItem>
              <SelectItem value="p2">P2</SelectItem>
              <SelectItem value="p3">P3</SelectItem>
              <SelectItem value="p4">P4</SelectItem>
              <SelectItem value="p5">P5</SelectItem>
              <SelectItem value="m1">M1</SelectItem>
              <SelectItem value="m2">M2</SelectItem>
              <SelectItem value="m3">M3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <BenchmarkMatrixFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={"all"}
          setSelectedInterest={() => {}}
          selectedSearchSkills={selectedSearchSkills}
          removeSearchSkill={removeSearchSkill}
          clearSearch={clearSearch}
        />

        <SkillsMatrixTable 
          filteredSkills={paginatedSkills}
          showCompanySkill={false}
          isRoleBenchmark={true}
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
