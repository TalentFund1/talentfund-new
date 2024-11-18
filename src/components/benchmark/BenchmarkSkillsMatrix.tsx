import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { RoleSelection } from "./RoleSelection";
import { useRoleStore } from "./RoleBenchmark";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { CategorizedSkills } from "./CategorizedSkills";
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";

const ITEMS_PER_PAGE = 10;

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const { id } = useParams<{ id: string }>();
  const { benchmarkSearchSkills } = useBenchmarkSearch();
  const { currentStates } = useSkillsMatrixStore();
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { getTrackForRole } = useTrack();

  const employeeSkills = getEmployeeSkills(id || "");
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  // Filter skills based on search criteria
  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      if (!toggledSkills.has(skill.title)) {
        return false;
      }

      // Search filter
      const matchesSearch = selectedSearchSkills.length === 0 
        ? true 
        : selectedSearchSkills.some(term => 
            skill.title.toLowerCase().includes(term.toLowerCase()) ||
            skill.subcategory.toLowerCase().includes(term.toLowerCase())
          );

      if (!matchesSearch) {
        return false;
      }

      // Level filter
      let matchesLevel = true;
      if (selectedLevel !== 'all') {
        const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
        const roleSkillLevel = competencyState?.level || 'unspecified';
        matchesLevel = roleSkillLevel.toLowerCase() === selectedLevel.toLowerCase();
      }

      // Interest filter
      let matchesInterest = true;
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

      return matchesLevel && matchesInterest;
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  useEffect(() => {
    setVisibleItems(ITEMS_PER_PAGE);
  }, [selectedSearchSkills, selectedLevel, selectedInterest]);

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">Skills Matrix</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track employee skills and competencies
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <RoleSelection 
            selectedRole={selectedRole}
            selectedLevel={roleLevel}
            currentTrack={getTrackForRole(selectedRole)}
            onRoleChange={() => {}}
            onLevelChange={() => {}}
            onTrackChange={() => {}}
            roles={roles}
          />
        </div>

        <CategorizedSkills 
          roleId={selectedRole}
          employeeId={id || ""}
          selectedLevel={roleLevel}
        />

        <SkillsMatrixContent 
          filteredSkills={filteredSkills}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          selectedSearchSkills={selectedSearchSkills}
          setSelectedSearchSkills={setSelectedSearchSkills}
          visibleItems={visibleItems}
          observerTarget={null}
        />
      </Card>
    </div>
  );
};