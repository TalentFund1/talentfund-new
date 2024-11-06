import { TableBody } from "@/components/ui/table";
import { SkillTableRow } from "./SkillTableRow";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  type: string;
}

interface SkillProfileListProps {
  skills: Skill[];
  visibleSkills: Skill[];
  onGrowthClick: (skill: { title: string; growth: string }) => void;
  loadMore: () => void;
}

export const SkillProfileList = ({ skills, visibleSkills, onGrowthClick, loadMore }: SkillProfileListProps) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && visibleSkills.length < skills.length) {
      loadMore();
    }
  }, [inView, visibleSkills.length, skills.length, loadMore]);

  return (
    <TableBody>
      {visibleSkills.map((skill) => (
        <SkillTableRow 
          key={skill.title} 
          skill={skill} 
          onGrowthClick={onGrowthClick}
        />
      ))}
      <tr ref={ref} style={{ height: '20px' }}></tr>
    </TableBody>
  );
};