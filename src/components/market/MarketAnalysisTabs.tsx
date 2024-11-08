import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import { LocationsTable } from "./LocationsTable";
import { HeatMap } from "./HeatMap";
import { Location } from "./types";
import { CompensationAnalysis } from "./CompensationAnalysis";

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  }
];

export const MarketAnalysisTabs = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["profiles"]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <Card className="p-8 mt-6 bg-white shadow-sm">
      <Tabs defaultValue="location" className="w-full">
        <TabsContent value="location" className="pt-2">
          <div className="space-y-4">
            <Card className="overflow-hidden border border-border">
              <h3 className="text-xl font-semibold p-4 border-b border-border">Global Location Insights</h3>
              <div className="h-[400px] w-full overflow-hidden">
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
            </Card>

            <Card className="overflow-hidden border border-border">
              <LocationsTable locations={locations} />
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="compensation" className="pt-2">
          <CompensationAnalysis />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
