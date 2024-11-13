import React, { useState } from "react";
import { EmployeeHeader } from "@/components/ui/EmployeeHeader";
import { RoleBenchmark } from "@/components/benchmark/RoleBenchmark";
import { BenchmarkAnalysis } from "@/components/benchmark/BenchmarkAnalysis";
import { SkillsMatrix } from "@/components/skills/SkillsMatrix";

export const EmployeeProfile = () => {
  const [selectedRole, setSelectedRole] = useState<string>("125");
  const [selectedLevel, setSelectedLevel] = useState<string>("p4");

  return (
    <div className="space-y-6">
      <EmployeeHeader />
      <div className="grid grid-cols-1 gap-6">
        <RoleBenchmark />
        <BenchmarkAnalysis selectedRole={selectedRole} selectedLevel={selectedLevel} />
        <SkillsMatrix />
      </div>
    </div>
  );
};
