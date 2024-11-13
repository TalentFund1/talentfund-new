import React, { useState } from "react";
import { EmployeeHeader } from "@/components/employee/EmployeeHeader";
import { RoleBenchmark } from "@/components/benchmark/RoleBenchmark";
import { BenchmarkAnalysis } from "@/components/benchmark/BenchmarkAnalysis";
import { MissingSkills2 } from "@/components/benchmark/MissingSkills2";
import { MissingSkills3 } from "@/components/benchmark/MissingSkills3";

export const EmployeeProfile = () => {
  const [selectedRole, setSelectedRole] = useState("125");
  const [selectedLevel, setSelectedLevel] = useState("p4");

  return (
    <div className="space-y-6">
      <EmployeeHeader />
      <div className="grid grid-cols-1 gap-6">
        <RoleBenchmark />
        <BenchmarkAnalysis />
        <MissingSkills2 
          roleId={selectedRole} 
          employeeId="123" 
          selectedLevel={selectedLevel} 
        />
        <MissingSkills3 
          roleId={selectedRole} 
          employeeId="123" 
          selectedLevel={selectedLevel} 
        />
      </div>
    </div>
  );
};