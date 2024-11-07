import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from '@/components/Sidebar';

const MarketData = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Market Data</h2>
            
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="space-y-2">
                  <label className="text-sm block">Select Timeframe</label>
                  <div className="flex gap-2">
                    <Select defaultValue="may2023">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="may2023">May 2023</SelectItem>
                        <SelectItem value="jun2023">Jun 2023</SelectItem>
                        <SelectItem value="jul2023">Jul 2023</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="may2024">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="may2024">May 2024</SelectItem>
                        <SelectItem value="jun2024">Jun 2024</SelectItem>
                        <SelectItem value="jul2024">Jul 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketData;