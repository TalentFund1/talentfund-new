import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";
import { SkillsMatrixFiltering } from "./skills-matrix/SkillsMatrixFiltering";

const ITEMS_PER_PAGE = 10;

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { currentStates } = useSkillsMatrixStore();

  const employeeSkills = getEmployeeSkills(id || "");

  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      let matchesLevel = true;
      let matchesSearch = true;

      const currentSkillState = currentStates[skill.title];
      const skillLevel = (currentSkillState?.level || skill.level || '').toLowerCase();

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

      return matchesLevel && matchesSearch;
    })
    .sort((a, b) => {
      const aState = currentStates[a.title];
      const bState = currentStates[b.title];
      
      const aLevel = (aState?.level || a.level || 'unspecified').toLowerCase();
      const bLevel = (bState?.level || b.level || 'unspecified').toLowerCase();
      
      const levelPriority: { [key: string]: number } = {
        'advanced': 0,
        'intermediate': 1,
        'beginner': 2,
        'unspecified': 3
      };
      
      return levelPriority[aLevel] - levelPriority[bLevel];
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
      <Card className="p-8 bg-white space-y-8">
        <SkillsMatrixFiltering
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedSearchSkills={selectedSearchSkills}
          setSelectedSearchSkills={setSelectedSearchSkills}
        />

        <SkillsMatrixContent 
          filteredSkills={filteredSkills.slice(0, visibleItems)}
          observerTarget={observerTarget}
          visibleItems={visibleItems}
          totalItems={filteredSkills.length}
        />
      </Card>
    </div>
  );
};