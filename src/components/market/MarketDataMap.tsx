import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MarketDataMap = () => {
  return (
    <Card className="p-4 bg-white">
      <Tabs defaultValue="location" className="w-full space-y-6">
        <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
          <TabsTrigger 
            value="location" 
            className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
          >
            Location Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="compensation"
            className="border-b-2 border-transparent px-3 pb-4 pt-2 data-[state=active]:border-primary-accent data-[state=active]:text-primary font-medium"
          >
            Compensation Analysis
          </TabsTrigger>
        </TabsList>
        
        <div className="aspect-[16/9] bg-white rounded-lg border border-border">
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