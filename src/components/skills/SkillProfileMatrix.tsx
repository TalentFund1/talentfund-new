import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [benchmarkType, setBenchmarkType] = useState("all");

  const skills = [
    { title: "Amazon Web Services", subcategory: "Web Services", level: "advanced", growth: "23%", salary: "$160,256", benchmarks: { J: true, B: true, O: false } },
    { title: "Software Development", subcategory: "Artificial Intelligence and Machine...", level: "advanced", growth: "23%", salary: "$164,608", benchmarks: { J: true, B: false, O: true } },
    { title: "Python", subcategory: "Natural Language Processing (NLP)", level: "intermediate", growth: "24%", salary: "$153,344", benchmarks: { J: false, B: true, O: true } },
    { title: "Computer Science", subcategory: "Artificial Intelligence and Machine...", level: "intermediate", growth: "26%", salary: "$161,536", benchmarks: { J: true, B: true, O: true } }
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
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jobDescription">Sort By Job Description</SelectItem>
                <SelectItem value="benchmark">Sort By Benchmark</SelectItem>
                <SelectItem value="occupation">Sort By Occupation</SelectItem>
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
