import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompetencyMatrix } from "./CompetencyMatrix";
import { CategoryCards } from "./competency/CategoryCards";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { roleSkills } from "./data/roleSkills";

interface CompetencyGraphProps {
  roleId?: string;
  track?: "Professional" | "Managerial";
}

export const CompetencyGraph = ({ roleId = "124", track = "Professional" }: CompetencyGraphProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const { toggledSkills } = useToggledSkills();

  // Get role-specific skills
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["124"];

  // Filter skills to only show toggled ones that belong to this role
  const filteredSkills = Array.from(toggledSkills).filter(skillTitle => {
    return [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ].some(roleSkill => roleSkill.title === skillTitle);
  });

  const roleNames = {
    "123": "AI Engineer",
    "124": "Backend Engineer",
    "125": "Frontend Engineer",
    "126": "Engineering Manager"
  };

  const roleName = roleNames[roleId as keyof typeof roleNames] || "Backend Engineer";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Skills Graph</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">Cancel</Button>
          <Button className="bg-[#1F2144]">Save</Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">{roleName}</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="professional"
                name="track"
                checked={track === "Professional"}
                readOnly
                className="form-radio text-primary-accent"
              />
              <label htmlFor="professional">Professional</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="managerial"
                name="track"
                checked={track === "Managerial"}
                readOnly
                className="form-radio text-primary-accent"
              />
              <label htmlFor="managerial">Managerial</label>
            </div>
          </div>
        </div>

        <CategoryCards
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          skills={filteredSkills}
          roleId={roleId}
        />

        <Card className="p-6">
          <CompetencyMatrix 
            skills={filteredSkills}
            roleId={roleId}
            track={track}
          />
        </Card>
      </div>
    </div>
  );
};