import React, { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { useToast } from "@/components/ui/use-toast";

// Initial page size
const PAGE_SIZE = 10;

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const { toast } = useToast();

  // Simulated skills data - in a real app, this would come from an API
  const allSkills = [
    { title: "Amazon Web Services", subcategory: "Web Services", level: "advanced", growth: "23%", salary: "$180,256", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Development", subcategory: "Artificial Intelligence and Machine...", level: "advanced", growth: "23%", salary: "$184,608", benchmarks: { J: true, B: true, O: true } },
    { title: "Python", subcategory: "Natural Language Processing (NLP)", level: "intermediate", growth: "24%", salary: "$173,344", benchmarks: { J: true, B: true, O: true } },
    { title: "Computer Science", subcategory: "Artificial Intelligence and Machine...", level: "intermediate", growth: "26%", salary: "$181,536", benchmarks: { J: true, B: true, O: true } },
    { title: "Scalability", subcategory: "Artificial Intelligence and Machine...", level: "advanced", growth: "25%", salary: "$195,616", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Engineering", subcategory: "Software Development Tools", level: "advanced", growth: "23%", salary: "$180,512", benchmarks: { J: true, B: true, O: true } },
    { title: "Kubernetes", subcategory: "Artificial Intelligence and Machine...", level: "intermediate", growth: "21%", salary: "$178,208", benchmarks: { J: true, B: true, O: true } }
  ];

  // Calculate the current page of skills
  const paginatedSkills = allSkills.slice(0, page * PAGE_SIZE);

  const lastSkillElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          if (nextPage * PAGE_SIZE >= allSkills.length) {
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
  }, [loading, hasMore]);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Skill Profile</h2>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
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

            <Select value={skillType} onValueChange={setSkillType}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Skill Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skill Types</SelectItem>
                <SelectItem value="defining">Defining Skills</SelectItem>
                <SelectItem value="distinguishing">Distinguishing Skills</SelectItem>
                <SelectItem value="necessary">Necessary Skills</SelectItem>
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
          />
        </div>
      </Card>
    </div>
  );
};