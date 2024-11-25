import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SkillProfileTable } from "./SkillProfileTable";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { SkillCategoryCards } from "./SkillCategoryCards";

const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const { toast } = useToast();
  const observerTarget = useRef(null);
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

  const filterSkillsByCategory = (skills: any[]) => {
    if (selectedCategory === 'all') return skills;

    const categoryMap: { [key: string]: string[] } = {
      critical: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'TensorFlow'],
      technical: ['Python', 'Technical Writing'],
      necessary: ['Problem Solving', 'AWS Certified Machine Learning - Specialty', 'TensorFlow Developer Certificate']
    };

    return skills.filter(skill => 
      categoryMap[selectedCategory]?.includes(skill.title)
    );
  };

  const mockSkills = [
    { title: "Machine Learning", subcategory: "AI & ML", level: "advanced", growth: "30%", salary: "$180,256" },
    { title: "Deep Learning", subcategory: "AI & ML", level: "intermediate", growth: "28%", salary: "$182,000" },
    { title: "Natural Language Processing", subcategory: "AI & ML", level: "advanced", growth: "32%", salary: "$175,000" },
    { title: "Computer Vision", subcategory: "AI & ML", level: "beginner", growth: "25%", salary: "$160,000" },
    { title: "TensorFlow", subcategory: "AI Tools", level: "advanced", growth: "30%", salary: "$180,000" },
    { title: "Python", subcategory: "Programming", level: "advanced", growth: "28%", salary: "$150,000" },
    { title: "Technical Writing", subcategory: "Documentation", level: "intermediate", growth: "20%", salary: "$70,000" },
    { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "35%", salary: "$120,000" },
    { title: "AWS Certified Machine Learning - Specialty", subcategory: "Certification", level: "advanced", growth: "30%", salary: "$110,000" },
    { title: "TensorFlow Developer Certificate", subcategory: "Certification", level: "intermediate", growth: "30%", salary: "$110,000" }
  ];

  const filteredSkills = filterSkillsByCategory(mockSkills);

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Skill Mapping</h2>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {Array.from(toggledSkills).length}
            </span>
          </div>
          <Button>Add Skill</Button>
        </div>

        <SkillCategoryCards
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          skills={mockSkills}
        />

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Select value={skillType} onValueChange={setSkillType}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Skill Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skill Type</SelectItem>
                <SelectItem value="specialized">Specialized Skills</SelectItem>
                <SelectItem value="common">Common Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[220px] bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Sort by All</SelectItem>
                <SelectItem value="baseline">Sort by Baseline</SelectItem>
                <SelectItem value="recommended">Sort by Recommended</SelectItem>
                <SelectItem value="benchmark">Sort by Market Benchmark</SelectItem>
                <SelectItem value="occupation">Sort by Occupation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <SkillProfileTable 
            skills={filteredSkills}
            toggledSkills={toggledSkills}
            onToggleSkill={handleToggleSkill}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={(field) => {
              if (sortField === field) {
                setSortDirection(sortDirection === 'asc' ? 'desc' : null);
                if (sortDirection === 'desc') setSortField(null);
              } else {
                setSortField(field);
                setSortDirection('asc');
              }
            }}
            selectedCategory={selectedCategory}
            roleId="123"
          />
        </div>

        {hasMore && (
          <div ref={observerTarget} className="h-10" />
        )}
      </Card>
    </div>
  );
};

export default SkillProfileMatrix;
