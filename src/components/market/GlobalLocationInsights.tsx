import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Users, DollarSign, TrendingUp, Clock, Download } from "lucide-react";
import { HeatMap } from "./HeatMap";
import { LocationsTable } from "./LocationsTable";
import { Location } from "./types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const locations: Location[] = [
  { 
    name: "New York, NY",
    position: [40.7128, -74.0060],
    profiles: 2868,
    uniqueJobs: 452,
    medianCompensation: 140674,
    totalDiversity: 1682,
    percentDiversity: "58%",
    postingIntensity: "2-1",
    medianDuration: "52 days"
  },
  { 
    name: "San Francisco",
    position: [37.7749, -122.4194],
    profiles: 1227,
    uniqueJobs: 743,
    medianCompensation: 169153,
    totalDiversity: 624,
    percentDiversity: "40%",
    postingIntensity: "1-1",
    medianDuration: "7 days"
  },
  { 
    name: "Toronto",
    position: [43.6532, -79.3832],
    profiles: 1040,
    uniqueJobs: 420,
    medianCompensation: 134564,
    totalDiversity: 504,
    percentDiversity: "42%",
    postingIntensity: "5-1",
    medianDuration: "n/a"
  },
  { 
    name: "London, UK",
    position: [51.5074, -0.1278],
    profiles: 2156,
    uniqueJobs: 623,
    medianCompensation: 145890,
    totalDiversity: 1245,
    percentDiversity: "55%",
    postingIntensity: "3-1",
    medianDuration: "45 days"
  },
  { 
    name: "Berlin",
    position: [52.5200, 13.4050],
    profiles: 986,
    uniqueJobs: 384,
    medianCompensation: 128750,
    totalDiversity: 472,
    percentDiversity: "48%",
    postingIntensity: "2-1",
    medianDuration: "30 days"
  },
  { 
    name: "Singapore",
    position: [1.3521, 103.8198],
    profiles: 1543,
    uniqueJobs: 528,
    medianCompensation: 152340,
    totalDiversity: 895,
    percentDiversity: "52%",
    postingIntensity: "4-1",
    medianDuration: "21 days"
  },
  { 
    name: "Sydney",
    position: [-33.8688, 151.2093],
    profiles: 892,
    uniqueJobs: 312,
    medianCompensation: 147820,
    totalDiversity: 463,
    percentDiversity: "45%",
    postingIntensity: "2-1",
    medianDuration: "28 days"
  },
  { 
    name: "Austin, TX",
    position: [30.2672, -97.7431],
    profiles: 1124,
    uniqueJobs: 435,
    medianCompensation: 138950,
    totalDiversity: 642,
    percentDiversity: "51%",
    postingIntensity: "3-1",
    medianDuration: "15 days"
  },
  { 
    name: "Seattle, WA",
    position: [47.6062, -122.3321],
    profiles: 1678,
    uniqueJobs: 567,
    medianCompensation: 158240,
    totalDiversity: 923,
    percentDiversity: "49%",
    postingIntensity: "2-1",
    medianDuration: "18 days"
  },
  { 
    name: "Boston, MA",
    position: [42.3601, -71.0589],
    profiles: 1435,
    uniqueJobs: 489,
    medianCompensation: 143670,
    totalDiversity: 845,
    percentDiversity: "54%",
    postingIntensity: "3-1",
    medianDuration: "25 days"
  }
];

export const GlobalLocationInsights = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["profiles"]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleExport = () => {
    const csvContent = [
      ["Location", "Profiles", "Unique Jobs", "Median Compensation", "Total Diversity", "Percent Diversity", "Posting Intensity", "Median Duration"],
      ...locations.map(loc => [
        loc.name,
        loc.profiles,
        loc.uniqueJobs,
        loc.medianCompensation,
        loc.totalDiversity,
        loc.percentDiversity,
        loc.postingIntensity,
        loc.medianDuration
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'market_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-8 mt-8 bg-white shadow-sm">
      <div className="space-y-12">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-primary">Global Location Insights</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>

          <Separator className="mb-8" />

          <div>
            <div className="flex items-end gap-3 mb-6">
              <h2 className="text-2xl font-bold text-primary">Artificial Engineer</h2>
              <span className="text-secondary-foreground text-sm mb-1">SOC: (11-9041)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-border pb-12">
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
        </div>

        <div className="overflow-hidden border border-border rounded-lg">
          <div className="h-[500px] w-full relative">
            <HeatMap locations={locations} selectedFilters={selectedFilters} />
          </div>

          <div className="border-t border-border bg-secondary p-6">
            <div className="flex items-center gap-8">
              <span className="text-sm font-medium text-primary">Display:</span>
              <div className="flex items-center gap-6">
                {[
                  { id: "profiles", label: "Profiles" },
                  { id: "uniqueJobs", label: "Unique Jobs" },
                  { id: "compensation", label: "Compensation" },
                  { id: "diversity", label: "Diversity" }
                ].map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={filter.id}
                      checked={selectedFilters.includes(filter.id)}
                      onCheckedChange={() => toggleFilter(filter.id)}
                      className="h-4 w-4 rounded border-primary data-[state=checked]:bg-[#4285f4] data-[state=checked]:border-[#4285f4]"
                    />
                    <Label
                      htmlFor={filter.id}
                      className="text-sm font-medium leading-none text-primary cursor-pointer"
                    >
                      {filter.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card className="overflow-hidden border border-border">
            <LocationsTable locations={locations} />
          </Card>
        </div>
      </div>
    </Card>
  );
};