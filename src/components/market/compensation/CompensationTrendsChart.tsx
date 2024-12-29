import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sixMonthData = [
  { date: "May '23", salary: 115000, postings: 5800 },
  { date: "Jun '23", salary: 118500, postings: 5900 },
  { date: "Jul '23", salary: 116800, postings: 6000 },
  { date: "Aug '23", salary: 119500, postings: 6100 },
  { date: "Sep '23", salary: 117900, postings: 6200 },
  { date: "Oct '23", salary: 120800, postings: 6300 }
];

const oneYearData = [
  { date: "Nov '22", salary: 110000, postings: 5200 },
  { date: "Dec '22", salary: 112000, postings: 5300 },
  { date: "Jan '23", salary: 113500, postings: 5400 },
  { date: "Feb '23", salary: 114200, postings: 5500 },
  { date: "Mar '23", salary: 114800, postings: 5600 },
  { date: "Apr '23", salary: 115000, postings: 5700 },
  ...sixMonthData
];

const threeYearData = [
  { date: "Oct '20", salary: 95000, postings: 4000 },
  { date: "Jan '21", salary: 98000, postings: 4200 },
  { date: "Apr '21", salary: 100000, postings: 4400 },
  { date: "Jul '21", salary: 102000, postings: 4600 },
  { date: "Oct '21", salary: 105000, postings: 4800 },
  { date: "Jan '22", salary: 107000, postings: 5000 },
  { date: "Apr '22", salary: 108500, postings: 5200 },
  { date: "Jul '22", salary: 109500, postings: 5400 },
  ...oneYearData
];

export const CompensationTrendsChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'6M' | '1Y' | '3Y'>('6M');

  const getDataForPeriod = () => {
    switch (selectedPeriod) {
      case '6M':
        return sixMonthData;
      case '1Y':
        return oneYearData;
      case '3Y':
        return threeYearData;
      default:
        return sixMonthData;
    }
  };

  const getGrowthRate = () => {
    const data = getDataForPeriod();
    const firstSalary = data[0].salary;
    const lastSalary = data[data.length - 1].salary;
    const growthRate = ((lastSalary - firstSalary) / firstSalary) * 100;
    return growthRate.toFixed(1);
  };

  const getTimeRange = () => {
    const data = getDataForPeriod();
    return `${data[0].date} - ${data[data.length - 1].date}`;
  };

  const getLatestSalary = () => {
    const data = getDataForPeriod();
    return `$${(data[data.length - 1].salary / 1000).toFixed(0)}k`;
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <div className="flex items-center gap-1">
                <span className="text-primary-accent">▲</span>
                <span className="text-3xl font-bold text-primary">{getGrowthRate()}%</span>
              </div>
              <span className="text-sm text-muted-foreground">{getTimeRange()}</span>
            </div>
            <div className="text-sm mt-1">
              <span className="text-primary-accent font-semibold">{getLatestSalary()}</span>
              <span className="text-muted-foreground ml-1">Median</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={selectedPeriod === '6M' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedPeriod('6M')}
            >
              6M
            </Button>
            <Button 
              variant={selectedPeriod === '1Y' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedPeriod('1Y')}
            >
              1Y
            </Button>
            <Button 
              variant={selectedPeriod === '3Y' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedPeriod('3Y')}
            >
              3Y
            </Button>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getDataForPeriod()}
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