import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./competency/CompetencyStateReader";
import { ToggledSkillsProvider } from "./context/ToggledSkillsContext";
import { TrackProvider } from "./context/TrackContext";
import { EmployeeList } from "./overview/EmployeeList";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";

const EmployeeOverviewContent = () => {
  const { id: roleId } = useParams();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employees = useEmployeeStore((state) => state.employees);
  const employeeSkillsStore = useEmployeeSkillsStore();

  // Get exact role matches (same role ID)
  const exactMatchEmployees = employees
    .filter(emp => {
      const employeeRoleId = getSkillProfileId(emp.role);
      const isMatch = employeeRoleId === roleId;
      
      console.log('Checking exact role match:', {
        employee: emp.name,
        employeeRole: emp.role,
        employeeRoleId,
        targetRoleId: roleId,
        isMatch
      });
      
      return isMatch;
    })
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        "",
        employeeSkillsStore.getEmployeeSkills(emp.id),
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark);

  // Get partial matches (different roles but high skill match)
  const partialMatchEmployees = employees
    .filter(emp => {
      const employeeRoleId = getSkillProfileId(emp.role);
      
      if (employeeRoleId === roleId) {
        return false;
      }

      const benchmark = calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        "",
        employeeSkillsStore.getEmployeeSkills(emp.id),
        toggledSkills,
        getSkillCompetencyState
      );

      return benchmark > 70;
    })
    .map(emp => ({
      ...emp,
      benchmark: calculateBenchmarkPercentage(
        emp.id,
        roleId || "",
        "",
        employeeSkillsStore.getEmployeeSkills(emp.id),
        toggledSkills,
        getSkillCompetencyState
      )
    }))
    .sort((a, b) => b.benchmark - a.benchmark)
    .slice(0, 3);

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Employees</h2>
        <span className="text-sm text-muted-foreground">
          {exactMatchEmployees.length + partialMatchEmployees.length} total
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EmployeeList 
          title="People with this job"
          employees={exactMatchEmployees}
        />

        <EmployeeList 
          title="People with skills that match this job"
          employees={partialMatchEmployees}
        />
      </div>
    </Card>
  );
};

export const EmployeeOverview = () => {
  return (
    <ToggledSkillsProvider>
      <TrackProvider>
        <EmployeeOverviewContent />
      </TrackProvider>
    </ToggledSkillsProvider>
  );
};