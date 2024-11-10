import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PAGE_SIZE = 10;

const roleSkills = {
  "123": { // AI Engineer
    specialized: [
      { title: "Machine Learning", subcategory: "Artificial Intelligence", level: "advanced", growth: "30%", salary: "$180,256", benchmarks: { J: true, B: true, O: true } },
      { title: "Deep Learning", subcategory: "Artificial Intelligence", level: "advanced", growth: "25%", salary: "$182,000", benchmarks: { J: true, B: true, O: true } },
      { title: "TensorFlow", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "20%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
      { title: "PyTorch", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "24%", salary: "$182,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Computer Vision", subcategory: "AI Applications", level: "advanced", growth: "22%", salary: "$188,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Natural Language Processing", subcategory: "AI Applications", level: "advanced", growth: "28%", salary: "$190,000", benchmarks: { J: true, B: true, O: true } }
    ],
    common: [
      { title: "Python", subcategory: "Programming Languages", level: "advanced", growth: "15%", salary: "$173,344", benchmarks: { J: true, B: true, O: true } },
      { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", salary: "$158,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Technical Writing", subcategory: "Communication", level: "intermediate", growth: "12%", salary: "$156,000", benchmarks: { J: true, B: true, O: true } }
    ],
    certifications: [
      { title: "AWS Certified Machine Learning - Specialty", subcategory: "Cloud Certification", level: "advanced", growth: "25%", salary: "$182,000", benchmarks: { J: true, B: true, O: true } },
      { title: "TensorFlow Developer Certificate", subcategory: "AI Certification", level: "advanced", growth: "20%", salary: "$178,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Google Cloud Professional Machine Learning Engineer", subcategory: "Cloud Certification", level: "advanced", growth: "28%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } }
    ]
  },
  "124": { // Backend Engineer
    specialized: [
      { title: "Node.js", subcategory: "Backend Development", level: "advanced", growth: "20%", salary: "$175,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Database Design", subcategory: "Data Management", level: "advanced", growth: "15%", salary: "$172,000", benchmarks: { J: true, B: true, O: true } },
      { title: "API Development", subcategory: "Backend Development", level: "advanced", growth: "25%", salary: "$178,000", benchmarks: { J: true, B: true, O: true } },
      { title: "System Architecture", subcategory: "Software Architecture", level: "intermediate", growth: "30%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Kubernetes", subcategory: "Container Orchestration", level: "advanced", growth: "28%", salary: "$178,208", benchmarks: { J: true, B: true, O: true } }
    ],
    common: [
      { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", salary: "$158,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Code Review", subcategory: "Development Practices", level: "advanced", growth: "12%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Agile Methodologies", subcategory: "Project Management", level: "advanced", growth: "15%", salary: "$162,000", benchmarks: { J: true, B: true, O: true } }
    ],
    certifications: [
      { title: "AWS Certified Solutions Architect", subcategory: "Cloud Certification", level: "advanced", growth: "30%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Kubernetes Administrator (CKA)", subcategory: "Container Certification", level: "advanced", growth: "25%", salary: "$178,000", benchmarks: { J: true, B: true, O: true } },
      { title: "MongoDB Professional Developer", subcategory: "Database Certification", level: "advanced", growth: "20%", salary: "$172,000", benchmarks: { J: true, B: true, O: true } }
    ]
  },
  "125": { // Frontend Engineer
    specialized: [
      { title: "React", subcategory: "Frontend Frameworks", level: "advanced", growth: "20%", salary: "$170,000", benchmarks: { J: true, B: true, O: true } },
      { title: "TypeScript", subcategory: "Programming Languages", level: "advanced", growth: "25%", salary: "$175,000", benchmarks: { J: true, B: true, O: true } },
      { title: "UI/UX Design", subcategory: "Design", level: "intermediate", growth: "30%", salary: "$168,000", benchmarks: { J: true, B: true, O: true } },
      { title: "CSS/SASS", subcategory: "Styling", level: "advanced", growth: "15%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Next.js", subcategory: "Frontend Frameworks", level: "advanced", growth: "28%", salary: "$172,000", benchmarks: { J: true, B: true, O: true } }
    ],
    common: [
      { title: "Cross-browser Compatibility", subcategory: "Frontend Development", level: "advanced", growth: "12%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Responsive Design", subcategory: "Web Development", level: "advanced", growth: "18%", salary: "$168,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", salary: "$158,000", benchmarks: { J: true, B: true, O: true } }
    ],
    certifications: [
      { title: "AWS Certified Developer - Associate", subcategory: "Cloud Certification", level: "intermediate", growth: "25%", salary: "$170,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Google Mobile Web Specialist", subcategory: "Web Development Certification", level: "advanced", growth: "20%", salary: "$168,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Professional Scrum Developer", subcategory: "Development Certification", level: "intermediate", growth: "15%", salary: "$165,000", benchmarks: { J: true, B: true, O: true } }
    ]
  },
  "126": { // Engineering Manager
    specialized: [
      { title: "System Design", subcategory: "Architecture", level: "advanced", growth: "25%", salary: "$192,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Technical Architecture", subcategory: "Architecture", level: "advanced", growth: "30%", salary: "$195,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Risk Management", subcategory: "Management", level: "advanced", growth: "20%", salary: "$190,000", benchmarks: { J: true, B: true, O: true } }
    ],
    common: [
      { title: "Team Leadership", subcategory: "Leadership", level: "advanced", growth: "22%", salary: "$188,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Project Management", subcategory: "Management", level: "advanced", growth: "25%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Strategic Planning", subcategory: "Management", level: "advanced", growth: "30%", salary: "$192,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Stakeholder Management", subcategory: "Leadership", level: "advanced", growth: "22%", salary: "$188,000", benchmarks: { J: true, B: true, O: true } }
    ],
    certifications: [
      { title: "Project Management Professional (PMP)", subcategory: "Management Certification", level: "advanced", growth: "25%", salary: "$190,000", benchmarks: { J: true, B: true, O: true } },
      { title: "Certified Scrum Master (CSM)", subcategory: "Agile Certification", level: "advanced", growth: "20%", salary: "$185,000", benchmarks: { J: true, B: true, O: true } },
      { title: "ITIL Foundation", subcategory: "IT Service Management", level: "intermediate", growth: "15%", salary: "$182,000", benchmarks: { J: true, B: true, O: true } }
    ]
  }
};

export const SkillProfileMatrix = () => {
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();
  const observerTarget = useRef(null);
  const { id } = useParams<{ id: string }>();

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

  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const filteredSkills = (() => {
    let skills = [];
    if (skillType === "all") {
      skills = [...currentRoleSkills.specialized, ...currentRoleSkills.common, ...currentRoleSkills.certifications];
    } else if (skillType === "specialized") {
      skills = currentRoleSkills.specialized;
    } else if (skillType === "common") {
      skills = currentRoleSkills.common;
    } else if (skillType === "certification") {
      skills = currentRoleSkills.certifications;
    }

    return skills.sort((a, b) => {
      const aIsSaved = toggledSkills.has(a.title);
      const bIsSaved = toggledSkills.has(b.title);
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
              {toggledSkills.size}
            </span>
          </div>
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

        {hasMoreSkills && (
          <div ref={observerTarget} className="h-10" />
        )}
      </Card>
    </div>
  );
};