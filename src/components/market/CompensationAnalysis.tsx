import { CompensationHeader } from "./compensation/CompensationHeader";
import { JobPostingStats } from "./compensation/JobPostingStats";
import { PayBands } from "./compensation/PayBands";
import { CompensationDescription } from "./compensation/CompensationDescription";
import { Card } from "@/components/ui/card";

interface CompensationAnalysisProps {
  isVisible: boolean;
}

export const CompensationAnalysis = ({ isVisible }: CompensationAnalysisProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Compensation Analysis</h2>
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
      </Card>
      <PayBands />
    </div>
  );
};