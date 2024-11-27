import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";
import { CategorizedSkills } from "./CategorizedSkills";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useRoleStore } from "./RoleBenchmark";

const ITEMS_PER_PAGE = 10;

const getRoleTitle = (roleId: string) => {
  const titles: { [key: string]: string } = {
    "123": "AI Engineer",
    "124": "Backend Engineer",
    "125": "Frontend Engineer",
    "126": "Engineering Manager"
  };
  return titles[roleId] || "AI Engineer";
};

export const BenchmarkSkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { id } = useParams();
  const observerTarget = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { selectedRole, selectedLevel: roleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  
  if (!currentRoleSkills) {
    console.error('No role skills found for role:', selectedRole);
    return null;
  }

  // Get all skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  console.log('All role skills before filtering:', allRoleSkills.map(s => s.title));

  // First filter by toggled skills
  const toggledRoleSkills = allRoleSkills.filter(skill => {
    const isToggled = toggledSkills.has(skill.title);
    console.log(`Skill ${skill.title} is toggled: ${isToggled}`);
    return isToggled;
  });

  console.log('Filtered toggled skills:', toggledRoleSkills.map(s => s.title));

  // Then apply additional filters
  const filteredSkills = toggledRoleSkills.filter(skill => {
    let matchesLevel = true;
    let matchesInterest = true;
    let matchesSearch = true;
    let matchesSkillLevel = true;

    if (selectedLevel !== 'all') {
      matchesLevel = skill.level?.toLowerCase() === selectedLevel.toLowerCase();
    }

    if (selectedInterest !== 'all') {
      matchesInterest = skill.requirement?.toLowerCase() === selectedInterest.toLowerCase();
    }

    if (selectedSkillLevel !== 'all') {
      matchesSkillLevel = skill.level?.toLowerCase() === selectedSkillLevel.toLowerCase();
    }

    if (selectedSearchSkills.length > 0) {
      matchesSearch = selectedSearchSkills.some(term => 
        skill.title.toLowerCase().includes(term.toLowerCase())
      );
    } else if (searchTerm) {
      matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const matches = matchesLevel && matchesInterest && matchesSearch && matchesSkillLevel;
    console.log(`Filtering skill ${skill.title}:`, {
      matchesLevel,
      matchesInterest,
      matchesSearch,
      matchesSkillLevel,
      finalResult: matches
    });

    return matches;
  });

  console.log('Final filtered skills:', filteredSkills.map(s => s.title));

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <CategorizedSkills 
          roleId={selectedRole}
          employeeId={id || ""}
          selectedLevel={roleLevel}
        />

        <Separator className="my-8" />

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {getRoleTitle(selectedRole)}: {roleLevel.toUpperCase()}
          </h2>
        </div>

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