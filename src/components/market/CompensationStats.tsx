import { Card } from "@/components/ui/card";
import { Building2, Users } from "lucide-react";

interface CompensationStatsProps {
  matchingProfiles: number;
  regionalDiversity: number;
  medianSalary: string;
  salaryObservations: number;
}

export const CompensationStats = ({
  matchingProfiles,
  regionalDiversity,
  medianSalary,
  salaryObservations
}: CompensationStatsProps) => {
  return (
    <div className="flex-1 flex justify-end space-x-4">
      <Card className="p-4 w-64">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-secondary-foreground">Matching Profiles</p>
            <h3 className="text-2xl font-bold text-primary mt-2">{matchingProfiles}</h3>
            <p className="text-sm text-secondary-foreground mt-1">Regional diversity: {regionalDiversity}%</p>
          </div>
          <Users className="h-5 w-5 text-primary-accent" />
        </div>
      </Card>
      <Card className="p-4 w-64">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-secondary-foreground">Median Advertised Salary</p>
            <h3 className="text-2xl font-bold text-primary mt-2">${medianSalary}</h3>
            <p className="text-sm text-secondary-foreground mt-1">{salaryObservations} salary observations</p>
          </div>
          <Building2 className="h-5 w-5 text-primary-accent" />
        </div>
      </Card>
    </div>
  );
};