import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/StatCard";
import { Users, DollarSign, TrendingUp, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 120000 },
  { name: "Feb", value: 125000 },
  { name: "Mar", value: 127000 },
  { name: "Apr", value: 130000 },
  { name: "May", value: 132000 },
  { name: "Jun", value: 135000 },
];

export const CompensationAnalysis = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Profiles"
          value="2,845"
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Median Base Salary"
          value="$125,000"
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatCard
          title="YoY Growth"
          value="12.5%"
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatCard
          title="Time in Role"
          value="2.3 years"
          icon={<Clock className="h-6 w-6" />}
        />
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Compensation Trends</h3>
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
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4285f4"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Compensation Distribution</h3>
          <div className="flex gap-4">
            <Select defaultValue="level">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Group By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="level">Level</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="department">Department</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { level: "P1", range: "$80,000 - $100,000", median: "$90,000" },
            { level: "P2", range: "$95,000 - $120,000", median: "$108,000" },
            { level: "P3", range: "$115,000 - $145,000", median: "$130,000" },
            { level: "P4", range: "$140,000 - $180,000", median: "$160,000" },
          ].map((item) => (
            <div key={item.level} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="font-medium">{item.level}</div>
              <div className="text-muted-foreground">{item.range}</div>
              <div className="font-semibold">{item.median}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};