import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
  return (
    <Card className="p-6 mt-6">
      <Tabs defaultValue="location" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="location">Location Analysis</TabsTrigger>
          <TabsTrigger value="compensation">Compensation Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="location" className="space-y-4">
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Location Analysis</h3>
            <div style={{ height: "400px", width: "100%" }}>
              <MapContainer 
                zoom={4} 
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => (
                  <Marker 
                    key={index} 
                    position={location.position as [number, number]}
                  >
                    <Popup>{location.name}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-8 mb-6">
                <span className="font-medium">Display:</span>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="profiles" />
                    <label htmlFor="profiles">Profiles</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="uniqueJobs" />
                    <label htmlFor="uniqueJobs">Unique Jobs</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="compensation" />
                    <label htmlFor="compensation">Compensation</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="diversity" />
                    <label htmlFor="diversity">Diversity</label>
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Number of Profiles ↑</TableHead>
                    <TableHead className="text-right">Number of Unique Jobs ↑</TableHead>
                    <TableHead className="text-right">Median Compensation ↑</TableHead>
                    <TableHead className="text-right">Total Diversity ↑</TableHead>
                    <TableHead className="text-right">Percent Diversity</TableHead>
                    <TableHead className="text-right">Posting Intensity</TableHead>
                    <TableHead className="text-right">Median Posting Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations.map((location) => (
                    <TableRow key={location.name}>
                      <TableCell>{location.name}</TableCell>
                      <TableCell className="text-right">{location.profiles.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{location.uniqueJobs}</TableCell>
                      <TableCell className="text-right">${location.medianCompensation.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{location.totalDiversity.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{location.percentDiversity}</TableCell>
                      <TableCell className="text-right">{location.postingIntensity}</TableCell>
                      <TableCell className="text-right">{location.medianDuration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="compensation" className="space-y-4">
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Compensation Analysis</h3>
            <p className="text-muted-foreground">
              Compensation analysis data will be displayed here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};