import React from "react";

interface CompetencyMatrixHeaderProps {
  selectedLevels: string[];
}

export const CompetencyMatrixHeader = ({ selectedLevels }: CompetencyMatrixHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-foreground">Competency Levels</h2>
    </div>
  );
};