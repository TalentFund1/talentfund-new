import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SkillCell } from "./competency/SkillCell";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { skillsByCategory } from "./competency/skillsData";
import { CategorySection } from "./competency/CategorySection";
import { categorizeSkills } from "./competency/skillCategories";
import { useCompetencyStore } from "./competency/CompetencyState";
import { useToast } from "@/components/ui/use-toast";
import { TrackSelection } from "./TrackSelection";
import { useTrack } from "./context/TrackContext";

const jobTitles: { [key: string]: string } = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

interface CompetencyGraphProps {
  track?: "Professional" | "Managerial";
  roleId?: string;
}

export const CompetencyGraph = ({ track: initialTrack, roleId }: CompetencyGraphProps) => {
  const { toggledSkills } = useToggledSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });
  const { getTrackForRole } = useTrack();
  const { hasChanges, saveChanges, cancelChanges } = useCompetencyStore();
  const { toast } = useToast();

  const track = roleId ? getTrackForRole(roleId) : initialTrack || "Professional";
  const jobTitle = roleId ? jobTitles[roleId] || "Backend Engineer" : "Backend Engineer";

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  const handleSave = () => {
    saveChanges();
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    cancelChanges();
    toast({
      title: "Changes cancelled",
      description: "Your changes have been discarded.",
    });
  };

  const getLevelsForTrack = () => {
    return track === "Professional" 
      ? ["P1", "P2", "P3", "P4", "P5", "P6"] 
      : ["M3", "M4", "M5", "M6"];
  };

  const getSkillsForCategory = () => {
    const categoryData = skillsByCategory[selectedCategory as keyof typeof skillsByCategory];
    return categoryData?.[track.toLowerCase()];
  };

  const skills = getSkillsForCategory() || {};
  const levels = getLevelsForTrack();

  const getSkillsByCategory = () => {
    const skillsArray = Array.from(toggledSkills);
    const profileId = roleId || "124"; // Use the provided roleId or default to Backend Engineer
    
    if (selectedCategory === "all") {
      return skillsArray.filter(skill => 
        isSpecializedSkill(skill, profileId) || 
        isCommonSkill(skill, profileId) || 
        isCertificationSkill(skill, profileId)
      );
    }
    
    if (selectedCategory === "specialized") {
      return skillsArray.filter(skill => isSpecializedSkill(skill, profileId));
    }
    
    if (selectedCategory === "common") {
      return skillsArray.filter(skill => isCommonSkill(skill, profileId));
    }
    
    if (selectedCategory === "certification") {
      return skillsArray.filter(skill => isCertificationSkill(skill, profileId));
    }
    
    return [];
  };

  const uniqueSkills = getSkillsByCategory().sort();
  const skillCounts = categorizeSkills(Array.from(toggledSkills), roleId || "124");

  const getSkillDetails = (skillName: string, level: string) => {
    if (!skills || !skills[level]) return { level: "-", required: "-" };
    return skills[level]?.find((s: { name: string; level: string; required: string; }) => 
      s.name === skillName
    ) || { level: "-", required: "-" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Skills Graph</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={!hasChanges}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">{jobTitle}</h3>
        <TrackSelection />
      </div>

      <CategorySection 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        skillCounts={skillCounts}
      />

      <div className="rounded-lg border border-border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px] font-semibold bg-background/80 border-r border-border">
                Skill
              </TableHead>
              {levels.map((level, index) => (
                <TableHead 
                  key={level} 
                  className={`text-center bg-background/80 ${index !== levels.length - 1 ? 'border-r' : ''} border-border`}
                >
                  <div className="font-semibold">{level}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {uniqueSkills.map((skillName) => (
              <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
                <TableCell className="font-medium border-r border-border">
                  {skillName}
                </TableCell>
                {levels.map((level, index) => (
                  <SkillCell 
                    key={level}
                    skillName={skillName}
                    details={getSkillDetails(skillName, level)}
                    isLastColumn={index === levels.length - 1}
                    levelKey={level}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const isSpecializedSkill = (skill: string, profileId: string): boolean => {
  const specializedSkillsByProfile: { [key: string]: string[] } = {
    "123": [ // AI Engineer
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "Natural Language Processing",
      "Computer Vision"
    ],
    "124": [ // Backend Engineer
      "Node.js",
      "Database Design",
      "API Development",
      "System Architecture",
      "Kubernetes"
    ],
    "125": [ // Frontend Engineer
      "React",
      "TypeScript",
      "Next.js",
      "Vue.js",
      "Webpack"
    ],
    "126": [ // Engineering Manager
      "System Design",
      "Technical Architecture",
      "Risk Management"
    ]
  };
  
  return specializedSkillsByProfile[profileId]?.some(spec => 
    skill.toLowerCase() === spec.toLowerCase()
  ) || false;
};

const isCommonSkill = (skill: string, profileId: string): boolean => {
  const commonSkillsByProfile: { [key: string]: string[] } = {
    "123": [ // AI Engineer
      "Python",
      "Problem Solving",
      "Technical Writing"
    ],
    "124": [ // Backend Engineer
      "Problem Solving",
      "Code Review",
      "Agile Methodologies"
    ],
    "125": [ // Frontend Engineer
      "Cross-browser Compatibility",
      "Responsive Design",
      "Problem Solving"
    ],
    "126": [ // Engineering Manager
      "Team Leadership",
      "Project Management",
      "Strategic Planning",
      "Stakeholder Management"
    ]
  };
  
  return commonSkillsByProfile[profileId]?.some(common => 
    skill.toLowerCase() === common.toLowerCase()
  ) || false;
};

const isCertificationSkill = (skill: string, profileId: string): boolean => {
  const certificationSkillsByProfile: { [key: string]: string[] } = {
    "123": [ // AI Engineer
      "AWS Certified Machine Learning - Specialty",
      "TensorFlow Developer Certificate",
      "Google Cloud Professional Machine Learning Engineer"
    ],
    "124": [ // Backend Engineer
      "AWS Certified Solutions Architect",
      "Kubernetes Administrator (CKA)",
      "MongoDB Professional Developer"
    ],
    "125": [ // Frontend Engineer
      "AWS Certified Developer - Associate",
      "Google Mobile Web Specialist",
      "Professional Scrum Developer"
    ],
    "126": [ // Engineering Manager
      "Project Management Professional (PMP)",
      "Certified Scrum Master (CSM)",
      "ITIL Foundation"
    ]
  };
  
  return certificationSkillsByProfile[profileId]?.some(cert => 
    skill.toLowerCase() === cert.toLowerCase()
  ) || false;
};