import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MarketDataMap = () => {
  return (
    <Card className="p-4">
      <Tabs defaultValue="location" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="location">Location Analysis</TabsTrigger>
          <TabsTrigger value="compensation">Compensation Analysis</TabsTrigger>
        </TabsList>
        
        <div className="aspect-[16/9] bg-slate-100 rounded-lg">
          {/* Map would be integrated here using a mapping library like react-leaflet */}
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            Map Visualization
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Profiles
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Unique Jobs
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Compensation
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Diversity
          </label>
        </div>
      </Tabs>
    </Card>
  );
};