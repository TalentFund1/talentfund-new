interface SkillsGridProps {
  skillsArray: string[];
  selectedCategory: string;
}

export const SkillsGrid = ({ skillsArray, selectedCategory }: SkillsGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {skillsArray.map((skill) => (
        <div 
          key={skill}
          className="p-4 border border-border rounded-lg bg-background"
        >
          {skill}
        </div>
      ))}
    </div>
  );
};