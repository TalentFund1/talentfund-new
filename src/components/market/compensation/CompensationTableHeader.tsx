import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CompensationTableHeader = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-primary">Compensation Analysis</h3>
      
      <p className="text-secondary-foreground">
        Compensation Range: $130,456 - $170,439: There are 749 advertised salary observations (11% of the 6749 matching postings).
      </p>
      
      <p className="text-secondary-foreground">
        Typical compensation in New York, NYC ranges from $130,456 - $170,439. The median wage is $150,447, which is about the same as the national median. When you adjust the median wage for location cost of living (which is 2.4% below the average) workers "feel like" they make $154,147.
      </p>
    </div>
  );
};