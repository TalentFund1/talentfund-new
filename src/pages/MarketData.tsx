import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MarketDataMap } from '@/components/market/MarketDataMap';
import { MarketDataTable } from '@/components/market/MarketDataTable';

const MarketData = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [anySkills, setAnySkills] = useState('');
  const [allSkills, setAllSkills] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="flex-1 space-y-6 p-6 ml-16">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Market Data</h2>
        
        <div className="space-y-4">
          <h3 className="font-medium">Search</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Job Title</label>
              <div className="flex gap-2">
                <Input 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Artificial Engineer"
                />
                {jobTitle && (
                  <Button variant="outline" size="icon" onClick={() => setJobTitle('')}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm mb-2 block">Has ANY of the following skills</label>
              <div className="flex gap-2">
                <Input 
                  value={anySkills}
                  onChange={(e) => setAnySkills(e.target.value)}
                  placeholder="NLP"
                />
                {anySkills && (
                  <Button variant="outline" size="icon" onClick={() => setAnySkills('')}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="text-center">- AND -</div>

            <div>
              <label className="text-sm mb-2 block">Has ALL of the following skills</label>
              <div className="flex gap-2">
                <Input 
                  value={allSkills}
                  onChange={(e) => setAllSkills(e.target.value)}
                  placeholder="Python"
                />
                {allSkills && (
                  <Button variant="outline" size="icon" onClick={() => setAllSkills('')}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm mb-2 block">Company</label>
              <Input 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm mb-2 block">Location</label>
                <div className="flex gap-2">
                  <Input 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="New York, NYC"
                  />
                  {location && (
                    <Button variant="outline" size="icon" onClick={() => setLocation('')}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

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

            <div className="flex justify-end gap-2">
              <Button variant="outline">Clear All</Button>
              <Button>Run</Button>
            </div>
          </div>
        </div>

        <MarketDataMap />
        <MarketDataTable />
      </div>
    </div>
  );
};

export default MarketData;