import { CompensationHeader } from "./compensation/CompensationHeader";
import { JobPostingStats } from "./compensation/JobPostingStats";
import { CompensationTable } from "./compensation/CompensationTable";

export const CompensationAnalysis = () => {
  return (
    <div className="space-y-6">
      <CompensationHeader />
      <JobPostingStats />
      <CompensationTable />
    </div>
  );
};