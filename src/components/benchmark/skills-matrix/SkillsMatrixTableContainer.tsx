import { Table, TableBody } from "@/components/ui/table";
import { SkillsMatrixRow } from "../SkillsMatrixRow";
import { SkillsMatrixTableHeader } from "../SkillsMatrixTableHeader";
import { useSkills } from "../../skills/context/SkillsContext";

interface SkillsMatrixTableContainerProps {
  filteredSkills: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
  }>;
  onSkillLevelChange: (skillTitle: string, newLevel: string, requirement: string) => void;
}

export const SkillsMatrixTableContainer = ({ 
  filteredSkills, 
  onSkillLevelChange 
}: SkillsMatrixTableContainerProps) => {
  const { savedSkills, selectedCategory } = useSkills();

  const getFilteredAndSortedSkills = () => {
    let skills = [...filteredSkills];

    // Filter by category if not "all"
    if (selectedCategory !== "all") {
      skills = skills.filter(skill => {
        switch (selectedCategory) {
          case "specialized":
            return skill.subcategory.includes("AI") || 
                   skill.subcategory.includes("Machine Learning") ||
                   skill.subcategory.includes("Cloud");
          case "common":
            return skill.subcategory.includes("Programming") ||
                   skill.subcategory.includes("Development");
          case "certification":
            return skill.subcategory.includes("Certification");
          default:
            return true;
        }
      });
    }

    // Sort saved skills to the top
    return skills.sort((a, b) => {
      const aIsSaved = savedSkills.has(a.title);
      const bIsSaved = savedSkills.has(b.title);
      if (aIsSaved === bIsSaved) return 0;
      return aIsSaved ? -1 : 1;
    });
  };

  const sortedSkills = getFilteredAndSortedSkills();

  return (
    <div className="border border-[#CCDBFF] rounded-lg overflow-hidden">
      <Table>
        <SkillsMatrixTableHeader />
        <TableBody>
          {sortedSkills.map((skill) => (
            <SkillsMatrixRow 
              key={skill.title} 
              skill={skill}
              onLevelChange={onSkillLevelChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};