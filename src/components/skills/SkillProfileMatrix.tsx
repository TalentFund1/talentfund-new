import React, { useState, useRef, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "./context/SelectedSkillsContext";

const PAGE_SIZE = 10;

export const SkillProfileMatrix = () => {
  const { selectedSkills, setSelectedSkills } = useSelectedSkills();
  const [toggledSkills, setToggledSkills] = useState<Set<string>>(() => new Set(selectedSkills));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const { toast } = useToast();

  // Updated skills data with more entries and proper categorization
  const allSkills = {
    specialized: [
      { title: "Amazon Web Services", subcategory: "Cloud Computing", level: "advanced", growth: "23%", salary: "$180,256", benchmarks: { J: true, B: true, O: true } },
      { title: "Artificial Intelligence", subcategory: "AI/ML", level: "advanced", growth: "25%", salary: "$190,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Machine Learning", subcategory: "AI/ML", level: "advanced", growth: "24%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Deep Learning", subcategory: "AI/ML", level: "advanced", growth: "28%", salary: "$190,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Natural Language Processing", subcategory: "AI Applications", level: "advanced", growth: "26%", salary: "$188,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Computer Vision", subcategory: "AI Applications", level: "advanced", growth: "25%", salary: "$187,000", benchmarks: { J: true, B: true, O: true } },
      { title: "MLOps", subcategory: "AI/ML Operations", level: "intermediate", growth: "22%", salary: "$175,000", benchmarks: { J: true, B: true, O: true } },
      { title: "TensorFlow", subcategory: "ML Frameworks", level: "intermediate", growth: "20%", salary: "$175,000", benchmarks: { J: true, B: true, O: true } },
      { title: "PyTorch", subcategory: "ML Frameworks", level: "intermediate", growth: "21%", salary: "$176,000", benchmarks: { J: true, B: true, O: true } }
    ],
    common: [
      { title: "Python", subcategory: "Programming Languages", level: "advanced", growth: "24%", salary: "$173,344", benchmarks: { J: true, B: true, O: true } },
      { title: "Git", subcategory: "Version Control", level: "advanced", growth: "18%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } },
      { title: "SQL", subcategory: "Database", level: "advanced", growth: "19%", salary: "$172,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Docker", subcategory: "DevOps Tools", level: "intermediate", growth: "22%", salary: "$170,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Linux", subcategory: "Operating Systems", level: "intermediate", growth: "20%", salary: "$168,000", benchmarks: { J: true, B: true, O: true } },
      { title: "REST APIs", subcategory: "Web Development", level: "intermediate", growth: "21%", salary: "$176,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Agile Methodologies", subcategory: "Project Management", level: "intermediate", growth: "17%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", salary: "$160,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Communication", subcategory: "Soft Skills", level: "intermediate", growth: "16%", salary: "$162,000", benchmarks: { J: true, B: true, O: true } }
    ],
    certification: [
      { title: "AWS Certified Machine Learning - Specialty", subcategory: "Cloud", level: "advanced", growth: "24%", salary: "$190,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Google Cloud Professional Machine Learning Engineer", subcategory: "Cloud", level: "advanced", growth: "23%", salary: "$188,000", benchmarks: { J: true, B: true, O: true } },
      { title: "TensorFlow Developer Certificate", subcategory: "ML Frameworks", level: "intermediate", growth: "20%", salary: "$175,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Microsoft Azure AI Engineer Associate", subcategory: "Cloud", level: "advanced", growth: "22%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Certified Information Systems Security Professional (CISSP)", subcategory: "Security", level: "advanced", growth: "21%", salary: "$180,000", benchmarks: { J: true, B: true, O: true } }
    ]
  };

  const getSkillsByCategory = (category: string) => {
    if (category === 'all') {
      return [...allSkills.specialized, ...allSkills.common, ...allSkills.certification];
    }
    return allSkills[category as keyof typeof allSkills] || [];
  };

  const handleToggleSkill = (skillTitle: string) => {
    setHasUnsavedChanges(true);
    setToggledSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillTitle)) {
        newSet.delete(skillTitle);
      } else {
        newSet.add(skillTitle);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    setSelectedSkills(Array.from(toggledSkills));
    setHasUnsavedChanges(false);
    toast({
      title: "Changes saved",
      description: "Your skill selections have been updated.",
    });
  };

  const handleCancel = () => {
    setToggledSkills(new Set(selectedSkills));
    setHasUnsavedChanges(false);
    toast({
      title: "Changes cancelled",
      description: "Your skill selections have been reset.",
    });
  };

  const paginatedSkills = getSkillsByCategory(skillType).slice(0, page * PAGE_SIZE);

  const lastSkillElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          const totalSkills = getSkillsByCategory(skillType).length;
          if (nextPage * PAGE_SIZE >= totalSkills) {
            setHasMore(false);
            toast({
              title: "End of list",
              description: "You've reached the end of the skills list.",
            });
          }
          return nextPage;
        });
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, skillType]);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Skill Profile</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={!hasUnsavedChanges}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
            >
              Save
            </Button>
          </div>
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
          <Button>Add Skill</Button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <SkillProfileMatrixTable 
            paginatedSkills={paginatedSkills} 
            lastSkillElementRef={lastSkillElementRef}
            toggledSkills={toggledSkills}
            onToggleSkill={handleToggleSkill}
          />
        </div>
      </Card>
    </div>
  );
};