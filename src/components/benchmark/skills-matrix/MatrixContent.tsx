import { useRef } from "react";
import { SkillsMatrixTable } from "./SkillsMatrixTable";

interface MatrixContentProps {
  filteredSkills: any[];
  setHasChanges: (hasChanges: boolean) => void;
  visibleItems: number;
  observerTarget: React.RefObject<HTMLDivElement>;
}

export const MatrixContent = ({
  filteredSkills,
  setHasChanges,
  visibleItems,
  observerTarget
}: MatrixContentProps) => {
  return (
    <>
      <SkillsMatrixTable 
        filteredSkills={filteredSkills}
        setHasChanges={setHasChanges}
      />
      
      {visibleItems < filteredSkills.length && (
        <div 
          ref={observerTarget} 
          className="h-10 flex items-center justify-center"
        >
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
    </>
  );
};