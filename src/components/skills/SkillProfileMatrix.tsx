import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";

const PAGE_SIZE = 10;

export const SkillProfileMatrix = () => {
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  const allSkills = [
    // Existing Technical Skills
    { title: "Amazon Web Services", subcategory: "Web Services", level: "advanced", growth: "23%", salary: "$180,256", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Development", subcategory: "Artificial Intelligence and Machine Learning", level: "advanced", growth: "23%", salary: "$184,608", benchmarks: { J: true, B: true, O: true } },
    { title: "Python", subcategory: "Programming Languages", level: "advanced", growth: "24%", salary: "$173,344", benchmarks: { J: true, B: true, O: true } },
    { title: "Computer Science", subcategory: "Artificial Intelligence and Machine Learning", level: "intermediate", growth: "26%", salary: "$181,536", benchmarks: { J: true, B: true, O: true } },
    { title: "Scalability", subcategory: "Artificial Intelligence and Machine Learning", level: "advanced", growth: "25%", salary: "$195,616", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Engineering", subcategory: "Software Development Tools", level: "advanced", growth: "23%", salary: "$180,512", benchmarks: { J: true, B: true, O: true } },
    { title: "Kubernetes", subcategory: "Container Orchestration", level: "advanced", growth: "21%", salary: "$178,208", benchmarks: { J: true, B: true, O: true } },
    { title: "TensorFlow", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "16%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
    { title: "PyTorch", subcategory: "Machine Learning Frameworks", level: "intermediate", growth: "18%", salary: "$182,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Natural Language Processing", subcategory: "AI Applications", level: "advanced", growth: "20%", salary: "$190,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Computer Vision", subcategory: "AI Applications", level: "intermediate", growth: "22%", salary: "$188,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Git", subcategory: "Version Control", level: "advanced", growth: "8%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } },
    { title: "SQL", subcategory: "Databases", level: "advanced", growth: "9%", salary: "$175,000", benchmarks: { J: true, B: true, O: true } },
    { title: "MongoDB", subcategory: "Databases", level: "intermediate", growth: "14%", salary: "$172,000", benchmarks: { J: true, B: true, O: true } },
    { title: "REST APIs", subcategory: "Web Development", level: "advanced", growth: "11%", salary: "$176,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Data Science", subcategory: "Analytics", level: "intermediate", growth: "21%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
    
    // New Technical Skills
    { title: "GraphQL", subcategory: "API Development", level: "intermediate", growth: "25%", salary: "$178,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Rust", subcategory: "Programming Languages", level: "intermediate", growth: "30%", salary: "$195,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Blockchain", subcategory: "Distributed Systems", level: "beginner", growth: "28%", salary: "$190,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Cybersecurity", subcategory: "Security", level: "advanced", growth: "27%", salary: "$198,000", benchmarks: { J: true, B: true, O: true } },
    
    // Soft Skills
    { title: "Project Management", subcategory: "Leadership", level: "advanced", growth: "15%", salary: "$160,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Team Leadership", subcategory: "Leadership", level: "intermediate", growth: "18%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Communication", subcategory: "Interpersonal Skills", level: "advanced", growth: "12%", salary: "$155,000", benchmarks: { J: true, B: true, O: true } },
    
    // Certifications
    { title: "AWS Solutions Architect", subcategory: "Cloud Certifications", level: "advanced", growth: "20%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Google Cloud Professional", subcategory: "Cloud Certifications", level: "intermediate", growth: "22%", salary: "$180,000", benchmarks: { J: true, B: true, O: true } },
    { title: "Certified Scrum Master", subcategory: "Agile Certifications", level: "intermediate", growth: "15%", salary: "$150,000", benchmarks: { J: true, B: true, O: true } }
  ];

  const handleToggleSkill = (skillTitle: string) => {
    const newToggledSkills = new Set(toggledSkills);
    if (newToggledSkills.has(skillTitle)) {
      newToggledSkills.delete(skillTitle);
    } else {
      newToggledSkills.add(skillTitle);
    }
    setToggledSkills(newToggledSkills);
    setIsDirty(true);
    
    toast({
      title: "Skill Updated",
      description: `${skillTitle} has been ${newToggledSkills.has(skillTitle) ? 'added to' : 'removed from'} your skills.`,
    });
  };

  const paginatedSkills = allSkills.slice(0, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Skill Profile</h2>
          <Button>Add Skill</Button>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Select value={skillType} onValueChange={setSkillType}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Sort by All</SelectItem>
                <SelectItem value="jobDescription">Sort by Job Description</SelectItem>
                <SelectItem value="benchmark">Sort by Benchmark</SelectItem>
                <SelectItem value="occupation">Sort by Occupation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <SkillProfileMatrixTable 
            paginatedSkills={allSkills.slice(0, page * PAGE_SIZE)}
            toggledSkills={toggledSkills}
            onToggleSkill={handleToggleSkill}
          />
        </div>
      </Card>
    </div>
  );
