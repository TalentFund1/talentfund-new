import { SkillsMatrixFilters } from "./SkillsMatrixFilters";
import { Separator } from "@/components/ui/separator";

interface MatrixFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedInterest: string;
  setSelectedInterest: (interest: string) => void;
}

export const MatrixFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest
}: MatrixFiltersProps) => {
  return (
    <>
      <SkillsMatrixFilters 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
      />
      <Separator className="my-4" />
    </>
  );
};