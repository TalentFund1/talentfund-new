import { Table } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useState, useMemo, useCallback } from "react";
import { SkillGrowthSheet } from "./SkillGrowthSheet";
import { SkillTableHeader } from "./SkillTableHeader";
import { SkillProfileHeader } from "./SkillProfileHeader";
import { SkillProfileList } from "./SkillProfileList";

const skills = [
  {
    title: "Amazon Web Services",
    subcategory: "Web Services",
    level: "advanced",
    growth: "12%",
    type: "specialized"
  },
  {
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "advanced",
    growth: "19%",
    type: "specialized"
  },
  {
    title: "Conversational AI",
    subcategory: "Natural Language Processing (NLP)",
    level: "advanced",
    growth: "12%",
    type: "specialized"
  },
  {
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "19%",
    type: "specialized"
  },
  {
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "10%",
    type: "specialized"
  },
  {
    title: "Docker (Software)",
    subcategory: "Software Development Tools",
    level: "intermediate",
    growth: "0%",
    type: "common"
  },
  {
    title: "MLflow",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "beginner",
    growth: "11%",
    type: "common"
  },
  {
    title: "Python",
    subcategory: "Programming Languages",
    level: "advanced",
    growth: "15%",
    type: "specialized"
  },
  {
    title: "TensorFlow",
    subcategory: "Machine Learning Frameworks",
    level: "advanced",
    growth: "18%",
    type: "specialized"
  },
  {
    title: "PyTorch",
    subcategory: "Machine Learning Frameworks",
    level: "intermediate",
    growth: "20%",
    type: "specialized"
  },
  {
    title: "Natural Language Processing",
    subcategory: "AI Technologies",
    level: "advanced",
    growth: "17%",
    type: "specialized"
  },
  {
    title: "Computer Vision",
    subcategory: "AI Technologies",
    level: "intermediate",
    growth: "16%",
    type: "specialized"
  },
  {
    title: "Kubernetes",
    subcategory: "DevOps",
    level: "intermediate",
    growth: "14%",
    type: "common"
  },
  {
    title: "Git",
    subcategory: "Version Control",
    level: "advanced",
    growth: "8%",
    type: "common"
  },
  {
    title: "SQL",
    subcategory: "Databases",
    level: "advanced",
    growth: "10%",
    type: "common"
  },
  {
    title: "MongoDB",
    subcategory: "Databases",
    level: "intermediate",
    growth: "12%",
    type: "common"
  },
  {
    title: "REST APIs",
    subcategory: "Web Services",
    level: "advanced",
    growth: "11%",
    type: "common"
  },
  {
    title: "GraphQL",
    subcategory: "Web Services",
    level: "intermediate",
    growth: "15%",
    type: "specialized"
  },
  {
    title: "Linux",
    subcategory: "Operating Systems",
    level: "advanced",
    growth: "7%",
    type: "common"
  },
  {
    title: "Scikit-learn",
    subcategory: "Machine Learning Libraries",
    level: "advanced",
    growth: "13%",
    type: "specialized"
  },
  {
    title: "Data Visualization",
    subcategory: "Data Science",
    level: "intermediate",
    growth: "14%",
    type: "common"
  },
  {
    title: "Apache Spark",
    subcategory: "Big Data",
    level: "beginner",
    growth: "16%",
    type: "specialized"
  },
  {
    title: "Agile Methodologies",
    subcategory: "Project Management",
    level: "intermediate",
    growth: "9%",
    type: "common"
  },
  {
    title: "System Design",
    subcategory: "Software Architecture",
    level: "advanced",
    growth: "13%",
    type: "specialized"
  },
  {
    title: "CI/CD",
    subcategory: "DevOps",
    level: "intermediate",
    growth: "12%",
    type: "common"
  },
  {
    title: "Microservices",
    subcategory: "Software Architecture",
    level: "advanced",
    growth: "15%",
    type: "specialized"
  },
  {
    title: "Cloud Security",
    subcategory: "Security",
    level: "intermediate",
    growth: "19%",
    type: "specialized"
  }
];

export const SkillProfileMatrix = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<{ title: string; growth: string } | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "specialized") return skill.type === "specialized";
      if (selectedFilter === "common") return skill.type === "common";
      if (selectedFilter === "certification") return skill.type === "certification";
      return true;
    });
  }, [selectedFilter]);

  const visibleSkills = useMemo(() => {
    return filteredSkills.slice(0, visibleCount);
  }, [filteredSkills, visibleCount]);

  const handleGrowthClick = useCallback((skill: { title: string; growth: string }) => {
    setSelectedSkill(skill);
    setSheetOpen(true);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 10, filteredSkills.length));
  }, [filteredSkills.length]);

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-2xl border border-border shadow-sm">
        <SkillProfileHeader 
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        
        <div className="px-4">
          <Table>
            <SkillTableHeader />
            <SkillProfileList
              skills={filteredSkills}
              visibleSkills={visibleSkills}
              onGrowthClick={handleGrowthClick}
              loadMore={loadMore}
            />
          </Table>
        </div>
      </Card>

      {selectedSkill && (
        <SkillGrowthSheet 
          open={sheetOpen} 
          onOpenChange={setSheetOpen}
          skill={selectedSkill}
        />
      )}
    </div>
  );
};
