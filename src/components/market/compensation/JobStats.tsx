import { Building2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export const JobStats = () => {
  return (
    <div className="flex-1 flex justify-end space-x-4">
      <Card className="p-4 w-64">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-secondary-foreground">Matching Profiles</p>
            <h3 className="text-2xl font-bold text-primary mt-2">8,745</h3>
            <p className="text-sm text-secondary-foreground mt-1">Regional diversity: 58%</p>
          </div>
          <Users className="h-5 w-5 text-primary-accent" />
        </div>
      </Card>
      <Card className="p-4 w-64">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-secondary-foreground">Median Advertised Salary</p>
            <h3 className="text-2xl font-bold text-primary mt-2">$140,456</h3>
            <p className="text-sm text-secondary-foreground mt-1">749 salary observations</p>
          </div>
          <Building2 className="h-5 w-5 text-primary-accent" />
        </div>
      </Card>
    </div>
  );
};