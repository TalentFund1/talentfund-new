import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { SkillProfileMatrixPagination } from "./SkillProfileMatrixPagination";

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const skills = [
    { title: "Amazon Web Services", subcategory: "Web Services", level: "advanced", growth: "23%", salary: "$180,256", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Development", subcategory: "Artificial Intelligence and Machine...", level: "advanced", growth: "23%", salary: "$184,608", benchmarks: { J: true, B: true, O: true } },
    { title: "Python", subcategory: "Natural Language Processing (NLP)", level: "intermediate", growth: "24%", salary: "$173,344", benchmarks: { J: true, B: true, O: true } },
    { title: "Computer Science", subcategory: "Artificial Intelligence and Machine...", level: "intermediate", growth: "26%", salary: "$181,536", benchmarks: { J: true, B: true, O: true } },
    { title: "Scalability", subcategory: "Artificial Intelligence and Machine...", level: "advanced", growth: "25%", salary: "$195,616", benchmarks: { J: true, B: true, O: true } },
    { title: "Software Engineering", subcategory: "Software Development Tools", level: "advanced", growth: "23%", salary: "$180,512", benchmarks: { J: true, B: true, O: true } },
    { title: "Kubernetes", subcategory: "Artificial Intelligence and Machine...", level: "intermediate", growth: "21%", salary: "$178,208", benchmarks: { J: true, B: true, O: true } }
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

  const totalPages = Math.ceil(skills.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedSkills = skills.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

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
                <SelectValue placeholder="All Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
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
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <SkillProfileMatrixTable paginatedSkills={paginatedSkills} />
        </div>

        <SkillProfileMatrixPagination
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          totalSkills={skills.length}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};