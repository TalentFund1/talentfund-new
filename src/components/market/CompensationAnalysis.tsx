import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CompensationAnalysis = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Compensation Analysis</h3>
          <div className="flex gap-4">
            <Select defaultValue="base">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Compensation Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="base">Base Salary</SelectItem>
                <SelectItem value="total">Total Compensation</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="6m">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
                <SelectItem value="2y">Last 2 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
};