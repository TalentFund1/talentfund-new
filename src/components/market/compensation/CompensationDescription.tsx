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
          Typical compensation in {location} ranges from <span className="font-bold">{range}</span>. The median wage is <span className="font-bold">{median}</span>, which is about the same as the national median. When you adjust the median wage for location cost of living (which is {costOfLiving}% below the average) workers "feel like" they make <span className="font-bold">{adjustedMedian}</span>.
        </p>
      </div>

      <CompensationTrendsChart />
    </div>
  );
};