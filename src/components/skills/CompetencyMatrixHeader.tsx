import React from "react";
import { Button } from "@/components/ui/button";

interface CompetencyMatrixHeaderProps {
  selectedLevels: string[];
}

export const CompetencyMatrixHeader = ({ selectedLevels }: CompetencyMatrixHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-foreground">Competency Levels</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{selectedLevels.length} Selected</span>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};