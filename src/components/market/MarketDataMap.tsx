import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MarketDataMap = () => {
  return (
    <Card className="p-4">
      <Tabs defaultValue="location" className="w-full space-y-6">
        <TabsList className="w-full flex h-12 items-center justify-start space-x-6 border-b bg-transparent p-0">
          <TabsTrigger 
            value="location" 
            className="border-b-2 border-transparent px-3 pb-4 pt-2 text-base data-[state=active]:border-primary-accent data-[state=active]:text-primary hover:text-primary"
          >
            Location Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="compensation"
            className="border-b-2 border-transparent px-3 pb-4 pt-2 text-base data-[state=active]:border-primary-accent data-[state=active]:text-primary hover:text-primary"
          >
            Compensation Analysis
          </TabsTrigger>
        </TabsList>
        
        <div className="aspect-[16/9] bg-white rounded-lg border border-border">
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            Map Visualization
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" className="rounded border-gray-300" /> Profiles
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" className="rounded border-gray-300" /> Unique Jobs
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" className="rounded border-gray-300" /> Compensation
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" className="rounded border-gray-300" /> Diversity
          </label>
        </div>
      </Tabs>
    </Card>
  );
};