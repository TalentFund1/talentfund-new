import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { roleSkills } from '../skills/data/roleSkills';
import { CategoryCards } from '../skills/CategoryCards';
import { getCategoryForSkill, calculateSkillCounts } from '../skills/utils/skillCountUtils';
import { SkillMappingHeader } from '../skills/header/SkillMappingHeader';
import { SkillTypeFilters } from '../skills/filters/SkillTypeFilters';
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { BenchmarkMatrixFilters } from "./skills-matrix/BenchmarkMatrixFilters";
import { SkillsMatrixTable } from "./skills-matrix/SkillsMatrixTable";

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'growth' | 'salary' | null;

export const BenchmarkSkillsMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hasMore, setHasMore] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  
  const { toast } = useToast();
  const observerTarget = useRef(null);
  const { id } = useParams<{ id: string }>();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get only the skills for the current role
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const filteredSkills = (() => {
    let skills = [];
    if (skillType === "all") {
      skills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ];
    } else if (skillType === "specialized") {
      skills = currentRoleSkills.specialized;
    } else if (skillType === "common") {
      skills = currentRoleSkills.common;
    } else if (skillType === "certification") {
      skills = currentRoleSkills.certifications;
    }

    let sortedSkills = skills.filter(skill => {
      const isInCurrentRole = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ].some(roleSkill => roleSkill.title === skill.title);

      if (selectedCategory !== 'all') {
        const skillCategory = getCategoryForSkill(skill, id || "123");
        if (skillCategory !== selectedCategory) {
          return false;
        }
      }

      return isInCurrentRole;
    });

    if (sortField && sortDirection) {
      sortedSkills.sort((a, b) => {
        if (sortField === 'growth') {
          const aGrowth = parseFloat(a.growth);
          const bGrowth = parseFloat(b.growth);
          return sortDirection === 'asc' ? aGrowth - bGrowth : bGrowth - aGrowth;
        } else if (sortField === 'salary') {
          const aSalary = parseFloat(a.salary.replace(/[^0-9.-]+/g, ""));
          const bSalary = parseFloat(b.salary.replace(/[^0-9.-]+/g, ""));
          return sortDirection === 'asc' ? aSalary - bSalary : bSalary - aSalary;
        }
        return 0;
      });
    }

    return sortedSkills;
  })();

  const skillCounts = calculateSkillCounts(id || "123");

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <SkillMappingHeader skillCount={filteredSkills.length} />
        
        <Separator className="my-4" />

        <CategoryCards
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          roleId={id || "123"}
          selectedLevel={selectedLevel}
        />

        <SkillTypeFilters
          skillType={skillType}
          setSkillType={setSkillType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <BenchmarkMatrixFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          selectedSkillLevel={selectedSkillLevel}
          setSelectedSkillLevel={setSelectedSkillLevel}
          selectedSearchSkills={selectedSearchSkills}
          removeSearchSkill={(skill: string) => {
            setSelectedSearchSkills(prev => prev.filter(s => s !== skill));
          }}
          clearSearch={() => {
            setSearchTerm("");
            setSelectedSearchSkills([]);
          }}
        />

        <div className="rounded-lg border border-border overflow-hidden">
          <SkillsMatrixTable 
            filteredSkills={filteredSkills}
            setHasChanges={setIsDirty}
            showCompanySkill={false}
            isRoleBenchmark={true}
          />
        </div>

        {hasMore && (
          <div ref={observerTarget} className="h-10" />
        )}
      </Card>
    </div>
  );
};