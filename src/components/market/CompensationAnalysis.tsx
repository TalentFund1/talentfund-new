import { CompensationHeader } from "./compensation/CompensationHeader";
import { JobPostingStats } from "./compensation/JobPostingStats";
import { PayBands } from "./compensation/PayBands";
import { CompensationDescription } from "./compensation/CompensationDescription";

interface CompensationAnalysisProps {
  isVisible: boolean;
}

export const CompensationAnalysis = ({ isVisible }: CompensationAnalysisProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="space-y-6">
      <CompensationHeader />
      <JobPostingStats />
      <CompensationDescription 
        range="$130,456 - $170,439"
        observations={749}
        totalPostings={6749}
        location="New York, NYC"
        median="$150,447"
        costOfLiving="2.4%"
        adjustedMedian="$154,147"
      />
      <PayBands />
    </div>
  );
};