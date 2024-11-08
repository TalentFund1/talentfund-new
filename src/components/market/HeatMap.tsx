import { MapContainer, TileLayer } from 'react-leaflet';
import { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import { Location } from './types';

interface HeatMapProps {
  locations: Location[];
  selectedFilters: string[];
}

export const HeatMap = ({ locations, selectedFilters }: HeatMapProps) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [heatLayer, setHeatLayer] = useState<L.HeatLayer | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && selectedFilters.includes('profiles')) {
      // Remove existing heat layer if it exists
      if (heatLayer) {
        mapRef.current.removeLayer(heatLayer);
        setHeatLayer(null);
      }

      const points = locations.map(loc => [
        ...loc.position,
        loc.profiles / 1000
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
    } else if (mapRef.current && heatLayer) {
      // Remove heat layer if profiles filter is not selected
      mapRef.current.removeLayer(heatLayer);
      setHeatLayer(null);
    }

    return () => {
      if (mapRef.current && heatLayer) {
        mapRef.current.removeLayer(heatLayer);
        setHeatLayer(null);
      }
    };
  }, [mapRef.current, locations, selectedFilters]);

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
    </MapContainer>
  );
};