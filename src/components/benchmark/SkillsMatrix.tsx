import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillsMatrixHeader } from "./skills-matrix/SkillsMatrixHeader";
import { SkillsMatrixFilters } from "./skills-matrix/SkillsMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useToast } from "@/components/ui/use-toast";

const ITEMS_PER_PAGE = 10;

export const SkillsMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { saveChanges, cancelChanges, hasChanges: storeHasChanges } = useSkillsMatrixStore();

  const employeeSkills = getEmployeeSkills(id || "");

  const handleSave = () => {
    saveChanges();
    setHasChanges(false);
    toast({
      title: "Changes saved successfully",
      description: "Your skill matrix has been updated.",
    });
  };

  const handleCancel = () => {
    cancelChanges();
    setHasChanges(false);
    toast({
      title: "Changes discarded",
      description: "Your skill matrix has been restored to its previous state.",
    });
  };

  useEffect(() => {
    setHasChanges(storeHasChanges);
  }, [storeHasChanges]);

  const filteredSkills = filterSkillsByCategory(employeeSkills, selectedCategory)
    .filter(skill => {
      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;

      // Level filtering
      if (selectedLevel !== 'all') {
        matchesLevel = skill.level?.toLowerCase() === selectedLevel.toLowerCase();
      }

      // Interest filtering
      if (selectedInterest !== 'all') {
        matchesInterest = skill.requirement?.toLowerCase() === selectedInterest.toLowerCase();
      }

      // Search filtering
      if (selectedSearchSkills.length > 0) {
        matchesSearch = selectedSearchSkills.some(term => 
          skill.title.toLowerCase().includes(term.toLowerCase())
        );
      } else if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesLevel && matchesInterest && matchesSearch;
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

  const paginatedSkills = filteredSkills.slice(0, visibleItems);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <SkillsMatrixHeader 
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <Separator className="my-4" />
        
        <SkillsMatrixFilters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSearchSkills={selectedSearchSkills}
          handleSearchKeyDown={handleSearchKeyDown}
          removeSearchSkill={removeSearchSkill}
          clearSearch={clearSearch}
        />

        <SkillsMatrixTable 
          filteredSkills={paginatedSkills}
          setHasChanges={setHasChanges}
        />
      </Card>
    </div>
  );
};