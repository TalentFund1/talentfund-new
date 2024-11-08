import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  { name: "New York", position: [40.7128, -74.0060] },
  { name: "San Francisco", position: [37.7749, -122.4194] },
  { name: "Toronto", position: [43.6532, -79.3832] }
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
                center={[39.8283, -98.5795] as [number, number]}
                zoom={4} 
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attributionControl={true}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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