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

  const getRadius = (value: number, type: string) => {
    switch(type) {
      case 'profiles':
        return Math.sqrt(value) * 0.5;
      case 'uniqueJobs':
        return Math.sqrt(value) * 0.8;
      case 'compensation':
        return Math.sqrt(value/1000) * 0.8;
      case 'diversity':
        return Math.sqrt(value) * 0.6;
      default:
        return 10;
    }
  };

  const getCircleStyle = (type: string) => {
    switch(type) {
      case 'profiles':
        return { fillColor: "#4285f4", color: "#4285f4" };
      case 'uniqueJobs':
        return { fillColor: "#34a853", color: "#34a853" };
      case 'compensation':
        return { fillColor: "#ea4335", color: "#ea4335" };
      case 'diversity':
        return { fillColor: "#fbbc05", color: "#fbbc05" };
      default:
        return { fillColor: "#4285f4", color: "#4285f4" };
    }
  };

  const formatValue = (value: number, type: string) => {
    switch(type) {
      case 'compensation':
        return `$${value.toLocaleString()}`;
      default:
        return value.toLocaleString();
    }
  };

  const getMetricName = (type: string) => {
    switch(type) {
      case 'uniqueJobs':
        return 'Unique Jobs';
      case 'compensation':
        return 'Median Compensation';
      case 'diversity':
        return 'Total Diversity';
      default:
        return 'Profiles';
    }
  };

  return (
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
          let value;
          switch(filter) {
            case 'profiles':
              value = location.profiles;
              break;
            case 'uniqueJobs':
              value = location.uniqueJobs;
              break;
            case 'compensation':
              value = location.medianCompensation;
              break;
            case 'diversity':
              value = location.totalDiversity;
              break;
            default:
              value = 0;
          }

          const style = getCircleStyle(filter);

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
                  <p className="text-sm">{getMetricName(filter)}: {formatValue(value, filter)}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })
      )}
    </MapContainer>
  );
};