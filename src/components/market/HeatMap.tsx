import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from './types';

interface HeatMapProps {
  locations: Location[];
  selectedFilters: string[];
}

export const HeatMap = ({ locations, selectedFilters }: HeatMapProps) => {
  useEffect(() => {
    // Fix Leaflet default icon path issues
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const getRadius = (value: number, filter: string) => {
    // Function implementation for calculating radius based on value
    return value / 1000; // Example calculation
  };

  const getStyle = (filter: string) => {
    // Function implementation for getting style based on filter
    return {
      fillColor: '#FF0000', // Example fill color
      color: '#000000',      // Example border color
    };
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <MapContainer 
        center={[40.7128, -74.0060]}
        zoom={4}
        className="h-full w-full"
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedFilters.map(filter => 
          locations.map((location, index) => {
            const value = location.metrics[filter as keyof typeof location.metrics];
            if (!value) return null;
            
            const style = getStyle(filter);
            
            return (
              <CircleMarker
                key={`${filter}-${index}`}
                center={[location.position[0], location.position[1]]}
                radius={getRadius(value, filter)}
                pathOptions={{
                  fillColor: style.fillColor,
                  color: style.color,
                  weight: 1,
                  opacity: 0.8,
                  fillOpacity: 0.35
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm">{filter}: {value}</p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })
        )}
      </MapContainer>
    </div>
  );
};
