import { CompensationHeader } from "./compensation/CompensationHeader";
import { JobPostingStats } from "./compensation/JobPostingStats";
import { CompensationTable } from "./compensation/CompensationTable";

interface CompensationAnalysisProps {
  isVisible: boolean;
}

export const CompensationAnalysis = ({ isVisible }: CompensationAnalysisProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="space-y-6">
      <CompensationHeader />
      <JobPostingStats />
      <CompensationTable />
    </div>
  );
};