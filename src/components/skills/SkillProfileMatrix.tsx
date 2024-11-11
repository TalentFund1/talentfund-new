import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Move roleSkills to a separate file to reduce file size
import { roleSkills } from './data/roleSkills';

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
  const observerTarget = useRef(null);
  const { id } = useParams<{ id: string }>();

  // Reset toggled skills when profile changes
  useEffect(() => {
    setToggledSkills(new Set());
  }, [id, setToggledSkills]);

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

  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMoreSkills && !loading) {
        setPage((prev) => prev + 1);
      }
    }, { threshold: 0.1 });

    const currentObserverTarget = observerTarget.current;
    if (currentObserverTarget) {
      observer.current.observe(currentObserverTarget);
    }

    return () => {
      if (currentObserverTarget) {
        observer.current.unobserve(currentObserverTarget);
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
