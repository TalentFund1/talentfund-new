import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useRoleStore } from "./RoleBenchmark";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";
import { BenchmarkSkillsMatrixContent } from "./skills-matrix/BenchmarkSkillsMatrixContent";
import { BenchmarkSkillsMatrixState } from "./skills-matrix/BenchmarkSkillsMatrixState";

const ITEMS_PER_PAGE = 10;

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { currentStates } = useSkillsMatrixStore();

  const employeeSkills = getEmployeeSkills(id || "");
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  useEffect(() => {
    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    const toggledRoleSkills = allRoleSkills
      .filter(skill => toggledSkills.has(skill.title))
      .map(skill => skill.title);
    
    setSelectedSearchSkills(toggledRoleSkills);
    console.log('Setting toggled role skills:', toggledRoleSkills);
  }, [selectedRole, toggledSkills, currentRoleSkills]);

  const filteredSkills = BenchmarkSkillsMatrixState.getFilteredSkills({
    employeeSkills,
    toggledSkills,
    selectedLevel,
    selectedInterest,
    selectedSkillLevel,
    searchTerm,
    selectedSearchSkills,
    currentStates,
    getSkillCompetencyState,
    roleLevel
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

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [visibleItems, filteredSkills.length]);

  const paginatedSkills = filteredSkills.slice(0, visibleItems);
  const hasMoreItems = visibleItems < filteredSkills.length;

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <BenchmarkSkillsMatrixContent 
          roleId={selectedRole}
          employeeId={id || ""}
          roleLevel={roleLevel}
          filteredSkills={paginatedSkills}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          selectedSkillLevel={selectedSkillLevel}
          setSelectedSkillLevel={setSelectedSkillLevel}
          selectedSearchSkills={selectedSearchSkills}
          setSelectedSearchSkills={setSelectedSearchSkills}
          visibleItems={visibleItems}
          observerTarget={observerTarget}
        />
      </Card>
    </div>
  );
};