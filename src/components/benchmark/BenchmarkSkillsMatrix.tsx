import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useParams } from "react-router-dom";
import { roleSkills } from './data/roleSkills';
import { RoleSelection } from "./RoleSelection";
import { useRoleStore } from "./RoleBenchmark";
import { CompetencyMatchSection } from "./CompetencyMatchSection";
import { CategorizedSkills } from "./CategorizedSkills";
import { useTrack } from "../skills/context/TrackContext";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

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
  const { currentStates } = useSkillsMatrixStore();
  const { selectedRole, setSelectedRole, selectedLevel: roleLevel, setSelectedLevel: setRoleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { getTrackForRole } = useTrack();

  // Auto-populate search skills when role changes
  useEffect(() => {
    const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];
    
    const toggledRoleSkills = allRoleSkills
      .filter(skill => toggledSkills.has(skill.title))
      .map(skill => skill.title);
    
    setSelectedSearchSkills(toggledRoleSkills);
    console.log('Auto-populated search skills:', toggledRoleSkills);
  }, [selectedRole, toggledSkills]);

  const employeeSkills = getEmployeeSkills(id || "");
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const filteredSkills = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      if (!toggledSkills.has(skill.title)) {
        return false;
      }

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
    })
    .sort((a, b) => {
      const aCompetencyState = getSkillCompetencyState(a.title, roleLevel.toLowerCase());
      const bCompetencyState = getSkillCompetencyState(b.title, roleLevel.toLowerCase());
      
      const aRoleLevel = aCompetencyState?.level || 'unspecified';
      const bRoleLevel = bCompetencyState?.level || 'unspecified';
      
      const roleLevelDiff = getRoleLevelPriority(aRoleLevel) - getRoleLevelPriority(bRoleLevel);
      if (roleLevelDiff !== 0) return roleLevelDiff;

      return a.title.localeCompare(b.title);
    });

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Benchmark Skills Matrix</h2>
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

        {/* Skills Matrix Filters */}
        <div className="mb-4">
          {/* Search Filter code here */}
        </div>

        {/* Skills Matrix Table */}
        <SkillsMatrixContent 
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
