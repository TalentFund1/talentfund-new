import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer } from 'react-leaflet';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect, useRef } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const locations = [
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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [map, setMap] = useState<L.Map | null>(null);
  const [heatLayer, setHeatLayer] = useState<L.HeatLayer | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  useEffect(() => {
    if (mapRef.current && !heatLayer) {
      const points = locations.map(loc => [
        ...loc.position,
        loc.profiles / 1000 // Normalize the intensity based on profiles
      ] as [number, number, number]);
      
      const heat = (L as any).heatLayer(points, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        max: Math.max(...locations.map(l => l.profiles)) / 1000,
        gradient: {
          0.4: 'blue',
          0.6: 'lime',
          0.8: 'yellow',
          1.0: 'red'
        }
      });
      
      heat.addTo(mapRef.current);
      setHeatLayer(heat);
    }

    return () => {
      if (mapRef.current && heatLayer) {
        mapRef.current.removeLayer(heatLayer);
        setHeatLayer(null);
      }
    };
  }, [mapRef.current]);

  return (
    <Card className="p-6 mt-6 bg-white shadow-sm">
      <Tabs defaultValue="location" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="location" className="text-sm">Location Analysis</TabsTrigger>
          <TabsTrigger value="compensation" className="text-sm">Compensation Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="location" className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Location Analysis</h3>
            <div className="h-[400px] w-full rounded-lg overflow-hidden border border-border">
              <MapContainer 
                center={[40.7128, -74.0060] as L.LatLngExpression}
                zoom={4}
                className="h-full w-full"
                ref={(map) => {
                  if (map) {
                    mapRef.current = map;
                    setMap(map);
                  }
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>

            <div className="space-y-6">
              <Card className="p-4 bg-secondary">
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
                        />
                        <label 
                          htmlFor={filter.id}
                          className="text-sm font-medium leading-none text-primary cursor-pointer"
                        >
                          {filter.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary hover:bg-secondary">
                      <TableHead className="font-medium text-sm text-primary">Location</TableHead>
                      <TableHead className="text-right font-medium text-sm text-primary">Number of Profiles ↑</TableHead>
                      <TableHead className="text-right font-medium text-sm text-primary">Number of Unique Jobs ↑</TableHead>
                      <TableHead className="text-right font-medium text-sm text-primary">Median Compensation ↑</TableHead>
                      <TableHead className="text-right font-medium text-sm text-primary">Total Diversity ↑</TableHead>
                      <TableHead className="text-right font-medium text-sm text-primary">Percent Diversity</TableHead>
                      <TableHead className="text-right font-medium text-sm text-primary">Posting Intensity</TableHead>
                      <TableHead className="text-right font-medium text-sm text-primary">Median Posting Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locations.map((location) => (
                      <TableRow key={location.name} className="hover:bg-secondary/50">
                        <TableCell className="font-medium text-sm">{location.name}</TableCell>
                        <TableCell className="text-right text-sm">{location.profiles.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-sm">{location.uniqueJobs}</TableCell>
                        <TableCell className="text-right text-sm">${location.medianCompensation.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-sm">{location.totalDiversity.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-sm">{location.percentDiversity}</TableCell>
                        <TableCell className="text-right text-sm">{location.postingIntensity}</TableCell>
                        <TableCell className="text-right text-sm">{location.medianDuration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="compensation" className="space-y-4">
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">Compensation Analysis</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Compensation analysis data will be displayed here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};