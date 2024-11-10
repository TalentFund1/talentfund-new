import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "@/components/skills/SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "@/components/skills/context/ToggledSkillsContext";

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
    { title: "Amazon Web Services", subcategory: "Web Services", level: "advanced", growth: "23%", salary: "$180,256", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Development", subcategory: "Artificial Intelligence and Machine Learning", level: "advanced", growth: "23%", salary: "$184,608", benchmarks: { J: true, B: true, O: true } },
    { title: "Python", subcategory: "Natural Language Processing (NLP)", level: "intermediate", growth: "24%", salary: "$173,344", benchmarks: { J: true, B: true, O: true } },
    { title: "Computer Science", subcategory: "Artificial Intelligence and Machine Learning", level: "intermediate", growth: "26%", salary: "$181,536", benchmarks: { J: true, B: true, O: true } },
    { title: "Scalability", subcategory: "Artificial Intelligence and Machine Learning", level: "advanced", growth: "25%", salary: "$195,616", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Engineering", subcategory: "Software Development Tools", level: "advanced", growth: "23%", salary: "$180,512", benchmarks: { J: true, B: true, O: true } },
    { title: "Kubernetes", subcategory: "Artificial Intelligence and Machine Learning", level: "intermediate", growth: "21%", salary: "$178,208", benchmarks: { J: true, B: true, O: true } },
    { title: "TensorFlow", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "28%", salary: "$192,450", benchmarks: { J: true, B: true, O: true } },
    { title: "PyTorch", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "30%", salary: "$195,750", benchmarks: { J: true, B: true, O: true } },
    { title: "Deep Learning", subcategory: "Artificial Intelligence", level: "advanced", growth: "27%", salary: "$198,320", benchmarks: { J: true, B: true, O: true } },
    { title: "Natural Language Processing", subcategory: "AI Applications", level: "advanced", growth: "25%", salary: "$190,450", benchmarks: { J: true, B: true, O: true } },
    { title: "Computer Vision", subcategory: "AI Applications", level: "intermediate", growth: "26%", salary: "$188,600", benchmarks: { J: true, B: true, O: true } },
    { title: "MLOps", subcategory: "DevOps", level: "intermediate", growth: "29%", salary: "$185,750", benchmarks: { J: true, B: true, O: true } },
    { title: "Docker", subcategory: "Container Technologies", level: "advanced", growth: "22%", salary: "$175,900", benchmarks: { J: true, B: true, O: true } },
    { title: "Git", subcategory: "Version Control", level: "advanced", growth: "20%", salary: "$170,500", benchmarks: { J: true, B: true, O: true } },
    { title: "SQL", subcategory: "Databases", level: "advanced", growth: "21%", salary: "$176,800", benchmarks: { J: true, B: true, O: true } },
    { title: "MongoDB", subcategory: "Databases", level: "intermediate", growth: "23%", salary: "$178,900", benchmarks: { J: true, B: true, O: true } },
    { title: "REST APIs", subcategory: "Web Development", level: "advanced", growth: "22%", salary: "$182,300", benchmarks: { J: true, B: true, O: true } }
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
            paginatedSkills={paginatedSkills}
            toggledSkills={toggledSkills}
            onToggleSkill={handleToggleSkill}
          />
        </div>
      </Card>
    </div>
  );
};
