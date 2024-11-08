import { CompensationHeader } from "./compensation/CompensationHeader";
import { JobPostingStats } from "./compensation/JobPostingStats";
import { CompensationTable } from "./compensation/CompensationTable";

export const CompensationAnalysis = () => {
  return (
    <div className="space-y-6">
      <CompensationHeader />
      <div className="mt-8">
        <JobPostingStats />
      </div>
      <div className="mt-8">
        <CompensationTable />
      </div>
    </div>
  );
};