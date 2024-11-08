import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";

const data = [
  { date: "Jun '18", salary: 110000, postings: 5200 },
  { date: "Oct '18", salary: 112000, postings: 5300 },
  { date: "Feb '19", salary: 110000, postings: 5400 },
  { date: "Jun '19", salary: 113000, postings: 6000 },
  { date: "Oct '19", salary: 112000, postings: 5800 },
  { date: "Feb '20", salary: 114000, postings: 5500 },
  { date: "Jun '20", salary: 113000, postings: 5600 },
  { date: "Oct '20", salary: 114000, postings: 5900 },
  { date: "Feb '21", salary: 115000, postings: 6100 }
];

export const CompensationTrendsChart = () => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-primary">Compensation Trends</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">4.2%</span>
                <span className="text-sm text-secondary-foreground">Growth</span>
              </div>
              <div className="text-sm text-secondary-foreground">Jun 2018 - May 2021</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">6M</Button>
            <Button variant="outline" size="sm">1Y</Button>
            <Button variant="outline" size="sm">3Y</Button>
            <Button variant="outline" size="sm">CUSTOM</Button>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8073ec" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#8073ec" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="#1F2144"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#1F2144"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'white',
                  border: '1px solid #CCDBFF',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Median Salary']}
              />
              <Area
                type="monotone"
                dataKey="salary"
                stroke="#8073ec"
                fillOpacity={1}
                fill="url(#colorSalary)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm text-secondary-foreground">
            162,704 Job Postings
          </div>
        </div>
      </div>
    </Card>
  );
};