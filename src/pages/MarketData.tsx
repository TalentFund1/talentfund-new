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
import { Card } from "@/components/ui/card";
import { Sidebar } from '@/components/Sidebar';

const MarketData = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [anySkills, setAnySkills] = useState('');
  const [allSkills, setAllSkills] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Market Data</h1>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="relative max-w-sm">
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Search Job Title..."
                  className="bg-white"
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="w-[180px]">
                  <Input
                    value={anySkills}
                    onChange={(e) => setAnySkills(e.target.value)}
                    placeholder="Has ANY skills..."
                    className="bg-white"
                  />
                </div>

                <div className="w-[180px]">
                  <Input
                    value={allSkills}
                    onChange={(e) => setAllSkills(e.target.value)}
                    placeholder="Has ALL skills..."
                    className="bg-white"
                  />
                </div>

                <div className="w-[180px]">
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company..."
                    className="bg-white"
                  />
                </div>

                <div className="w-[180px]">
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location..."
                    className="bg-white"
                  />
                </div>

                <Select defaultValue="may2023">
                  <SelectTrigger className="w-[120px] bg-white">
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="may2023">May 2023</SelectItem>
                    <SelectItem value="jun2023">Jun 2023</SelectItem>
                    <SelectItem value="jul2023">Jul 2023</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="may2024">
                  <SelectTrigger className="w-[120px] bg-white">
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="may2024">May 2024</SelectItem>
                    <SelectItem value="jun2024">Jun 2024</SelectItem>
                    <SelectItem value="jul2024">Jul 2024</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">Clear All</Button>
                <Button>Run</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketData;