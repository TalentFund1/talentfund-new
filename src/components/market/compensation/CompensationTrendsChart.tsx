import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";

const data = [
  { date: "Apr '24", salary: 115000, postings: 5800 },
  { date: "May '24", salary: 118500, postings: 5900 },
  { date: "Jun '24", salary: 116800, postings: 6000 },
  { date: "Jul '24", salary: 119500, postings: 6100 },
  { date: "Aug '24", salary: 117900, postings: 6200 },
  { date: "Sep '24", salary: 120800, postings: 6300 },
  { date: "Oct '24", salary: 121500, postings: 6400 }
];

export const CompensationTrendsChart = () => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-primary">Compensation Trends</h3>
            <div className="text-sm text-secondary-foreground">Apr 2024 - Oct 2024</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">6M</Button>
            <Button variant="outline" size="sm">1Y</Button>
            <Button variant="outline" size="sm">3Y</Button>
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