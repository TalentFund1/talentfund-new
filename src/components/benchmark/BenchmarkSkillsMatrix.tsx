import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { filterSkillsByCategory } from "./skills-matrix/skillCategories";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";
import { BenchmarkMatrixFilters } from "./skills-matrix/BenchmarkMatrixFilters";
import { RoleSelection } from "./RoleSelection";
import { useRoleStore } from "./RoleBenchmark";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { CategorizedSkills } from "./CategorizedSkills";
import { useTrack } from "../skills/context/TrackContext";
import { SkillGoalSection } from "./SkillGoalSection";
import { roleSkills } from "../skills/data/roleSkills";
import { SkillGoalWidget } from "./SkillGoalWidget";
import { BenchmarkSkillsContent } from "./skills-matrix/BenchmarkSkillsContent";

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const BenchmarkSkillsMatrix = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedRole, setSelectedRole, selectedLevel: roleLevel, setSelectedLevel: setRoleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  const { currentStates } = useSkillsMatrixStore();

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
  
  // Get all skills for the selected role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  // Get matching skills by comparing employee's skills with role requirements
  const employeeSkills = getEmployeeSkills(id || "");
  const matchingSkills = allRoleSkills.filter(roleSkill => 
    employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
  );

  // Filter skills that are marked as skill goals AND are matching skills
  const skillGoals = filterSkillsByCategory(employeeSkills, "all")
    .filter(skill => {
      if (!toggledSkills.has(skill.title)) return false;

      const isMatching = matchingSkills.some(matchingSkill => 
        matchingSkill.title === skill.title
      );

      if (!isMatching) return false;

      const currentSkillState = currentStates[skill.title];
      const requirement = (currentSkillState?.requirement || skill.requirement || 'unknown').toLowerCase();
      
      return requirement === 'required' || requirement === 'skill_goal';
    });

  console.log('Skill Goals Count:', skillGoals.length);
  console.log('Total Skills:', allRoleSkills.length);

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">Skills Matrix</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track employee skills and competencies
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <RoleSelection 
            selectedRole={selectedRole}
            selectedLevel={roleLevel}
            currentTrack={getTrackForRole(selectedRole)}
            onRoleChange={setSelectedRole}
            onLevelChange={setRoleLevel}
            onTrackChange={() => {}}
            roles={roles}
          />
        </div>

        <SkillGoalWidget 
          totalSkills={allRoleSkills.length}
          skillGoalsCount={skillGoals.length}
        />

        <CategorizedSkills 
          roleId={selectedRole}
          employeeId={id || ""}
          selectedLevel={roleLevel}
        />

        {skillGoals.length > 0 && (
          <SkillGoalSection 
            skills={skillGoals}
            count={skillGoals.length}
          />
        )}

        <BenchmarkSkillsContent />
      </Card>
    </div>
  );
};