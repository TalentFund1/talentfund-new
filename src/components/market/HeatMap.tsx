import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import { Location } from './types';
import 'leaflet/dist/leaflet.css';

interface HeatMapProps {
  locations: Location[];
  selectedFilters: string[];
}

export const HeatMap = ({ locations, selectedFilters }: HeatMapProps) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
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
      case 'compensation': {
        // Find min and max compensation values
        const compensationValues = locations.map(loc => loc.medianCompensation);
        const minComp = Math.min(...compensationValues);
        const maxComp = Math.max(...compensationValues);
        
        // Normalize the value between 5 and 25 for circle radius
        const normalized = ((value - minComp) / (maxComp - minComp)) * 20 + 5;
        return normalized;
      }
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
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <MapContainer 
        center={[40.7128, -74.0060] as L.LatLngExpression}
        zoom={4}
        className="h-full w-full z-0"
        ref={(map) => {
          if (map) {
            mapRef.current = map;
            setMap(map);
          }
        }}
        style={{ 
          height: '100%', 
          width: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0,
          background: 'transparent'
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
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
                center={location.position as L.LatLngExpression}
                radius={getRadius(value, filter)}
                fillColor={style.fillColor}
                color={style.color}
                weight={0.5}
                opacity={0.6}
                fillOpacity={0.25}
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
    </div>
  );
};