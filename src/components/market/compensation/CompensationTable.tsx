import { Card } from "@/components/ui/card";

export const CompensationTable = () => {
  return (
    <Card className="p-6 bg-white shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-4">Compensation Analysis</h3>
          <p className="text-secondary-foreground mb-4">
            Compensation Range: $130,456 - $170,439: There are 749 advertised salary observations (10% of the 6,749 matching postings).
          </p>
          <p className="text-secondary-foreground mb-6">
            Typical compensation in New York, NYC ranges from $130,456 - $170,439. The median wage is $150,447, which is about the same as the national median. When you adjust the median wage for location cost of living (which is 2.4% below the average) workers "feel like" they make $154,147.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Role Name</th>
                <th className="text-left py-3 px-4">Level</th>
                <th className="text-left py-3 px-4">Currency</th>
                <th className="text-left py-3 px-4">Salary Range</th>
                <th className="text-left py-3 px-4">10th</th>
                <th className="text-left py-3 px-4">25th</th>
                <th className="text-left py-3 px-4">50th</th>
                <th className="text-left py-3 px-4">75th</th>
                <th className="text-left py-3 px-4">90th</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Artificial Engineer</td>
                <td className="py-3 px-4">P3</td>
                <td className="py-3 px-4">USD</td>
                <td className="py-3 px-4">$110,000-115,000</td>
                <td className="py-3 px-4">$110,500</td>
                <td className="py-3 px-4">$111,250</td>
                <td className="py-3 px-4">$112,500</td>
                <td className="py-3 px-4">$113,750</td>
                <td className="py-3 px-4">$114,500</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Artificial Engineer</td>
                <td className="py-3 px-4">P4</td>
                <td className="py-3 px-4">USD</td>
                <td className="py-3 px-4">$120,000-125,000</td>
                <td className="py-3 px-4">$120,500</td>
                <td className="py-3 px-4">$121,500</td>
                <td className="py-3 px-4">$122,500</td>
                <td className="py-3 px-4">$123,750</td>
                <td className="py-3 px-4">$124,500</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Artificial Engineer</td>
                <td className="py-3 px-4">P5</td>
                <td className="py-3 px-4">USD</td>
                <td className="py-3 px-4">$130,000-145,000</td>
                <td className="py-3 px-4">$131,500</td>
                <td className="py-3 px-4">$133,750</td>
                <td className="py-3 px-4">$137,500</td>
                <td className="py-3 px-4">$141,250</td>
                <td className="py-3 px-4">$143,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};