import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useRoleStore } from "./RoleBenchmark";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { SkillsSearch } from "./skills-matrix/SkillsSearch";
import { MatrixContent } from "./skills-matrix/MatrixContent";

const ITEMS_PER_PAGE = 10;

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { currentStates } = useSkillsMatrixStore();
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(id || "");

  const getLevelPriority = (level: string = 'unspecified') => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
  };

  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      if (!toggledSkills.has(skill.title)) {
        return false;
      }

      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;

      const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
      const roleSkillLevel = competencyState?.level || 'unspecified';

      if (selectedLevel !== 'all') {
        matchesLevel = roleSkillLevel.toLowerCase() === selectedLevel.toLowerCase();
      }

      const currentSkillState = currentStates[skill.title];
      const requirement = (currentSkillState?.requirement || skill.requirement || 'unknown').toLowerCase();

      if (selectedInterest !== 'all') {
        switch (selectedInterest.toLowerCase()) {
          case 'skill_goal':
            matchesInterest = requirement === 'required' || requirement === 'skill_goal';
            break;
          case 'not_interested':
            matchesInterest = requirement === 'not_interested';
            break;
          case 'unknown':
            matchesInterest = !requirement || requirement === 'unknown';
            break;
          default:
            matchesInterest = requirement === selectedInterest.toLowerCase();
        }
      }

      if (selectedSearchSkills.length > 0) {
        matchesSearch = selectedSearchSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      }

      return matchesLevel && matchesInterest && matchesSearch;
    })
    .sort((a, b) => {
      const aCompetencyState = getSkillCompetencyState(a.title, roleLevel.toLowerCase());
      const bCompetencyState = getSkillCompetencyState(b.title, roleLevel.toLowerCase());
      
      const aRoleLevel = aCompetencyState?.level || 'unspecified';
      const bRoleLevel = bCompetencyState?.level || 'unspecified';
      
      return getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
    });

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

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="space-y-6">
          <SkillsSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSearchSkills={selectedSearchSkills}
            setSelectedSearchSkills={setSelectedSearchSkills}
          />

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

            <Select value={selectedInterest} onValueChange={setSelectedInterest}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Interests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Interests</SelectItem>
                <SelectItem value="required">Skill Goal</SelectItem>
                <SelectItem value="not-interested">Not Interested</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <MatrixContent 
            filteredSkills={filteredSkills}
            visibleItems={visibleItems}
            observerTarget={observerTarget}
          />
        </div>
      </Card>
    </div>
  );
};