import { CompensationTrendsChart } from "./CompensationTrendsChart";

interface CompensationDescriptionProps {
  range: string;
  observations: number;
  totalPostings: number;
  location: string;
  median: string;
  costOfLiving: string;
  adjustedMedian: string;
}

export const CompensationDescription = ({
  range,
  observations,
  totalPostings,
  location,
  median,
  costOfLiving,
  adjustedMedian
}: CompensationDescriptionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-secondary-foreground">
          <span className="font-medium">Salary Range: {range}:</span> There are {observations} advertised salary observations ({Math.round((observations/totalPostings) * 100)}% of the {totalPostings} matching postings).
        </p>
        
        <p className="text-secondary-foreground">
          Typical compensation in {location} ranges from {range}. The median wage is {median}, which is about the same as the national median. When you adjust the median wage for location cost of living (which is {costOfLiving}% below the average) workers "feel like" they make {adjustedMedian}.
        </p>
      </div>

      <CompensationTrendsChart />
    </div>
  );
};