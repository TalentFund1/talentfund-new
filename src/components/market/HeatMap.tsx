import { MapContainer, TileLayer } from 'react-leaflet';
import { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import { Location } from './types';

interface HeatMapProps {
  locations: Location[];
}

export const HeatMap = ({ locations }: HeatMapProps) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [heatLayer, setHeatLayer] = useState<L.HeatLayer | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !heatLayer) {
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
    }

    return () => {
      if (mapRef.current && heatLayer) {
        mapRef.current.removeLayer(heatLayer);
        setHeatLayer(null);
      }
    };
  }, [mapRef.current, locations]);

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