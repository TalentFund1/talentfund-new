import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { SkillCell } from "./competency/SkillCell";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Skill = {
  name: string;
  level: string;
  required: string;
};

type SkillLevels = {
  [key: string]: Skill[];
};

const professionalSkills: SkillLevels = {
  "P1": [
    { name: "Amazon Web Services", level: "beginner", required: "required" },
    { name: "Python", level: "intermediate", required: "required" },
    { name: "Machine Learning", level: "beginner", required: "preferred" },
  ],
  "P2": [
    { name: "Amazon Web Services", level: "intermediate", required: "required" },
    { name: "Python", level: "intermediate", required: "required" },
    { name: "Machine Learning", level: "intermediate", required: "required" },
  ],
  "P3": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
  ],
  "P4": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "System Design", level: "advanced", required: "required" },
  ],
  "P5": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "System Design", level: "advanced", required: "required" },
    { name: "Technical Leadership", level: "intermediate", required: "required" },
  ],
  "P6": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "System Design", level: "advanced", required: "required" },
    { name: "Technical Leadership", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
  ],
};

const managerialSkills: SkillLevels = {
  "M3": [
    { name: "Team Leadership", level: "intermediate", required: "required" },
    { name: "Project Management", level: "intermediate", required: "required" },
    { name: "Technical Architecture", level: "intermediate", required: "preferred" },
  ],
  "M4": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "intermediate", required: "required" },
  ],
  "M5": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
    { name: "Organizational Development", level: "intermediate", required: "required" },
  ],
  "M6": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
    { name: "Organizational Development", level: "advanced", required: "required" },
    { name: "Business Strategy", level: "advanced", required: "required" },
  ],
};

// Categorized skills
const skillsByCategory = {
  all: {
    professional: {
      ...professionalSkills,
    },
    managerial: {
      ...managerialSkills,
    }
  },
  specialized: {
    professional: {
      "P1": [
        { name: "Amazon Web Services", level: "beginner", required: "required" },
        { name: "Machine Learning", level: "beginner", required: "preferred" },
      ],
      "P2": [
        { name: "Amazon Web Services", level: "intermediate", required: "required" },
        { name: "Machine Learning", level: "intermediate", required: "required" },
      ],
      "P3": [
        { name: "Amazon Web Services", level: "advanced", required: "required" },
        { name: "Machine Learning", level: "advanced", required: "required" },
      ],
    },
    managerial: {
      "M3": [
        { name: "Technical Architecture", level: "intermediate", required: "preferred" },
      ],
      "M4": [
        { name: "Technical Architecture", level: "advanced", required: "required" },
      ],
    }
  },
  common: {
    professional: {
      "P1": [
        { name: "Python", level: "intermediate", required: "required" },
      ],
      "P2": [
        { name: "Python", level: "intermediate", required: "required" },
      ],
      "P3": [
        { name: "Python", level: "advanced", required: "required" },
      ],
    },
    managerial: {
      "M3": [
        { name: "Team Leadership", level: "intermediate", required: "required" },
        { name: "Project Management", level: "intermediate", required: "required" },
      ],
      "M4": [
        { name: "Team Leadership", level: "advanced", required: "required" },
        { name: "Project Management", level: "advanced", required: "required" },
      ],
    }
  },
  certification: {
    professional: {
      "P1": [
        { name: "AWS Certified Cloud Practitioner", level: "beginner", required: "preferred" },
      ],
      "P2": [
        { name: "AWS Certified Developer", level: "intermediate", required: "required" },
      ],
      "P3": [
        { name: "AWS Certified Solutions Architect", level: "advanced", required: "required" },
      ],
    },
    managerial: {
      "M3": [
        { name: "Project Management Professional (PMP)", level: "intermediate", required: "preferred" },
      ],
      "M4": [
        { name: "Project Management Professional (PMP)", level: "advanced", required: "required" },
      ],
    }
  }
};

interface CompetencyGraphProps {
  track: "Professional" | "Managerial";
}

export const CompetencyGraph = ({ track }: CompetencyGraphProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });

  const [currentTrack, setCurrentTrack] = useState<"Professional" | "Managerial">(track);

  useEffect(() => {
    setCurrentTrack(track);
  }, [track]);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  const getSkillsForCategory = () => {
    const categoryData = skillsByCategory[selectedCategory as keyof typeof skillsByCategory];
    return currentTrack === "Professional" ? categoryData.professional : categoryData.managerial;
  };

  const skills = getSkillsForCategory();
  const levels = currentTrack === "Professional" ? ["P1", "P2", "P3", "P4", "P5", "P6"] : ["M3", "M4", "M5", "M6"];

  const uniqueSkills = Array.from(
    new Set(
      Object.values(skills)
        .flat()
        .map((skill) => skill.name)
    )
  );

  const getSkillDetails = (skillName: string, level: string) => {
    const skillLevel = skills[level];
    return skillLevel?.find((s) => s.name === skillName) || { level: "-", required: "-" };
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Competency Graph</h2>
        <div className="mb-6">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="specialized">Specialized Skills</SelectItem>
              <SelectItem value="common">Common Skills</SelectItem>
              <SelectItem value="certification">Certification</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-4" />
      </div>

      <div className="rounded-lg border border-border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px] font-semibold bg-background/80 border-r border-border">Skill</TableHead>
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
                <TableCell className="font-medium border-r border-border">{skillName}</TableCell>
                {levels.map((level, index) => (
                  <SkillCell 
                    key={level}
                    details={getSkillDetails(skillName, level)}
                    isLastColumn={index === levels.length - 1}
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
