import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { useState, useEffect } from "react";
import { professionalLevels, managerialLevels } from "./data/levelData";
import { useParams } from "react-router-dom";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getSkillProfileId, getLevel } from "../EmployeeTable";
import { useTrack } from "../skills/context/TrackContext";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompetencyGraphTable } from "../skills/competency/CompetencyGraphTable";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { Button } from "@/components/ui/button";
import { Brain, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateSkillProgression } from "../skills/competency/autoFillUtils";
import { roleSkills } from "../skills/data/roleSkills";

const roles = {
  "124": "Backend Engineer",
  "123": "AI Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const SimpleBenchmark = () => {
  const { id } = useParams();
  const { currentStates, setSkillProgression, saveChanges, resetLevels } = useCompetencyStore();
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);
  const { getTrackForRole } = useTrack();
  const employee = getEmployeeById(id || "");
  const { toast } = useToast();
  const { toggledSkills } = useToggledSkills();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Initialize with employee's role and level
  const [selectedRole, setSelectedRole] = useState(() => {
    if (employee) {
      const profileId = getSkillProfileId(employee.role);
      console.log('Initializing with employee role:', {
        employeeRole: employee.role,
        mappedProfileId: profileId
      });
      return profileId;
    }
    return "";
  });

  const [selectedLevel, setSelectedLevel] = useState(() => {
    if (employee) {
      const level = getLevel(employee.role).toLowerCase();
      console.log('Initializing with employee level:', {
        employeeRole: employee.role,
        extractedLevel: level
      });
      return level;
    }
    return "p4";
  });

  const track = getTrackForRole(selectedRole);
  const levels = track === "Managerial" ? managerialLevels : professionalLevels;

  // Single effect to handle initial synchronization
  useEffect(() => {
    if (employee) {
      const profileId = getSkillProfileId(employee.role);
      const level = getLevel(employee.role).toLowerCase();
      const newTrack = getTrackForRole(profileId);
      
      console.log('Initial synchronization:', {
        profileId,
        level,
        track: newTrack
      });

      if (profileId !== selectedRole) {
        setSelectedRole(profileId);
        
        // Adjust level based on new role's track if needed
        const isManagerial = newTrack === "Managerial";
        const isWrongTrack = (isManagerial && level.startsWith('p')) || 
                            (!isManagerial && level.startsWith('m'));
        
        if (isWrongTrack) {
          setSelectedLevel(isManagerial ? 'm3' : 'p4');
        } else {
          setSelectedLevel(level);
        }
      }
    }
  }, [employee]);

  const handleGenerateWithAI = async () => {
    console.log("Starting AI generation for skills...", { selectedRole, track });
    setIsGenerating(true);
    
    try {
      const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
      if (!currentRoleSkills) {
        console.error('No skills found for current role:', selectedRole);
        throw new Error('No skills found for current role');
      }

      const allSkills = [
        ...(currentRoleSkills.specialized || []),
        ...(currentRoleSkills.common || []),
        ...(currentRoleSkills.certifications || [])
      ].filter(skill => toggledSkills.has(skill.title));

      console.log('Processing skills generation for:', allSkills.map(s => s.title));

      // Generate progression for each skill
      allSkills.forEach(skill => {
        let category = "specialized";
        if (currentRoleSkills.common.some(s => s.title === skill.title)) {
          category = "common";
        } else if (currentRoleSkills.certifications.some(s => s.title === skill.title)) {
          category = "certification";
        }

        const progression = generateSkillProgression(skill.title, category, track, selectedRole);
        console.log('Generated progression:', { skill: skill.title, progression });
        
        if (progression) {
          setSkillProgression(skill.title, progression);
        }
      });

      saveChanges();

      toast({
        title: "Skills Generated",
        description: "Skill levels have been automatically generated based on industry standards.",
      });
    } catch (error) {
      console.error("Error generating skills:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the skill levels. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetLevels = () => {
    resetLevels();
    toast({
      title: "Levels reset",
      description: "All skill levels have been reset to their default values.",
    });
  };

  const getLevelDescription = (level: string) => {
    switch (level.toLowerCase()) {
      case 'p1': return 'Entry';
      case 'p2': return 'Developing';
      case 'p3': return 'Career';
      case 'p4': return 'Senior';
      case 'p5': return 'Expert';
      case 'p6': return 'Principal';
      case 'm3': return 'Manager';
      case 'm4': return 'Senior Manager';
      case 'm5': return 'Director';
      case 'm6': return 'Senior Director';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
        </div>
        
        <div className="flex gap-4 w-full max-w-[800px]">
          <Select 
            value={selectedRole}
            onValueChange={(value) => {
              console.log('Role selection changed:', {
                previousRole: selectedRole,
                newRole: value,
                roleName: roles[value as keyof typeof roles]
              });
              setSelectedRole(value);
              
              // Adjust level based on new role's track
              const newTrack = getTrackForRole(value);
              const isManagerial = newTrack === "Managerial";
              const currentLevel = selectedLevel.toLowerCase();
              const isWrongTrack = (isManagerial && currentLevel.startsWith('p')) || 
                                (!isManagerial && currentLevel.startsWith('m'));
              
              if (isWrongTrack) {
                setSelectedLevel(isManagerial ? 'm3' : 'p4');
              }
            }}
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
            onValueChange={(value) => {
              console.log('Level selection changed:', {
                previousLevel: selectedLevel,
                newLevel: value,
                description: getLevelDescription(value)
              });
              setSelectedLevel(value);
            }}
          >
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Select Level">
                {levels[selectedLevel.toLowerCase() as keyof typeof levels]} - {getLevelDescription(selectedLevel)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(levels).map(([id, title]) => (
                <SelectItem key={id} value={id}>
                  <span className="flex items-center justify-between w-full">
                    <span>{title}</span>
                    <span className="text-muted-foreground ml-2">- {getLevelDescription(id)}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-6" />

      <Card className="p-6 space-y-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-foreground">{roles[selectedRole as keyof typeof roles]}</h3>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleResetLevels}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Levels
            </Button>
            <Button 
              onClick={handleGenerateWithAI}
              className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              disabled={isGenerating}
            >
              <Brain className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate with AI"}
            </Button>
          </div>
        </div>

        <CompetencyGraphTable
          currentRoleId={selectedRole}
          track={track}
          selectedCategory={selectedCategory}
          toggledSkills={toggledSkills}
        />
      </Card>
    </div>
  );
};