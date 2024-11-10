import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useSkills } from "./context/SkillsContext";
import { useRef, useState, useEffect } from "react";

const PAGE_SIZE = 10;

export const SkillProfileMatrix = () => {
  const { savedSkills, setSavedSkills, selectedCategory } = useSkills();
  const [sortBy, setSortBy] = useState("benchmark");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();
  const observerTarget = useRef(null);

  const allSkills = {
    specialized: [
      { title: "Amazon Web Services", subcategory: "Cloud Computing", level: "advanced", growth: "23%", salary: "$180,256", benchmarks: { J: true, B: true, O: true } },
      { title: "Python", subcategory: "Programming Languages", level: "advanced", growth: "24%", salary: "$173,344", benchmarks: { J: true, B: true, O: true } },
      { title: "Kubernetes", subcategory: "Container Orchestration", level: "advanced", growth: "21%", salary: "$178,208", benchmarks: { J: true, B: true, O: true } },
      { title: "TensorFlow", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "16%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
      { title: "PyTorch", subcategory: "Machine Learning Frameworks", level: "intermediate", growth: "18%", salary: "$182,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Natural Language Processing", subcategory: "AI Applications", level: "advanced", growth: "20%", salary: "$190,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Computer Vision", subcategory: "AI Applications", level: "intermediate", growth: "22%", salary: "$188,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Git", subcategory: "Version Control", level: "advanced", growth: "8%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } },
      { title: "SQL", subcategory: "Databases", level: "advanced", growth: "9%", salary: "$175,000", benchmarks: { J: true, B: true, O: true } },
      { title: "MongoDB", subcategory: "Databases", level: "intermediate", growth: "14%", salary: "$172,000", benchmarks: { J: true, B: true, O: true } },
      { title: "REST APIs", subcategory: "Web Development", level: "advanced", growth: "11%", salary: "$176,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Docker Compose", subcategory: "Container Orchestration", level: "intermediate", growth: "19%", salary: "$175,000", benchmarks: { J: true, B: true, O: true } },
      { title: "FastAPI", subcategory: "Web Frameworks", level: "intermediate", growth: "28%", salary: "$170,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Apache Spark", subcategory: "Big Data", level: "advanced", growth: "24%", salary: "$192,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Vue.js", subcategory: "Frontend Frameworks", level: "intermediate", growth: "20%", salary: "$168,000", benchmarks: { J: true, B: true, O: true } }
    ],
    common: [
      { title: "Problem Solving", subcategory: "Critical Thinking", level: "advanced", growth: "14%", salary: "$158,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Agile Leadership", subcategory: "Project Management", level: "advanced", growth: "16%", salary: "$162,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Cross-cultural Communication", subcategory: "Interpersonal Skills", level: "intermediate", growth: "13%", salary: "$156,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Team Management", subcategory: "Leadership", level: "advanced", growth: "15%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Strategic Planning", subcategory: "Business Skills", level: "intermediate", growth: "17%", salary: "$170,000", benchmarks: { J: true, B: true, O: true } }
    ],
    certifications: [
      { title: "Azure Solutions Architect", subcategory: "Cloud Certifications", level: "advanced", growth: "21%", salary: "$182,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Kubernetes Administrator (CKA)", subcategory: "Container Certifications", level: "advanced", growth: "23%", salary: "$178,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Professional Agile Leadership", subcategory: "Agile Certifications", level: "intermediate", growth: "17%", salary: "$155,000", benchmarks: { J: true, B: true, O: true } },
      { title: "AWS Certified Solutions Architect", subcategory: "Cloud Certifications", level: "advanced", growth: "22%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } }
    ]
  };

  const handleToggleSkill = (skillTitle: string) => {
    const newSavedSkills = new Set(savedSkills);
    if (newSavedSkills.has(skillTitle)) {
      newSavedSkills.delete(skillTitle);
    } else {
      newSavedSkills.add(skillTitle);
    }
    setSavedSkills(newSavedSkills);
    setIsDirty(true);
    
    toast({
      title: "Skill Updated",
      description: `${skillTitle} has been ${newSavedSkills.has(skillTitle) ? 'added to' : 'removed from'} your skills.`,
    });
  };

  const filteredSkills = (() => {
    let skills = [];
    if (selectedCategory === "specialized") {
      skills = allSkills.specialized;
    } else if (selectedCategory === "common") {
      skills = allSkills.common;
    } else if (selectedCategory === "certification") {
      skills = allSkills.certifications;
    } else {
      skills = [...allSkills.specialized, ...allSkills.common, ...allSkills.certifications];
    }

    return skills.sort((a, b) => {
      const aIsSaved = savedSkills.has(a.title);
      const bIsSaved = savedSkills.has(b.title);
      if (aIsSaved === bIsSaved) return 0;
      return aIsSaved ? -1 : 1;
    });
  })();

  const paginatedSkills = filteredSkills.slice(0, page * PAGE_SIZE);
  const hasMoreSkills = paginatedSkills.length < filteredSkills.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMoreSkills && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMoreSkills, loading]);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Skill Profile</h2>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {savedSkills.size}
            </span>
          </div>
          <Button>Add Skill</Button>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certifications</SelectItem>
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
            toggledSkills={savedSkills}
            onToggleSkill={handleToggleSkill}
          />
        </div>

        {hasMoreSkills && (
          <div ref={observerTarget} className="h-10" />
        )}
      </Card>
    </div>
  );
};
