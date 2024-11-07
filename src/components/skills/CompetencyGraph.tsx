import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody } from "@/components/ui/table";
import { CompetencyTableHeader } from "./competency/CompetencyTableHeader";
import { CompetencySkillRow } from "./competency/CompetencySkillRow";

interface CompetencyGraphProps {
  track: "Professional" | "Managerial";
}

export const CompetencyGraph = ({ track }: CompetencyGraphProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });

  const [currentTrack] = useState<"Professional" | "Managerial">(track);
  const levels = currentTrack === "Professional" ? ["P1", "P2", "P3", "P4", "P5", "P6"] : ["M3", "M4", "M5", "M6"];

  const professionalSkills = {
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

  const managerialSkills = {
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

  const getSkillsForCategory = () => {
    const categoryData = skillsByCategory[selectedCategory as keyof typeof skillsByCategory];
    return currentTrack === "Professional" ? categoryData.professional : categoryData.managerial;
  };

  const skills = getSkillsForCategory();
  const uniqueSkills = Array.from(
    new Set(
      Object.values(skills)
        .flat()
        .map((skill) => skill.name)
    )
  );

  const getSkillDetails = (skillName: string, level: string) => {
    const skillLevel = skills[level]?.find((s) => s.name === skillName);
    return skillLevel || { level: "-", required: "-" };
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
          <CompetencyTableHeader levels={levels} />
          <TableBody>
            {uniqueSkills.map((skillName) => (
              <CompetencySkillRow
                key={skillName}
                skillName={skillName}
                levels={levels}
                getSkillDetails={getSkillDetails}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
