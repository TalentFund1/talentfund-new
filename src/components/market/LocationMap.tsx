import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationData {
  city: string;
  lat: number;
  lng: number;
  profiles: number;
}

const locations: LocationData[] = [
  { city: "New York, NYC", lat: 40.7128, lng: -74.0060, profiles: 2868 },
  { city: "San Francisco, CA", lat: 37.7749, lng: -122.4194, profiles: 1237 },
  { city: "Los Angeles, CA", lat: 34.0522, lng: -118.2437, profiles: 1237 },
  { city: "Chicago, IL", lat: 41.8781, lng: -87.6298, profiles: 1040 },
];

export const LocationMap = () => {
  const center: LatLngExpression = [39.8283, -98.5795];

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border bg-white">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Location Analysis</h3>
      </div>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: "calc(100% - 57px)", width: "100%" }}
        scrollWheelZoom={false}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => {
          const position: LatLngExpression = [location.lat, location.lng];
          return (
            <CircleMarker
              key={location.city}
              center={position}
              pathOptions={{
                fillColor: '#8073ec',
                color: '#8073ec',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.4
              }}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold">{location.city}</h4>
                  <p className="text-sm">Profiles: {location.profiles}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};