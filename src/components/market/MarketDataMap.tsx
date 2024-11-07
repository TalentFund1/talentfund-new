import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MarketDataMap = () => {
  return (
    <Card className="p-4">
      <Tabs defaultValue="location" className="w-full">
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
      </Tabs>
    </Card>
  );
};