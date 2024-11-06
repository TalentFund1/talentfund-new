import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { SkillProfileTableHeader } from "./SkillProfileTableHeader";
import { SkillProfileTableRow } from "./SkillProfileTableRow";

const INITIAL_VISIBLE_ITEMS = 5;
const ITEMS_TO_LOAD = 5;

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [benchmarkType, setBenchmarkType] = useState("all");
  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);

  const skills = [
    { title: "Amazon Web Services", subcategory: "Web Services", level: "advanced", growth: "23%", salary: "$160,256", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Development", subcategory: "Artificial Intelligence and Machine...", level: "advanced", growth: "23%", salary: "$164,608", benchmarks: { J: true, B: true, O: true } },
    { title: "Python", subcategory: "Natural Language Processing (NLP)", level: "intermediate", growth: "24%", salary: "$153,344", benchmarks: { J: true, B: true, O: true } },
    { title: "Computer Science", subcategory: "Artificial Intelligence and Machine...", level: "intermediate", growth: "26%", salary: "$161,536", benchmarks: { J: true, B: true, O: true } },
    { title: "Scalability", subcategory: "Artificial Intelligence and Machine...", level: "advanced", growth: "25%", salary: "$175,616", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Engineering", subcategory: "Software Development Tools", level: "advanced", growth: "23%", salary: "$160,512", benchmarks: { J: true, B: true, O: true } },
    { title: "Kubernetes", subcategory: "Artificial Intelligence and Machine...", level: "intermediate", growth: "21%", salary: "$158,208", benchmarks: { J: true, B: true, O: true } }
  ].sort((a, b) => {
    if (sortBy === "jobDescription") {
      return Number(b.benchmarks.J) - Number(a.benchmarks.J);
    }
    if (sortBy === "benchmark") {
      return Number(b.benchmarks.B) - Number(a.benchmarks.B);
    }
    if (sortBy === "occupation") {
      return Number(b.benchmarks.O) - Number(a.benchmarks.O);
    }
    return 0;
  });

  const handleShowMore = () => {
    setVisibleItems(prev => Math.min(prev + ITEMS_TO_LOAD, skills.length));
  };

  const visibleSkills = skills.slice(0, visibleItems);
  const hasMoreItems = visibleItems < skills.length;

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Skill Profile</h2>
          <div className="flex gap-2">
            <Button>Save</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Select value={skillType} onValueChange={setSkillType}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider>
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
            </TooltipProvider>
          </div>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <SkillProfileTableHeader />
            <tbody>
              {visibleSkills.map((skill) => (
                <SkillProfileTableRow key={skill.title} skill={skill} />
              ))}
            </tbody>
          </table>
        </div>

        {hasMoreItems && (
          <div className="flex justify-center pt-4">
            <Button 
              variant="outline" 
              onClick={handleShowMore}
              className="px-6"
            >
              Show More ({skills.length - visibleItems} remaining)
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};