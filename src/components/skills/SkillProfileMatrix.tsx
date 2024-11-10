import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useParams } from "react-router-dom";
import { SkillProfileHeader } from "./matrix/SkillProfileHeader";
import { SkillProfileFilters } from "./matrix/SkillProfileFilters";
import { SkillProfileMatrixTable } from "./SkillProfileMatrixTable";
import { roleSkills } from "./data/skillsData";

const PAGE_SIZE = 10;

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();
  const observerTarget = useRef(null);
  const { id } = useParams<{ id: string }>();
  const { toggledSkills, setToggledSkills } = useToggledSkills();

  const handleToggleSkill = (skillTitle: string) => {
    const newToggledSkills = new Set(toggledSkills);
    if (newToggledSkills.has(skillTitle)) {
      newToggledSkills.delete(skillTitle);
    } else {
      newToggledSkills.add(skillTitle);
    }
    setToggledSkills(newToggledSkills);
    setIsDirty(true);
    
    toast({
      title: "Skill Updated",
      description: `${skillTitle} has been ${newToggledSkills.has(skillTitle) ? 'added to' : 'removed from'} your skills.`,
    });
  };

  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const filteredSkills = (() => {
    let skills = [];
    if (skillType === "all") {
      skills = [...currentRoleSkills.specialized, ...currentRoleSkills.common, ...currentRoleSkills.certifications];
    } else if (skillType === "specialized") {
      skills = currentRoleSkills.specialized;
    } else if (skillType === "common") {
      skills = currentRoleSkills.common;
    } else if (skillType === "certification") {
      skills = currentRoleSkills.certifications;
    }

    return skills.sort((a, b) => {
      const aIsSaved = toggledSkills.has(a.title);
      const bIsSaved = toggledSkills.has(b.title);
      if (aIsSaved === bIsSaved) return 0;
      return aIsSaved ? -1 : 1;
    });
  })();

  const paginatedSkills = filteredSkills.slice(0, page * PAGE_SIZE);
  const hasMoreSkills = paginatedSkills.length < filteredSkills.length;

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <SkillProfileHeader toggledSkillsCount={toggledSkills.size} />
        <Separator className="my-4" />
        
        <SkillProfileFilters 
          skillType={skillType}
          setSkillType={setSkillType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="rounded-lg border border-border overflow-hidden">
          <SkillProfileMatrixTable 
            paginatedSkills={paginatedSkills}
            toggledSkills={toggledSkills}
            onToggleSkill={handleToggleSkill}
          />
        </div>

        {hasMoreSkills && (
          <div ref={observerTarget} className="h-10" />
        )}
      </Card>
    </div>
  );
};