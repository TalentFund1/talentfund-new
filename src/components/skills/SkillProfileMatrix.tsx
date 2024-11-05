import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [benchmarkType, setBenchmarkType] = useState("all");

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
      return b.benchmarks.J - a.benchmarks.J;
    }
    if (sortBy === "benchmark") {
      return b.benchmarks.B - a.benchmarks.B;
    }
    if (sortBy === "occupation") {
      return b.benchmarks.O - a.benchmarks.O;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Skill Profile</h2>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Select value={skillType} onValueChange={setSkillType}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Skills" />
              </SelectTrigger>
              <SelectContent align="end" className="w-[280px]">
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider delayDuration={300}>
              <Select value={skillType} onValueChange={setSkillType}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="All Skill Types" />
                </SelectTrigger>
                <SelectContent align="end" className="w-[280px]">
                  <SelectItem value="all">All Skill Types</SelectItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value="defining">Defining Skills</SelectItem>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      <p>Skills needed to qualify for a job and perform day-to-day tasks and responsibilities successfully.</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value="distinguishing">Distinguishing Skills</SelectItem>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      <p>Skills that highlight technical proficiency and differentiate job seekers from other candidates.</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value="necessary">Necessary Skills</SelectItem>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px]">
                      <p>Skills required for a specific job, relevant across other similar jobs, and are building blocks for performing more complex defining skills.</p>
                    </TooltipContent>
                  </Tooltip>
                </SelectContent>
              </Select>
            </TooltipProvider>
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
          <table className="w-full">
            <thead>
              <tr className="bg-background text-left">
                <th className="py-3 px-4 font-medium w-[25%]">Skill Title</th>
                <th className="py-3 px-4 font-medium w-[30%]">Subcategory</th>
                <th className="py-3 px-4 font-medium text-center w-[15%]">Projected Growth</th>
                <th className="py-3 px-4 font-medium text-right w-[15%]">Salary With Skill</th>
                <th className="py-3 px-4 font-medium text-center w-[15%]">Benchmark</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.title} className="border-t border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Switch />
                      <span className="text-sm">{skill.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className="block truncate" title={skill.subcategory}>
                      {skill.subcategory}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm">
                      ↗ {skill.growth}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm">{skill.salary}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-[#8073ec]/20 text-primary flex items-center justify-center text-sm font-medium">J</span>
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">B</span>
                      <span className="w-6 h-6 rounded-full bg-primary-icon/10 text-primary-icon flex items-center justify-center text-sm font-medium">O</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
