import { useState } from "react";
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
import { useTrack } from "../skills/context/TrackContext";
import { roleSkills } from "../skills/data/roleSkills";
import { BenchmarkSkillsMatrixContent } from "./skills-matrix/BenchmarkSkillsMatrixContent";

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
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const { id } = useParams<{ id: string }>();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { selectedRole, setSelectedRole, selectedLevel: roleLevel, setSelectedLevel: setRoleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { getTrackForRole } = useTrack();

  const employeeSkills = getEmployeeSkills(id || "");
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  // Auto-populate toggled skills when role changes
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
  }, [selectedRole, toggledSkills, currentRoleSkills]);

  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      if (!toggledSkills.has(skill.title)) return false;

      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;
      let matchesSkillLevel = true;

      const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
      const roleSkillLevel = competencyState?.level || 'unspecified';

      if (selectedLevel !== 'all') {
        matchesLevel = roleSkillLevel.toLowerCase() === selectedLevel.toLowerCase();
      }

      const currentSkillState = currentStates[skill.title];
      const skillLevel = (currentSkillState?.level || skill.level || 'unspecified').toLowerCase();
      
      if (selectedSkillLevel !== 'all') {
        matchesSkillLevel = skillLevel === selectedSkillLevel.toLowerCase();
      }

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
      } else if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesLevel && matchesInterest && matchesSearch && matchesSkillLevel;
    });

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
            onRoleChange={setSelectedRole}
            onLevelChange={setRoleLevel}
            onTrackChange={() => {}}
            roles={roles}
          />
        </div>

        <BenchmarkSkillsMatrixContent 
          roleId={selectedRole}
          employeeId={id || ""}
          roleLevel={roleLevel}
          filteredSkills={filteredSkills}
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