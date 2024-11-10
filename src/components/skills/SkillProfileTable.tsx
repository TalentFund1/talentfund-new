import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { SkillProfileItem } from "./types";
import { useState, useEffect } from "react";

interface SkillProfileTableProps {
  skills: SkillProfileItem[];
  onSkillToggle: (skillTitle: string) => void;
  selectedSkills: string[];
}

export const SkillProfileTable = ({ skills, onSkillToggle, selectedSkills }: SkillProfileTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border bg-[#F7F9FF]">
          <TableHead className="w-[25%] h-12">Skill Title</TableHead>
          <TableHead className="w-[25%] h-12">Subcategory</TableHead>
          <TableHead className="w-[15%] text-center h-12">Projected Growth</TableHead>
          <TableHead className="w-[15%] text-center h-12">Salary With Skill</TableHead>
          <TableHead className="w-[20%] text-center h-12">Appears In</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skills.map((skill) => (
          <TableRow key={skill.title} className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
            <TableCell className="align-middle">
              <div className="flex items-center gap-2">
                <Switch
                  checked={selectedSkills.includes(skill.title)}
                  onCheckedChange={() => onSkillToggle(skill.title)}
                />
                <span>{skill.title}</span>
              </div>
            </TableCell>
            <TableCell className="align-middle">{skill.subcategory}</TableCell>
            <TableCell className="text-center align-middle">
              <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-sm bg-green-100 text-green-800">
                ↗ {skill.growth}
              </span>
            </TableCell>
            <TableCell className="text-center align-middle">{skill.salary}</TableCell>
            <TableCell className="text-center align-middle">
              <div className="flex justify-center gap-2">
                {skill.benchmarks.J && (
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">J</span>
                )}
                {skill.benchmarks.B && (
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">B</span>
                )}
                {skill.benchmarks.O && (
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">O</span>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};