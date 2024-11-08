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
import { CompensationOverview } from "./CompensationOverview";
import { CompensationTable } from "./CompensationTable";

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

const mockSalaryData = [
  {
    role: "Artificial Engineer",
    level: "P3",
    currency: "USD",
    range: "$110,000 -115,000",
    percentiles: {
      p10: "$110,500",
      p25: "$111,250",
      p50: "$112,500",
      p75: "$113,750",
      p90: "$114,500"
    }
  },
  {
    role: "Artificial Engineer",
    level: "P4",
    currency: "USD",
    range: "$120,000 -125,000",
    percentiles: {
      p10: "$120,500",
      p25: "$121,500",
      p50: "$122,500",
      p75: "$123,750",
      p90: "$124,500"
    }
  },
  {
    role: "Artificial Engineer",
    level: "P5",
    currency: "USD",
    range: "$130,000 -145,000",
    percentiles: {
      p10: "$131,500",
      p25: "$133,750",
      p50: "$137,500",
      p75: "$141,250",
      p90: "$143,500"
    }
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
    <Card className="mt-6">
      <Tabs defaultValue="location" className="w-full">
        <div className="border-b border-border">
          <TabsList className="w-full flex h-12 items-center justify-start bg-transparent p-0">
            <TabsTrigger 
              value="location" 
              className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium hover:text-primary data-[state=active]:border-primary-accent data-[state=active]:text-primary"
            >
              Location Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="compensation" 
              className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium hover:text-primary data-[state=active]:border-primary-accent data-[state=active]:text-primary"
            >
              Compensation Analysis
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="location" className="p-6 bg-white rounded-b-lg">
          <div className="space-y-6">
            <HeatMap locations={locations} selectedFilters={selectedFilters} />
            <LocationsTable locations={locations} />
          </div>
        </TabsContent>
        
        <TabsContent value="compensation" className="p-6 bg-white rounded-b-lg">
          <div className="space-y-6">
            <CompensationOverview 
              title="Artificial Engineer"
              location="New York, NYC"
              function="Technology"
              occupation="Software Developer"
              matchingProfiles={8745}
              regionalDiversity="58%"
              medianSalary="$140,456"
              salaryObservations={749}
              jobDescription="AI engineer engineer will join a multidisciplinary team helping to shape our AI strategy and showcasing the potential for AI through early-stage solutions. This is an excellent opportunity to take advantage of emerging trends and technologies and make a real-world difference."
            />
            <CompensationTable 
              salaryRange="$130,456 - $170,439"
              observations="There are 749 advertised salary observations (10% of the 6,749 matching postings)."
              locationData="Typical compensation in New York, NYC ranges from $130,456 - $170,439. The median wage is $150,447, which is about the same as the national median. When you adjust the median wage for location cost of living (which is 2.4% below the average) workers 'feel like' they make $154,147."
              salaryData={mockSalaryData}
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
