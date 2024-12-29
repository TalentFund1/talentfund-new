import { Card } from "@/components/ui/card";
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
  },
  { 
    name: "London, UK",
    position: [51.5074, -0.1278],
    profiles: 2156,
    uniqueJobs: 623,
    medianCompensation: 145890,
    totalDiversity: 1245,
    percentDiversity: "55%",
    postingIntensity: "3-1",
    medianDuration: "45 days"
  },
  { 
    name: "Berlin",
    position: [52.5200, 13.4050],
    profiles: 986,
    uniqueJobs: 384,
    medianCompensation: 128750,
    totalDiversity: 472,
    percentDiversity: "48%",
    postingIntensity: "2-1",
    medianDuration: "30 days"
  },
  { 
    name: "Singapore",
    position: [1.3521, 103.8198],
    profiles: 1543,
    uniqueJobs: 528,
    medianCompensation: 152340,
    totalDiversity: 895,
    percentDiversity: "52%",
    postingIntensity: "4-1",
    medianDuration: "21 days"
  },
  { 
    name: "Sydney",
    position: [-33.8688, 151.2093],
    profiles: 892,
    uniqueJobs: 312,
    medianCompensation: 147820,
    totalDiversity: 463,
    percentDiversity: "45%",
    postingIntensity: "2-1",
    medianDuration: "28 days"
  },
  { 
    name: "Austin, TX",
    position: [30.2672, -97.7431],
    profiles: 1124,
    uniqueJobs: 435,
    medianCompensation: 138950,
    totalDiversity: 642,
    percentDiversity: "51%",
    postingIntensity: "3-1",
    medianDuration: "15 days"
  },
  { 
    name: "Seattle, WA",
    position: [47.6062, -122.3321],
    profiles: 1678,
    uniqueJobs: 567,
    medianCompensation: 158240,
    totalDiversity: 923,
    percentDiversity: "49%",
    postingIntensity: "2-1",
    medianDuration: "18 days"
  },
  { 
    name: "Boston, MA",
    position: [42.3601, -71.0589],
    profiles: 1435,
    uniqueJobs: 489,
    medianCompensation: 143670,
    totalDiversity: 845,
    percentDiversity: "54%",
    postingIntensity: "3-1",
    medianDuration: "25 days"
  }
];

interface MarketAnalysisTabsProps {
  showGlobalInsights?: boolean;
}

export const MarketAnalysisTabs = ({ showGlobalInsights = true }: MarketAnalysisTabsProps) => {
  return null;
};