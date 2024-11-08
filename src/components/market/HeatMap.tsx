import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import { Location } from './types';

interface HeatMapProps {
  locations: Location[];
  selectedFilters: string[];
}

export const HeatMap = ({ locations, selectedFilters }: HeatMapProps) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const getRadius = (profiles: number) => {
    // Scale the radius based on the number of profiles
    return Math.sqrt(profiles) * 0.5;
  };

  return (
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
      {selectedFilters.includes('profiles') && locations.map((location, index) => (
        <CircleMarker
          key={index}
          center={location.position as L.LatLngExpression}
          radius={getRadius(location.profiles)}
          fillColor="#4285f4"
          color="#4285f4"
          weight={1}
          opacity={0.8}
          fillOpacity={0.35}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{location.name}</h3>
              <p className="text-sm">Profiles: {location.profiles}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};